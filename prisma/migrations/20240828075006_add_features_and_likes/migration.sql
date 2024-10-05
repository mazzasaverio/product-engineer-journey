/*
  Warnings:

  - You are about to drop the column `postId` on the `likes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,featureId]` on the table `likes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `featureId` to the `likes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_postId_fkey";

-- DropIndex
DROP INDEX "likes_userId_postId_key";

-- AlterTable
ALTER TABLE "likes" DROP COLUMN "postId",
ADD COLUMN     "featureId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "features" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "features_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "likes_userId_featureId_key" ON "likes"("userId", "featureId");

-- AddForeignKey
ALTER TABLE "features" ADD CONSTRAINT "features_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "features"("id") ON DELETE CASCADE ON UPDATE CASCADE;
