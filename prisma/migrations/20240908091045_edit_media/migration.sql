/*
  Warnings:

  - You are about to drop the column `tag` on the `post_media` table. All the data in the column will be lost.
  - Added the required column `fileName` to the `post_media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "post_media" DROP COLUMN "tag",
ADD COLUMN     "fileName" TEXT NOT NULL,
ADD COLUMN     "folder" TEXT;
