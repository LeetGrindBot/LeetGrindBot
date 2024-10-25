import {PrismaClient} from '@prisma/client';
import {LeetCodeProblemInterface} from "../interfaces";

const prisma = new PrismaClient();

async function createProblem(data: LeetCodeProblemInterface) {
    await prisma.historyProblem.create({
        data: {
            code: data.code,
            title: data.title,
            titleSlug: data.titleSlug,
            url: data.url,
            rate: data.rate
        }
    });
}
