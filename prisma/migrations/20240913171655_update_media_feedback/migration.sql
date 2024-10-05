/*
  Warnings:

  - You are about to drop the `feedback_attachments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "feedback_attachments" DROP CONSTRAINT "feedback_attachments_feedbackId_fkey";

-- DropTable
DROP TABLE "feedback_attachments";

-- DropEnum
DROP TYPE "MediaTypeFeedback";

-- CreateTable
CREATE TABLE "feedback_media" (
    "id" TEXT NOT NULL,
    "folder" TEXT,
    "fileName" TEXT NOT NULL,
    "feedbackId" TEXT,
    "order" INTEGER,
    "type" "MediaType" NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feedback_media_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "feedback_media" ADD CONSTRAINT "feedback_media_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "feedbacks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
