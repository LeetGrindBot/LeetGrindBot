import {Client, GatewayIntentBits} from "discord.js";
import eventHandler from "./handlers/eventHandler";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

eventHandler(client);

client.login("").then(() => {
    console.log("Logged in!");
}).catch(console.error);
