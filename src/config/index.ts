import dotenv, {DotenvConfigOutput} from "dotenv";
import path from "path";

const envPath: string = path.join(__dirname, '../../.env');

const envFound: DotenvConfigOutput = dotenv.config({ path: envPath });

if (envFound.error) {
    throw new Error("Couldn't find .env file at " + envPath);
}

export default {
    mode: process.env.MODE,
    discordToken: process.env.DISCORD_TOKEN,
    guildId: process.env.GUILD_ID,
    channelId: process.env.CHANNEL_ID,
};
