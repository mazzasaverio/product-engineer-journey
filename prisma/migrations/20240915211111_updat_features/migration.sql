/*
  Warnings:

  - You are about to drop the column `featureId` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the `features` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,postId,featurePostRatingId]` on the table `likes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `featurePostRatingId` to the `likes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "features" DROP CONSTRAINT "features_postId_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_featureId_fkey";

-- DropIndex
DROP INDEX "likes_userId_featureId_postId_key";

-- AlterTable
ALTER TABLE "likes" DROP COLUMN "featureId",
ADD COLUMN     "featurePostRatingId" TEXT NOT NULL;

-- DropTable
DROP TABLE "features";

-- CreateTable
CREATE TABLE "list_features" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "list_features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "features_post_rating" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "featureId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "features_post_rating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "likes_userId_postId_featurePostRatingId_key" ON "likes"("userId", "postId", "featurePostRatingId");

-- AddForeignKey
ALTER TABLE "features_post_rating" ADD CONSTRAINT "features_post_rating_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "features_post_rating" ADD CONSTRAINT "features_post_rating_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "list_features"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_featurePostRatingId_fkey" FOREIGN KEY ("featurePostRatingId") REFERENCES "features_post_rating"("id") ON DELETE CASCADE ON UPDATE CASCADE;
