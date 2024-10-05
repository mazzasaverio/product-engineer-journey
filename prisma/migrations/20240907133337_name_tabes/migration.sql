/*
  Warnings:

  - You are about to drop the `PostInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostMetrics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PostInfo" DROP CONSTRAINT "PostInfo_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostMetrics" DROP CONSTRAINT "PostMetrics_postId_fkey";

-- DropTable
DROP TABLE "PostInfo";

-- DropTable
DROP TABLE "PostMetrics";

-- CreateTable
CREATE TABLE "post_info" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "post_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_metrics" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "avgSalePerSqM" DOUBLE PRECISION,
    "avgRentPerSqM" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "post_metrics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "post_info" ADD CONSTRAINT "post_info_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_metrics" ADD CONSTRAINT "post_metrics_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
