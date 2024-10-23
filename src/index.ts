import {Client, GatewayIntentBits} from "discord.js";
import eventHandler from "./handlers/eventHandler";

import config from "./config/index";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.login(config.discordToken).then(() => {
    console.log("Logged in!");
}).catch(console.error);

eventHandler(client);
