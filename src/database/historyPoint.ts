import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export async function updateHistoryPoint(titleSlug: string, discordID: string, newPoints: number): Promise<void> {
    await prisma.historyPoint.updateMany({
        where: {
            idDiscord: discordID,
            idHistoryProblem: titleSlug
        },
        data: {
            Points: newPoints,
        },
    });
}

export async function listHistoryPoints() {
    return await prisma.historyPoint.findMany({
        select: {
            idDiscord: true,
            idHistoryProblem: true,
            Points: true,
            createdDate: true
        }
    });
}
