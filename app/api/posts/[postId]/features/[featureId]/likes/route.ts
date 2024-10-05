import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(
  req: Request,
  {
    params: { postId, featureId },
  }: { params: { postId: string; featureId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { rating } = await req.json();

    // Verifica se esiste un record FeaturePostRating
    let featurePostRating = await prisma.featurePostRating.findFirst({
      where: { postId: postId, featureId: featureId },
    });

    // Se non esiste, crealo
    if (!featurePostRating) {
      // Recupera il nome della feature da ListFeature
      const listFeature = await prisma.listFeature.findUnique({
        where: { id: featureId },
      });

      if (!listFeature) {
        return Response.json({ error: "Feature not found" }, { status: 404 });
      }

      featurePostRating = await prisma.featurePostRating.create({
        data: {
          name: listFeature.name,
          postId: postId,
          featureId: featureId,
        },
      });
    }

    // Upsert del voto
    await prisma.like.upsert({
      where: {
        userId_postId_featurePostRatingId: {
          userId: userId,
          postId: postId,
          featurePostRatingId: featurePostRating.id,
        },
      },
      create: {
        userId: userId,
        postId: postId,
        featurePostRatingId: featurePostRating.id,
        rating,
      },
      update: {
        rating,
      },
    });

    return new Response();
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
