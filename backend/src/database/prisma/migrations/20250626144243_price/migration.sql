/*
  Warnings:

  - You are about to drop the column `price` on the `Variable` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0.0;

-- AlterTable
ALTER TABLE "Variable" DROP COLUMN "price";
