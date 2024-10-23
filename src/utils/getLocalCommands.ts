import path from 'path';
import getAllFiles from "./getAllFiles";

const getLocalCommands = () => {
    let localCommands = [];
    const commandFolders = getAllFiles(path.join(__dirname, "..", "commands"), true);

    for (const commandFolder of commandFolders) {
        const commandFiles = getAllFiles(commandFolder);

        for (const commandFile of commandFiles) {
            const commandObject = require(commandFile);

            // @TODO add process.env.MODE === "dev"
            if (commandObject.devOnly) {
                localCommands.push(commandObject);
            } else if (!commandObject.devOnly) {
                localCommands.push(commandObject);
            }

        }
    }

    return localCommands;

}

export default getLocalCommands;
