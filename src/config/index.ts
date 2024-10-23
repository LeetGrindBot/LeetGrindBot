import dotenv, {DotenvConfigOutput} from "dotenv";
import path from "path";

const envPath: string = path.join(__dirname, '../../.env');

const envFound: DotenvConfigOutput = dotenv.config({ path: envPath });

if (envFound.error) {
    throw new Error("Couldn't find .env file at " + envPath);
}

export default {
    discordToken: process.env.DISCORD_TOKEN
};
