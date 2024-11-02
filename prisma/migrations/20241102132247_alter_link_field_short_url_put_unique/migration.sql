/*
  Warnings:

  - A unique constraint covering the columns `[short_url]` on the table `Link` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Link_short_url_key" ON "Link"("short_url");
