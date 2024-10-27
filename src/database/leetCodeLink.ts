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

export async function verifyLink(discordId: string): Promise<any> {
        const data = prisma.leetCodeLink.findUnique({
            where: {
                idDiscord: discordId
            }
        });
    return data;
}

export async function alreadyLinked(discordId: string): Promise<boolean> {
    const data = await prisma.leetCodeLink.findUnique({
        where: {
            idDiscord: discordId
        }
    });
    return data !== null;
}
