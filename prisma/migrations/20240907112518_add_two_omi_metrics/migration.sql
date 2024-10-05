/*
  Warnings:

  - You are about to drop the column `rentPerSquareMeterOMI` on the `PostMetrics` table. All the data in the column will be lost.
  - You are about to drop the column `salePerSquareMeterOMI` on the `PostMetrics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PostMetrics" DROP COLUMN "rentPerSquareMeterOMI",
DROP COLUMN "salePerSquareMeterOMI",
ADD COLUMN     "avgRentPerSqM" DOUBLE PRECISION,
ADD COLUMN     "avgSalePerSqM" DOUBLE PRECISION;
