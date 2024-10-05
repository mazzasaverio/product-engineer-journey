/*
  Warnings:

  - Added the required column `desc` to the `features` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `features` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "features" ADD COLUMN     "desc" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "city" TEXT NOT NULL DEFAULT 'Milano',
ADD COLUMN     "country" TEXT NOT NULL DEFAULT 'Italia',
ADD COLUMN     "region" TEXT NOT NULL DEFAULT 'Lombardia',
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'city',
ADD COLUMN     "zone" TEXT NOT NULL DEFAULT '-';

-- CreateTable
CREATE TABLE "PostInfo" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "PostInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostMetrics" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PostMetrics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostInfo" ADD CONSTRAINT "PostInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostInfo" ADD CONSTRAINT "PostInfo_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostMetrics" ADD CONSTRAINT "PostMetrics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostMetrics" ADD CONSTRAINT "PostMetrics_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
