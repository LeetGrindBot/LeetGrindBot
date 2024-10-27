/*
  Warnings:

  - The primary key for the `HistoryPoint` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "HistoryPoint_idDiscord_key";

-- AlterTable
ALTER TABLE "HistoryPoint" DROP CONSTRAINT "HistoryPoint_pkey",
ADD CONSTRAINT "HistoryPoint_pkey" PRIMARY KEY ("idDiscord", "idHistoryProblem");
