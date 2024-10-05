/*
  Warnings:

  - You are about to drop the `post_info` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `post_metrics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "post_info" DROP CONSTRAINT "post_info_postId_fkey";

-- DropForeignKey
ALTER TABLE "post_metrics" DROP CONSTRAINT "post_metrics_postId_fkey";

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "avgRentPerSqM" DOUBLE PRECISION,
ADD COLUMN     "avgSalePerSqM" DOUBLE PRECISION,
ADD COLUMN     "shortDescription" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "title" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "post_info";

-- DropTable
DROP TABLE "post_metrics";
