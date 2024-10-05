"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

import { createFeedbackSchema } from "@/lib/validation";

export async function submitFeedback(input: {
  title: string;
  content: string;
  mediaIds: string[];
}) {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  const { title, content, mediaIds } = createFeedbackSchema.parse(input);

  const newPost = await prisma.feedback.create({
    data: {
      title: title,
      content: content,
      userId: userId,
      attachments: {
        connect: mediaIds.map((id) => ({ id })),
      },
    },
    include: {
      user: {
        select: {
          id: true,
        },
      },
    },
  });

  return newPost;
}
