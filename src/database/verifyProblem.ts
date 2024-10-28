import {PrismaClient} from '@prisma/client';
import hasUserCompleted from '../utils/getUserInfo';

const prisma = new PrismaClient();

export async function verify( username: string): Promise<any> {
    const lastProblem = await prisma.historyProblem.findFirst({
        orderBy: {
            createdDate: "desc"
        },
        take: 1
    });
    if (!lastProblem) {
        throw "DB empty";
    }
    const lastProblemSlug = lastProblem.titleSlug;
    const completionData = await hasUserCompleted(username, lastProblemSlug);
    return { completed: completionData.completed, titleSlug: lastProblemSlug, lang: completionData.lang };
}

export async function addPoints(discordId: string, titleSlug: string, points: number): Promise<any> {
    const data = await prisma.historyPoint.create({
        data: {
            idDiscord: discordId,
            idHistoryProblem: titleSlug,
            Points: points
        }
    });

    return data;
}

export async function getPoints(discordId: string): Promise<any> {
    return prisma.historyPoint.findMany({
        where: {
            idDiscord: discordId
        }
    });
}
