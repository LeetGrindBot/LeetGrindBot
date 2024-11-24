import {CronJob} from 'cron';
import getRandomProblem from "../utils/getProblem"
import config from "../config/index";
import createEmbeds from "../embeds/leetCodeEmbeds";
import createWaitingEmbeds from '../embeds/waitingMessageEmbed';
import {getRandomDifficulty} from "./getRandom";
import log from "../logger";
import {LeetCodeProblemInterface} from "../interfaces";
import {createProblem} from "../database/historyProblem";
import { cleanChannel } from './channelCleaner';

export function createLeetcodeJob(client : any) : CronJob {
    return new CronJob(
        '0 18 * * 1-5',
        () => sendNewProblem(client),
        null,
        false,
        'Europe/Paris'
    );
}
export function createWaitingMessageJob(client : any) : CronJob {
    return new CronJob(
        '0 18 * * 6',
        () => sendWaitingMessage(client),
        null,
        false,
        'Europe/Paris'
    );
}

export async function sendNewProblem(client : any) {
    const guildId = config.guildId;
    const channelId = config.channelId;
    if(guildId == "") {
        log.error("Empty guildId");
        return;
    }
    if(channelId == "") {
        log.error("Empty channelId");
        return;
    }

    const difficulty: number = getRandomDifficulty();
    const problem: LeetCodeProblemInterface = await getRandomProblem(difficulty);

    const guild = client.guilds.cache.get(guildId);
    if (!guild) {
        log.error('Guild not found!');
        return;
    }
    const channel = guild.channels.cache.get(channelId);
    if (!channel) {
        log.error('Channel not found!');
        return;
    }
    await cleanChannel(channel);
    await createProblem(problem)
    .then(() => log.info("[LOG | CREATE PROBLEM] : " + problem.title))
    .catch(err => log.error(err));

    await channel.send({embeds: [createEmbeds(problem.url, problem.title, difficulty)]});
}

export async function sendWaitingMessage(client : any) {
    const guildId = config.guildId;
    const channelId = config.channelId;
    if(guildId == "") {
        log.error("Empty guildId");
        return;
    }
    if(channelId == "") {
        log.error("Empty channelId");
        return;
    }
    
    const guild = client.guilds.cache.get(guildId);
    const channel = guild.channels.cache.get(channelId);
    if(!channel) {
        log.error('Channel was not found');
    }
    await cleanChannel(channel);
    await channel.send({embeds: [createWaitingEmbeds()]});
}
