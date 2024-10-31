import {PrismaClient} from '@prisma/client';
import log from "../logger";
import { getStartDate, getEndDate } from '../utils/dateUtils';

const prisma = new PrismaClient();

export async function getLeaderboard(date: Date, limit: number) {
    const startDate = getStartDate(date);
    const endDate = getEndDate(date);
    const scores = await prisma.historyPoint.groupBy({
        by: 'idDiscord',
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
    const userIds = scores.map((val) => {
        return val.idDiscord;
    });
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
        const username = usernames.find((el) => el.idDiscord === val.idDiscord)?.leetCodeUsername;
        return { username: username, points: points}; 
    });
    if (!res) {
        log.error("[ERROR - DATABASE - getLeaderboard]");
        throw "error";
    }
    return res;

}
