/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the `FormVariable` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FormVariable" DROP CONSTRAINT "FormVariable_formId_fkey";

-- AlterTable
ALTER TABLE "Form" DROP COLUMN "updatedAt";

-- DropTable
DROP TABLE "FormVariable";

-- DropEnum
DROP TYPE "VariableType";

-- CreateTable
CREATE TABLE "Variable" (
    "id" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL,

    CONSTRAINT "Variable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Variable_formId_idx" ON "Variable"("formId");

-- AddForeignKey
ALTER TABLE "Variable" ADD CONSTRAINT "Variable_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;
