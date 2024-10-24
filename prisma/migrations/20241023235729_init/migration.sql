/*
  Warnings:

  - A unique constraint covering the columns `[idDiscord]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_idDiscord_key" ON "User"("idDiscord");
