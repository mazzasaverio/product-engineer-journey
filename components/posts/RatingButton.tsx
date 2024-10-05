import kyInstance from "@/lib/ky";
import { LikeRatingInfo } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";

import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const labels: { [index: number]: string } = {
  0: "Non so",
  0.5: "Inutile",
  1: "Inutile+",
  1.5: "Scarso",
  2: "Scarso+",
  2.5: "Mediocre",
  3: "Mediocre+",
  3.5: "Buono",
  4: "Buono+",
  4.5: "Eccellente",
  5: "Eccellente+",
};

function getLabelText(value: number) {
  return `${value} Stella${value !== 1 ? "e" : ""}, ${labels[value]}`;
}

function getColorForRating(rating: number) {
  if (rating === 0) return "gray"; // Color for "Non so"
  const red = rating < 3 ? 255 : Math.max(0, 255 - (rating - 3) * 85);
  const green = rating > 2 ? Math.min(255, (rating - 2) * 85) : 0;
  return `rgb(${red}, ${green}, 0)`;
}

interface RatingButtonProps {
  postId: string;
  featureId: string;
  initialState: LikeRatingInfo;
}

export default function RatingButton({
  postId,
  featureId,
  initialState,
}: RatingButtonProps) {
  const { toast } = useToast();

  // State to track user's rating
  const [value, setValue] = React.useState<number | null>(
    initialState.rating !== null && initialState.rating !== undefined
      ? initialState.rating
      : null,
  );
  const [hover, setHover] = React.useState<number>(-1);
  const [isIconHovered, setIsIconHovered] = React.useState<boolean>(false);

  // State to determine if user has rated in this session
  const [hasUserRated, setHasUserRated] = React.useState<boolean>(
    initialState.rating !== null,
  );

  const queryClient = useQueryClient();
  const likeInfoQueryKey: QueryKey = ["like-info", postId, featureId];
  const ratingDataQueryKey: QueryKey = ["rating-data", postId, featureId];

  const { data } = useQuery({
    queryKey: likeInfoQueryKey,
    queryFn: () =>
      kyInstance
        .get(`/api/posts/${postId}/features/${featureId}/likes`)
        .json<LikeRatingInfo>(),
    initialData: initialState,
    staleTime: Infinity,
  });

  // Fetch rating data only after user assigns a rating
  const { data: ratingData } = useQuery({
    queryKey: ratingDataQueryKey,
    queryFn: () =>
      kyInstance.get(`/api/posts/${postId}/features/${featureId}/rating`).json<{
        finalRating: number | null;
        finalRatingCount: number | null;
        finalRatingComment: string | null;
      }>(),
    staleTime: Infinity,
    enabled: hasUserRated, // Fetch only when user has rated
  });

  const mutation = useMutation({
    mutationFn: (newRating: number) =>
      kyInstance.post(`/api/posts/${postId}/features/${featureId}/likes`, {
        json: { rating: newRating },
      }),
    onMutate: async (newRating: number) => {
      await queryClient.cancelQueries({ queryKey: likeInfoQueryKey });

      const previousState =
        queryClient.getQueryData<LikeRatingInfo>(likeInfoQueryKey);

      queryClient.setQueryData<LikeRatingInfo>(likeInfoQueryKey, () => ({
        likes: previousState?.likes || 0,
        isLikedByUser: true,
        rating: newRating,
      }));

      queryClient.invalidateQueries({ queryKey: ratingDataQueryKey });

      return { previousState };
    },
    onError(error, variables, context) {
      queryClient.setQueryData(likeInfoQueryKey, context?.previousState);
      console.error(error);
      toast({
        variant: "destructive",
        description: "Qualcosa è andato storto. Per favore riprova.",
      });
    },
  });

  const handleRatingChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number | null,
  ) => {
    setValue(data.rating);
    if (newValue !== null) {
      mutation.mutate(newValue);
      setHasUserRated(true); // Set to true when user rates
    }
  };

  const handleUnknownClick = () => {
    setValue(data.rating);
    mutation.mutate(0);
    setHasUserRated(true); // Set to true when user rates
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        width: "100%",
      }}
    >
      {/* User Rating Component */}
      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Rating
            name="hover-feedback"
            value={data.rating}
            precision={0.5}
            max={5}
            getLabelText={getLabelText}
            onChange={handleRatingChange}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            icon={
              <StarIcon
                style={{
                  color: getColorForRating(
                    hover !== -1 ? hover : data.rating ?? 0,
                  ),
                }}
                fontSize="inherit"
              />
            }
            emptyIcon={
              <StarIcon
                style={{ opacity: 0.55, color: "gray" }}
                fontSize="inherit"
              />
            }
            sx={{
              "& .MuiRating-iconFilled": {
                color: getColorForRating(
                  hover !== -1 ? hover : data.rating ?? 0,
                ),
              },
              "& .MuiRating-iconHover": {
                color: getColorForRating(
                  hover !== -1 ? hover : data.rating ?? 0,
                ),
              },
            }}
          />
          <IconButton
            onClick={handleUnknownClick}
            color={data.rating === 0 ? "primary" : "default"}
            onMouseEnter={() => {
              setIsIconHovered(true);
            }}
            onMouseLeave={() => {
              setIsIconHovered(false);
            }}
            sx={{
              ml: 1,
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            <Typography variant="h5" component="span">
              🤷
            </Typography>
          </IconButton>
        </Box>
        <Box sx={{ mt: 1, textAlign: "center" }}>
          {(hover !== -1 || isIconHovered || data.rating !== null) &&
            (isIconHovered
              ? "Non so"
              : hover !== -1
                ? labels[hover]
                : labels[data.rating === null ? 0 : data.rating])}
        </Box>
      </Box>

      {/* Display final rating */}
      {data.rating && (
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Rating
              name="final-rating"
              value={ratingData?.finalRating ?? 0}
              precision={0.5}
              max={5}
              readOnly
              icon={
                <StarIcon
                  style={{
                    color: getColorForRating(ratingData?.finalRating ?? 0),
                  }}
                  fontSize="inherit"
                />
              }
              emptyIcon={
                <StarIcon
                  style={{ opacity: 0.55, color: "gray" }}
                  fontSize="inherit"
                />
              }
              sx={{
                "& .MuiRating-iconFilled": {
                  color: getColorForRating(ratingData?.finalRating ?? 0),
                },
              }}
            />
          </Box>
          <Box sx={{ mt: 1, textAlign: "center" }}>
            {ratingData?.finalRatingComment ?? "Non presente"}
          </Box>
        </Box>
      )}
    </Box>
  );
}
