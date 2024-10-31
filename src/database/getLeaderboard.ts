import {PrismaClient} from '@prisma/client';
import {LeetCodeProblemInterface} from "../interfaces";
import log from "../logger";
import { getStartDate, getEndDate } from '../utils/dateUtils';

const prisma = new PrismaClient();

export async function getLeaderboard(date: Date, limit: number) {
    const startDate = getStartDate(date);
    const endDate = getEndDate(date);
    const res = await prisma.historyPoint.groupBy({
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
    });
    if (!res) {
        log.error("[ERROR - DATABASE - getLeaderboard]");
        throw "error";
    }
    return res;

}

getLeaderboard(new Date(), 10);
