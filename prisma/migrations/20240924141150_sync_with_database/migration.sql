/*
  Warnings:

  - A unique constraint covering the columns `[type,city,zoneOMI]` on the table `posts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "posts_type_city_zoneOMI_key" ON "posts"("type", "city", "zoneOMI");
