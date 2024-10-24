-- CreateTable
CREATE TABLE "HistoryPoint" (
    "idDiscord" TEXT NOT NULL,
    "idHistoryProblem" TEXT NOT NULL,
    "leetCodeProblem" TEXT NOT NULL,
    "leetCodeLink" TEXT NOT NULL,
    "Points" INTEGER NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HistoryPoint_pkey" PRIMARY KEY ("idDiscord")
);

-- CreateTable
CREATE TABLE "HistoryProblem" (
    "id" TEXT NOT NULL,
    "titleSlug" TEXT NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HistoryProblem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HistoryPoint_idDiscord_key" ON "HistoryPoint"("idDiscord");

-- CreateIndex
CREATE UNIQUE INDEX "HistoryProblem_id_key" ON "HistoryProblem"("id");

-- CreateIndex
CREATE UNIQUE INDEX "HistoryProblem_titleSlug_key" ON "HistoryProblem"("titleSlug");

-- AddForeignKey
ALTER TABLE "HistoryPoint" ADD CONSTRAINT "HistoryPoint_idDiscord_fkey" FOREIGN KEY ("idDiscord") REFERENCES "LeetCodeLink"("idDiscord") ON DELETE CASCADE ON UPDATE CASCADE;
