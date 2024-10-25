/*
  Warnings:

  - Added the required column `difficulty` to the `HistoryProblem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HistoryProblem" ADD COLUMN     "difficulty" INTEGER NOT NULL;
