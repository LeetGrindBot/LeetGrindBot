/*
  Warnings:

  - You are about to drop the column `titleSlug` on the `HistoryPoint` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "HistoryPoint" DROP CONSTRAINT "HistoryPoint_titleSlug_fkey";

-- AlterTable
ALTER TABLE "HistoryPoint" DROP COLUMN "titleSlug";

-- AddForeignKey
ALTER TABLE "HistoryPoint" ADD CONSTRAINT "HistoryPoint_idHistoryProblem_fkey" FOREIGN KEY ("idHistoryProblem") REFERENCES "HistoryProblem"("titleSlug") ON DELETE CASCADE ON UPDATE CASCADE;
