import {PrismaClient} from '@prisma/client';
import {LeetCodeProblemInterface} from "../interfaces";

const prisma = new PrismaClient();

export async function createProblem(data: LeetCodeProblemInterface) {
    await prisma.historyProblem.create({
        data: {
            code: parseInt(data.code),
            title: data.title,
            titleSlug: data.titleSlug,
            url: data.url,
            rate: parseFloat(String(data.rate))
        }
    });
}
