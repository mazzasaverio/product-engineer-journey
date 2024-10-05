import prisma from "@/lib/prisma";
import { LikeInfo } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  req: Request,
  { params: { feedbackId } }: { params: { feedbackId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const feedback = await prisma.feedback.findUnique({
      where: { id: feedbackId },
      select: {
        likes: {
          where: {
            userId: userId,
          },
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });

    if (!feedback) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    const data: LikeInfo = {
      likes: feedback._count.likes,
      isLikedByUser: !!feedback.likes.length,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params: { feedbackId } }: { params: { feedbackId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const feedback = await prisma.feedback.findUnique({
      where: { id: feedbackId },
      select: {
        userId: true,
      },
    });

    if (!feedback) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    await prisma.$transaction([
      prisma.likeFeedback.upsert({
        where: {
          userId_feedbackId: {
            userId: userId,
            feedbackId,
          },
        },
        create: {
          userId: userId,
          feedbackId,
        },
        update: {},
      }),
    ]);

    return new Response();
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params: { feedbackId } }: { params: { feedbackId: string } },
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const feedback = await prisma.feedback.findUnique({
      where: { id: feedbackId },
      select: {
        userId: true,
      },
    });

    if (!feedback) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    await prisma.$transaction([
      prisma.likeFeedback.deleteMany({
        where: {
          userId: userId,
          feedbackId,
        },
      }),
    ]);

    return new Response();
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
