/*
  Warnings:

  - You are about to drop the column `leetCodeLink` on the `HistoryPoint` table. All the data in the column will be lost.
  - You are about to drop the column `leetCodeProblem` on the `HistoryPoint` table. All the data in the column will be lost.
  - The primary key for the `HistoryProblem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `HistoryProblem` table. All the data in the column will be lost.
  - Added the required column `titleSlug` to the `HistoryPoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `HistoryProblem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `HistoryProblem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `HistoryProblem` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "HistoryProblem_id_key";

-- AlterTable
ALTER TABLE "HistoryPoint" DROP COLUMN "leetCodeLink",
DROP COLUMN "leetCodeProblem",
ADD COLUMN     "titleSlug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "HistoryProblem" DROP CONSTRAINT "HistoryProblem_pkey",
DROP COLUMN "id",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL,
ADD CONSTRAINT "HistoryProblem_pkey" PRIMARY KEY ("titleSlug");

-- AddForeignKey
ALTER TABLE "HistoryPoint" ADD CONSTRAINT "HistoryPoint_titleSlug_fkey" FOREIGN KEY ("titleSlug") REFERENCES "HistoryProblem"("titleSlug") ON DELETE CASCADE ON UPDATE CASCADE;
