import { PostNotion } from "@/types/post";
import { Prisma } from "@prisma/client";

export function getPostDataInclude(loggedInUserId: string) {
  return {
    user: {
      select: {
        id: true,
      },
    },
    attachments: true,
    featuresPostRatings: {
      include: {
        likes: {
          where: {
            userId: loggedInUserId,
          },
          select: {
            userId: true,
            rating: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    },
    bookmarks: {
      where: {
        userId: loggedInUserId,
      },
      select: {
        userId: true,
      },
    },
    metrics: {
      select: {
        avgSalePerSqM: true,
        avgRentPerSqM: true,
      },
    },
  } satisfies Prisma.PostInclude;
}

export type PostData = Prisma.PostGetPayload<{
  include: ReturnType<typeof getPostDataInclude>;
}>;

export interface PostsPage {
  posts: PostNotion[];
  nextCursor: string | null;
}

export type FeedbackData = Prisma.FeedbackGetPayload<{
  include: ReturnType<typeof getFeedbackDataInclude>;
}>;

export interface FeedbackPage {
  feedbacks: FeedbackData[];
  nextCursor: string | null;
}
export function getFeedbackDataInclude(loggedInUserId: string) {
  return {
    user: {
      select: {
        id: true,
      },
    },
    attachments: true,
    likes: {
      where: {
        userId: loggedInUserId,
      },
      select: {
        userId: true,
      },
    },
    _count: {
      select: {
        likes: true,
        comments: true,
      },
    },
  } satisfies Prisma.FeedbackInclude;
}

export interface LikeInfo {
  likes: number;
  isLikedByUser: boolean;
}

export interface LikeRatingInfo {
  likes: number;
  isLikedByUser: boolean;
  rating: number | null;
}

export interface BookmarkInfo {
  isBookmarkedByUser: boolean;
}

export function getCommentDataInclude(loggedInUserId: string) {
  return {
    user: {
      select: {
        id: true,
      },
    },
  } satisfies Prisma.CommentInclude;
}

export type CommentData = Prisma.CommentGetPayload<{
  include: ReturnType<typeof getCommentDataInclude>;
}>;

export interface CommentsPage {
  comments: CommentData[];
  previousCursor: string | null;
}
