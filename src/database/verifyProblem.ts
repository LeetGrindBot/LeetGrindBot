import {PrismaClient} from '@prisma/client';
import hasUserCompleted from '../utils/getUserInfo';

const prisma = new PrismaClient();

export async function verify(discordId: string): Promise<any> {
    const user = await prisma.leetCodeLink.findUnique({
        where: {
           idDiscord: discordId 
        }
    });
    if (!user) {
        throw "Il faut linker son compte";
    }
    const leetcodeUsername = user.leetCodeUsername;
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
    const completed = await hasUserCompleted(leetcodeUsername, lastProblemSlug);
    return { completed: completed, titleSlug: lastProblemSlug };
}

export async function addPoints(discordId: string, titleSlug: string, points: number) {
    await prisma.historyPoint.create({
        data: {
            idDiscord: discordId,
            idHistoryProblem: titleSlug,
            Points: points
        }
    });
}
