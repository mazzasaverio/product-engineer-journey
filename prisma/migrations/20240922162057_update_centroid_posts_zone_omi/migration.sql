/*
  Warnings:

  - You are about to drop the column `mainAddress` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `mainAddressLat` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `mainAddressLng` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "mainAddress",
DROP COLUMN "mainAddressLat",
DROP COLUMN "mainAddressLng",
ADD COLUMN     "centroidLat" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "centroidLng" DOUBLE PRECISION DEFAULT 0;
