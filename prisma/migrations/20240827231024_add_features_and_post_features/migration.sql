/*
  Warnings:

  - A unique constraint covering the columns `[userId,postId,featureId]` on the table `likes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `featureId` to the `likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `likes` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "likes_userId_postId_key";

-- AlterTable
ALTER TABLE "likes" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "featureId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "features" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_features" (
    "postId" TEXT NOT NULL,
    "featureId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "post_features_postId_featureId_key" ON "post_features"("postId", "featureId");

-- CreateIndex
CREATE UNIQUE INDEX "likes_userId_postId_featureId_key" ON "likes"("userId", "postId", "featureId");

-- AddForeignKey
ALTER TABLE "post_features" ADD CONSTRAINT "post_features_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_features" ADD CONSTRAINT "post_features_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "features"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "features"("id") ON DELETE CASCADE ON UPDATE CASCADE;
