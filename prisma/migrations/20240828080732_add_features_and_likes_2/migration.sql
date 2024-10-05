/*
  Warnings:

  - A unique constraint covering the columns `[userId,featureId,postId]` on the table `likes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `postId` to the `likes` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "likes_userId_featureId_key";

-- AlterTable
ALTER TABLE "likes" ADD COLUMN     "postId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "likes_userId_featureId_postId_key" ON "likes"("userId", "featureId", "postId");

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
