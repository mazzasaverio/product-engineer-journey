import kyInstance from "@/lib/ky";
import { LikeInfo } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ChevronUp, Heart, ThumbsUp } from "lucide-react";
import { useToast } from "../ui/use-toast";

interface LikeButtonProps {
  feedbackId: string;
  initialState: LikeInfo;
}

export default function VoteFeedbackButton({
  feedbackId,
  initialState,
}: LikeButtonProps) {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const queryKey: QueryKey = ["like-feedback", feedbackId];

  const { data } = useQuery({
    queryKey,
    queryFn: () =>
      kyInstance.get(`/api/feedbacks/${feedbackId}/likes`).json<LikeInfo>(),
    initialData: initialState,
    staleTime: Infinity,
  });

  const { mutate } = useMutation({
    mutationFn: () =>
      data.isLikedByUser
        ? kyInstance.delete(`/api/feedbacks/${feedbackId}/likes`)
        : kyInstance.post(`/api/feedbacks/${feedbackId}/likes`),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<LikeInfo>(queryKey);

      queryClient.setQueryData<LikeInfo>(queryKey, () => ({
        likes:
          (previousState?.likes || 0) + (previousState?.isLikedByUser ? -1 : 1),
        isLikedByUser: !previousState?.isLikedByUser,
      }));

      return { previousState };
    },
    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      console.error(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      });
    },
  });

  return (
    <button
      onClick={() => mutate()}
      className={cn(
        "flex flex-col items-center rounded-sm border p-1",
        data.isLikedByUser
          ? "border-green-500 bg-green-500 bg-opacity-20 text-white"
          : "border-transparent bg-black text-gray-500",
      )}
    >
      <ThumbsUp
        className={cn(
          "size-5",
          data.isLikedByUser ? "text-green-500" : "text-gray-500",
        )}
      />
      <span className="mt-1 text-sm font-medium tabular-nums">
        {data.likes}
      </span>
    </button>
  );
}
