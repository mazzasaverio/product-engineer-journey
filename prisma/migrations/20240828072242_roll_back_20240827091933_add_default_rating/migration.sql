/*
  Warnings:

  - You are about to drop the column `createdAt` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the column `featureId` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the `features` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `post_features` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,postId]` on the table `likes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_featureId_fkey";

-- DropForeignKey
ALTER TABLE "post_features" DROP CONSTRAINT "post_features_featureId_fkey";

-- DropForeignKey
ALTER TABLE "post_features" DROP CONSTRAINT "post_features_postId_fkey";

-- DropIndex
DROP INDEX "likes_userId_postId_featureId_key";

-- AlterTable
ALTER TABLE "likes" DROP COLUMN "createdAt",
DROP COLUMN "featureId",
DROP COLUMN "updatedAt";

-- DropTable
DROP TABLE "features";

-- DropTable
DROP TABLE "post_features";

-- CreateIndex
CREATE UNIQUE INDEX "likes_userId_postId_key" ON "likes"("userId", "postId");
