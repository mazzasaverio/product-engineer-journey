"use client";

import { cn, formatRelativeDate } from "@/lib/utils";
import { MediaFeedbacks } from "@prisma/client";
import { MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Comments from "../comments/Comments";

import VoteFeedbackButton from "./VoteFeedbackButton";

import { useUser } from "@clerk/nextjs";

import { FeedbackData } from "@/lib/types";

interface CommentButtonProps {
  feedback: {
    _count: {
      comments: number;
    };
  };
  onClick: () => void;
}

interface FeedbackProps {
  feedback: FeedbackData;
}

export default function Feedback({ feedback }: FeedbackProps) {
  const { user } = useUser();

  const [showComments, setShowComments] = useState(false);

  return (
    <div className="group/post relative min-h-[140px] space-y-2 rounded-lg bg-card p-4 shadow-sm">
      <div className="flex flex-col space-y-2 pr-14">
        <div className="whitespace-pre-lin break-words text-xl font-bold">
          {feedback.title}
        </div>
        <div className="whitespace-pre-line break-words">
          {feedback.content}
        </div>
      </div>

      {/* {!!feedback.attachments.length && (
        <MediaPreviews attachments={feedback.attachments} />
      )} */}

      <div className="absolute right-4 top-4">
        <VoteFeedbackButton
          feedbackId={feedback.id}
          initialState={{
            likes: feedback._count.likes,
            isLikedByUser: feedback.likes.some(
              (like) => like.userId === user?.id,
            ),
          }}
        />
      </div>

      {/* Comment button in the bottom-right corner */}
      <div className="absolute bottom-4 right-4">
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-1 text-gray-400"
        >
          <MessageSquare size={16} />
          <span>{feedback._count.comments}</span>
        </button>
      </div>

      {showComments && <Comments feedback={feedback} />}
    </div>
  );
}

interface MediaPreviewsProps {
  attachments: MediaFeedbacks[];
}

function MediaPreviews({ attachments }: MediaPreviewsProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        attachments.length > 1 && "sm:grid sm:grid-cols-2",
      )}
    >
      {attachments.map((m) => (
        <MediaPreview key={m.id} media={m} />
      ))}
    </div>
  );
}

interface MediaPreviewProps {
  media: MediaFeedbacks;
}

function MediaPreview({ media }: MediaPreviewProps) {
  if (media.type === "IMAGE") {
    return (
      <Image
        src={media.url}
        alt="Attachment"
        width={500}
        height={500}
        className="mx-auto size-fit max-h-[30rem] rounded-2xl"
      />
    );
  }

  if (media.type === "VIDEO") {
    return (
      <div>
        <video
          src={media.url}
          controls
          className="mx-auto size-fit max-h-[30rem] rounded-2xl"
        />
      </div>
    );
  }

  return <p className="text-destructive">Unsupported media type</p>;
}

function CommentButton({ feedback, onClick }: CommentButtonProps) {
  return (
    <button onClick={onClick} className="flex items-center gap-2">
      <MessageSquare className="size-5" />
      <span className="text-sm font-medium tabular-nums">
        {/* {feedback._count.comments} */}
        <span className="hidden sm:inline">comments</span>
      </span>
    </button>
  );
}
