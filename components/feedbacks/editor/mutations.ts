import { useToast } from "@/components/ui/use-toast";

import {
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { submitFeedback } from "./actions";

export function useSubmitFeedbackMutation() {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: submitFeedback,
    onSuccess: async (newFeedback) => {
      const queryFilter = {
        queryKey: ["post-feedbacks"],
      } satisfies QueryFilters;

      await queryClient.cancelQueries(queryFilter);

      queryClient.invalidateQueries(queryFilter);

      toast({
        description: "Post created",
      });
    },
    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to post. Please try again.",
      });
    },
  });

  return mutation;
}
