"use server";

import prisma from "@/lib/prisma";

import { createCommentSchema } from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";

export async function submitComment({
  feedback,
  content,
}: {
  feedback: { id: string };
  content: string;
}) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  const { content: contentValidated } = createCommentSchema.parse({ content });

  const [newComment] = await prisma.$transaction([
    prisma.comment.create({
      data: {
        content: contentValidated,
        feedbackId: feedback.id,
        userId: userId,
      },
      include: {
        user: {
          select: {
            id: true,
          },
        },
      },
    }),
  ]);

  return newComment;
}
