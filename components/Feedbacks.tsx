"use client";
//
import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import Feedback from "@/components/feedbacks/Feedback";
import FeedbacksLoadingSkeleton from "@/components/feedbacks/FeedbacksLoadingSkeleton";
import kyInstance from "@/lib/ky";
import { FeedbackPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function Feedbacks() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["post-feedbacks"],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          "/api/feedbacks",
          pageParam ? { searchParams: { cursor: pageParam } } : {},
        )
        .json<FeedbackPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const feedbacks = data?.pages.flatMap((page) => page.feedbacks) || [];

  console.log(feedbacks);

  if (status === "pending") {
    return <FeedbacksLoadingSkeleton />;
  }

  if (status === "success" && !feedbacks.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground">
        No one has posted anything yet.
      </p>
    );
  }

  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        An error occurred while loading posts.
      </p>
    );
  }

  return (
    <InfiniteScrollContainer
      className="space-y-5"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      <div className="space-y-4">
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="mx-auto w-full">
            <Feedback feedback={feedback} />
          </div>
        ))}
        {isFetchingNextPage && (
          <Loader2 className="mx-auto my-3 animate-spin" />
        )}
      </div>
    </InfiniteScrollContainer>
  );
}
