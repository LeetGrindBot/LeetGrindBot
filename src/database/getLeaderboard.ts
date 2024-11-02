import {PrismaClient} from '@prisma/client';
import log from "../logger";
import {getEndDate, getStartDate} from '../utils/dateUtils';
import {GetLeadersBoardsInterface} from "../interfaces/getLeadersBoards.interface";

const prisma = new PrismaClient();

export async function getLeaderboard(date: Date, limit: number): Promise<GetLeadersBoardsInterface[]> {
    const startDate = getStartDate(date);
    const endDate = getEndDate(date);
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
