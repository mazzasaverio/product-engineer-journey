import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { getAllPostsFromNotion } from "@/services/posts";

export async function GET(req: NextRequest) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const order = req.nextUrl.searchParams.get("order") || "desc";
    const sortBy = req.nextUrl.searchParams.get("sortBy") || "createdAt";
    const type = req.nextUrl.searchParams.get("type") || "zone";

    const pageSize = 10;

    const { userId } = auth();

    // If the user is not authenticated, limit the results to the first 10 posts
    const isAuthenticated = !!userId;

    const posts = await getAllPostsFromNotion();

    // const posts = await prisma.post.findMany({
    //   where: {
    //     type: type,
    //   },
    //   include: {
    //     attachments: true,
    //     featuresPostRatings: {
    //       include: {
    //         likes: {
    //           where: {
    //             userId: userId !== null ? { equals: userId } : undefined,
    //           },
    //           select: {
    //             userId: true,
    //             rating: true,
    //           },
    //         },
    //         _count: {
    //           select: {
    //             likes: true,
    //           },
    //         },
    //       },
    //     },
    //     bookmarks: isAuthenticated
    //       ? {
    //           where: {
    //             userId: userId,
    //           },
    //           select: {
    //             userId: true,
    //           },
    //         }
    //       : false, // No bookmarks for unauthenticated users
    //   },
    //   orderBy: { [sortBy]: order === "asc" ? "asc" : "desc" },
    //   take: pageSize + (isAuthenticated ? 1 : 0), // Fetch one extra post for pagination if authenticated
    //   cursor: cursor ? { id: cursor } : undefined,
    // });

    // If authenticated, handle pagination
    const nextCursor =
      isAuthenticated && posts.length > pageSize ? posts[pageSize].id : null;

    const data = {
      posts: posts.slice(0, pageSize), // Always return only the first 10 posts
      nextCursor: isAuthenticated ? nextCursor : null, // Only provide nextCursor if authenticated
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
