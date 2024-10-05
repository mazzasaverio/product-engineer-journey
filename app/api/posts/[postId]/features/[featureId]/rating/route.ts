import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params: { postId, featureId },
  }: { params: { postId: string; featureId: string } },
) {
  try {
    // Fetch the FeaturePostRating for the specified postId and featureId
    const featurePostRating = await prisma.featurePostRating.findFirst({
      where: {
        postId: postId,
        featureId: featureId,
      },
      select: {
        finalRating: true,
        finalRatingCount: true,
        finalRatingComment: true,
      },
    });

    if (!featurePostRating) {
      return new Response(
        JSON.stringify({ error: "FeaturePostRating not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return new Response(
      JSON.stringify({
        finalRating: featurePostRating.finalRating,
        finalRatingCount: featurePostRating.finalRatingCount,
        finalRatingComment: featurePostRating.finalRatingComment,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
