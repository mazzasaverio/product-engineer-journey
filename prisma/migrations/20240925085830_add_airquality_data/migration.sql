/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `list_features` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "list_features_name_key" ON "list_features"("name");
