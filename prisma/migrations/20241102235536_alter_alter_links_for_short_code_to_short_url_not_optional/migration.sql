/*
  Warnings:

  - Made the column `short_url` on table `Link` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Link" ALTER COLUMN "short_url" SET NOT NULL;
