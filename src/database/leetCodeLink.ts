import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export async function linkAccount(username: string, discordId: string) {
    await prisma.leetCodeLink.create({
        data: {
            idDiscord: discordId,
            leetCodeUsername: username
        }
    });
}
