/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "LeetCodeLink" (
    "idDiscord" TEXT NOT NULL,
    "linkDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leetCodeUsername" TEXT NOT NULL,

    CONSTRAINT "LeetCodeLink_pkey" PRIMARY KEY ("idDiscord")
);

-- CreateIndex
CREATE UNIQUE INDEX "LeetCodeLink_idDiscord_key" ON "LeetCodeLink"("idDiscord");

-- CreateIndex
CREATE UNIQUE INDEX "LeetCodeLink_leetCodeUsername_key" ON "LeetCodeLink"("leetCodeUsername");
