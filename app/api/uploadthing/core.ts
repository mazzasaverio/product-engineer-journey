import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { createUploadthing, FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const fileRouter = {
  postAttachment: f({
    image: { maxFileSize: "4MB", maxFileCount: 5 },
    video: { maxFileSize: "64MB", maxFileCount: 5 },
  })
    .middleware(async () => {
      const { userId } = auth();

      if (!userId) throw new UploadThingError("Unauthorized");

      return {};
    })
    .onUploadComplete(async ({ file }) => {
      const appId = process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID;
      if (!appId) {
        throw new Error("NEXT_PUBLIC_UPLOADTHING_APP_ID is not defined");
      }

      const media = await prisma.media.create({
        data: {
          url: file.url.replace(
            "/f/",
            `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`,
          ),
          type: file.type.startsWith("image") ? "IMAGE" : "VIDEO",
          fileName: file.name,
          folder: "placeholder",
        },
      });

      return { mediaId: media.id };
    }),

  feedbackAttachment: f({
    image: { maxFileSize: "4MB", maxFileCount: 5 },
    video: { maxFileSize: "64MB", maxFileCount: 5 },
  })
    .middleware(async () => {
      const { userId } = auth();

      console.log("userId uploadthing", userId);

      if (!userId) throw new UploadThingError("Unauthorized");

      return {};
    })
    .onUploadComplete(async ({ file }) => {
      const appId = process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID;
      if (!appId) {
        throw new Error("NEXT_PUBLIC_UPLOADTHING_APP_ID is not defined");
      }

      const media = await prisma.mediaFeedbacks.create({
        data: {
          url: file.url.replace(
            "/f/",
            `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`,
          ),
          type: file.type.startsWith("image") ? "IMAGE" : "VIDEO",
          fileName: file.name,
          folder: "placeholder",
        },
      });

      return { mediaId: media.id };
    }),
} satisfies FileRouter;

export type AppFileRouter = typeof fileRouter;
