import {PrismaClient} from '@prisma/client';
import log from "../logger";
import {GetLeadersBoardsInterface} from "../interfaces/getLeadersBoards.interface";

const prisma = new PrismaClient();

export async function getLeaderboard(startDate: Date, endDate: Date, limit: number): Promise<GetLeadersBoardsInterface[]> {
    log.info("[LOG | INFO | LEADERBOARD] : Generating leaderboard for dates : " + startDate.toLocaleDateString("fr-FR") + " " + endDate.toLocaleDateString("fr-FR") + ".");
    const scores = await prisma.historyPoint.groupBy({
        by: ['idDiscord'],
        where: {
            createdDate: {
                gte: startDate,
                lte: endDate,
            },
        },
        _sum: {
            Points: true,
        },
        orderBy: {
            _sum: {
                Points: 'desc',
            }
        },
        take: limit
    });
    const userIds = scores.map((val) => val.idDiscord);
    const usernames = await prisma.leetCodeLink.findMany({
        select: {
            idDiscord: true,
            leetCodeUsername: true
        },
        where: {
            idDiscord: {
                in: userIds
            }
        }
    });
    const res = scores.map((val) => {
        const points = val._sum.Points;
        const discordId = val.idDiscord;
        const username = usernames.find((el) => el.idDiscord === val.idDiscord)?.leetCodeUsername;
        return { username: username, points: points, discordId: discordId };
    });
    if (!res) {
        log.error("[ERROR - DATABASE - getLeaderboard]");
        throw "error";
    }
    return res;
}
