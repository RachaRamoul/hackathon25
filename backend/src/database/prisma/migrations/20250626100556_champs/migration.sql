-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "description" TEXT NOT NULL DEFAULT 'Aucune description',
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'human';
