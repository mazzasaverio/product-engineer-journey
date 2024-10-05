"use client";

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import Post from "@/components/posts/Post";
import PostDetails from "@/components/posts/PostDetails";
import PostsLoadingSkeleton from "@/components/posts/PostsLoadingSkeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import kyInstance from "@/lib/ky";
import { PostsPage } from "@/lib/types";
import { PostNotion } from "@/types/post";
import { useUser } from "@clerk/nextjs";
import { ListFeature } from "@prisma/client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Posts({ type }: { type: string }) {
  const searchParams = useSearchParams();
  const order = searchParams.get("order") || "desc";
  const sortBy = searchParams.get("sortBy") || "avgSalePerSqM";

  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  // Query per ottenere le feature predefinite
  const { data: listFeatures, status: featuresStatus } = useQuery({
    queryKey: ["list-features"],
    queryFn: () => kyInstance.get("/api/posts/features").json<ListFeature[]>(),

    refetchOnMount: true,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["post-feed", type, sortBy, order],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get("/api/posts", {
          searchParams: {
            cursor: pageParam ?? "",
            sortBy: sortBy,
            order: order,
            type: type,
          },
        })
        .json<PostsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnMount: true,
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  console.log(posts);

  if (status === "pending" || featuresStatus === "pending") {
    return <PostsLoadingSkeleton />;
  }

  if (status === "success" && !posts.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground">
        No one has posted anything yet.
      </p>
    );
  }

  if (status === "error" || featuresStatus === "error") {
    return (
      <p className="text-center text-destructive">
        An error occurred while loading posts or features.
      </p>
    );
  }

  const handleDialogTriggerClick = () => {
    if (!isSignedIn) {
      router.push("/sign-up");
    }
  };
  
  return (
    <InfiniteScrollContainer
      className="space-y-5"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {posts.map((post, index) => (
          <Post key={post.id} post={post} index={index} />
        ))}
      </div>
      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    </InfiniteScrollContainer>
  );
}
