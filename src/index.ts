import {Client, GatewayIntentBits} from "discord.js";

import eventHandler from "./handlers/eventHandler";
import { createLeetcodeJob, createWaitingMessageJob } from "./utils/cronjob";
import config from "./config/index";
import log from "./logger";
import {CronJob} from "cron";

const client : Client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.login(config.discordToken).then(() :void => {
   log.info('Bot is now connected to Discord');

}).catch(console.error);

eventHandler(client);

const job1: CronJob = createLeetcodeJob(client);
const job2: CronJob = createWaitingMessageJob(client);
job1.start();
job2.start();
