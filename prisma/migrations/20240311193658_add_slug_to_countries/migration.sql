/*
  Warnings:

  - A unique constraint covering the columns `[alpha]` on the table `countries` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `countries` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `countries` table without a default value. This is not possible if the table is not empty.
  - Made the column `alpha` on table `countries` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "countries" ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "alpha" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "countries_alpha_key" ON "countries"("alpha");

-- CreateIndex
CREATE UNIQUE INDEX "countries_slug_key" ON "countries"("slug");
