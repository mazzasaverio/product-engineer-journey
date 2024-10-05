/*
  Warnings:

  - You are about to drop the column `userId` on the `PostInfo` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `PostMetrics` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `PostMetrics` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `PostMetrics` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PostInfo" DROP CONSTRAINT "PostInfo_userId_fkey";

-- DropForeignKey
ALTER TABLE "PostMetrics" DROP CONSTRAINT "PostMetrics_userId_fkey";

-- AlterTable
ALTER TABLE "PostInfo" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "PostMetrics" DROP COLUMN "name",
DROP COLUMN "userId",
DROP COLUMN "value",
ADD COLUMN     "rentPerSquareMeterOMI" DOUBLE PRECISION,
ADD COLUMN     "salePerSquareMeterOMI" DOUBLE PRECISION;
