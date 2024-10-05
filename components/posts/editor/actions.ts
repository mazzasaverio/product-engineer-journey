"use server";

import prisma from "@/lib/prisma";
import { getPostDataInclude } from "@/lib/types";
import { createPostSchema } from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
export async function submitPost(input: {
  content: string;
  mediaIds: string[];
  country?: string;
  region?: string;
  city?: string;
  zone?: string;
}) {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  // Validazione dell'input usando lo schema aggiornato
  const { content, mediaIds, country, region, city, zone } =
    createPostSchema.parse(input);

  // Creazione del nuovo post con il record collegato in PostInfo
  const newPost = await prisma.post.create({
    data: {
      content,
      userId: userId,
      country,
      region,
      city,
      zone,
      attachments: {
        connect: mediaIds.map((id) => ({ id })),
      },
    },
    include: getPostDataInclude(userId),
  });

  return newPost;
}
