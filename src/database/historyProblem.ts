import {PrismaClient} from '@prisma/client';
import {LeetCodeProblemInterface} from "../interfaces";
import log from "../logger";

const prisma = new PrismaClient();

export async function createProblem(data: LeetCodeProblemInterface) {
    await prisma.historyProblem.create({
        data: {
            code: parseInt(data.code),
            title: data.title,
            titleSlug: data.titleSlug,
            url: data.url,
            rate: parseFloat(String(data.rate)),
            difficulty: data.difficulty
        }
    });
}

export async function containsProblem(url: string) : Promise<boolean> {
    const result = await prisma.historyProblem.findFirst({
        where: {
            url: url
        }
    });
    if(result) {
        return true;
    }
    return false;
}

export async function getDifficulty(titleSlug: string) : Promise<number> {
    const res = await prisma.historyProblem.findUnique({
        where: {
            titleSlug: titleSlug
        } 
    });
    if (!res) {
        log.error("[ERROR - DATABASE - getDifficulty] Missing problem with slug : ", titleSlug);
        throw "Missing problem with slug " + titleSlug;
    }
    return res.difficulty;
}

export async function getRate(titleSlug: string) : Promise<number> {
    const res = await prisma.historyProblem.findUnique({
        where: {
            titleSlug: titleSlug
        } 
    });
    if (!res) {
        log.error("[ERROR - DATABASE - getDifficulty] Missing problem with slug : ", titleSlug);
        throw "Missing problem with slug " + titleSlug;
    }
    return res.rate;
}
