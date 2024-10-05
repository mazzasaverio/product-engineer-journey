-- AlterTable
ALTER TABLE "features_post_rating" ADD COLUMN     "finalRating" DOUBLE PRECISION,
ADD COLUMN     "finalRatingComment" TEXT,
ADD COLUMN     "finalRatingCount" INTEGER;
