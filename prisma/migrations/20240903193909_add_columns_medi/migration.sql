/*
  Warnings:

  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_userId_fkey";

-- AlterTable
ALTER TABLE "post_media" ADD COLUMN     "order" INTEGER,
ADD COLUMN     "tag" TEXT;

-- DropTable
DROP TABLE "sessions";
