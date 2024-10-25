/*
  Warnings:

  - Added the required column `rate` to the `HistoryProblem` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `code` on the `HistoryProblem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "HistoryProblem" ADD COLUMN     "rate" DOUBLE PRECISION NOT NULL,
DROP COLUMN "code",
ADD COLUMN     "code" INTEGER NOT NULL;
