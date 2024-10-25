/*
  Warnings:

  - Changed the type of `rate` on the `HistoryProblem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `code` on the `HistoryProblem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "HistoryProblem" DROP COLUMN "rate",
ADD COLUMN     "rate" DOUBLE PRECISION NOT NULL,
DROP COLUMN "code",
ADD COLUMN     "code" INTEGER NOT NULL;
