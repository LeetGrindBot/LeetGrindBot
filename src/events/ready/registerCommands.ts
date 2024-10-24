import commandComparing from "../../utils/commandComparing";
import getApplicationCommands from "../../utils/getApplicationCommands";
import getLocalCommands from "../../utils/getLocalCommands";
import {testServerId} from "../../config.json";
import config from "../../config";
import log from "../../logger";

module.exports = async (client: any) => {
    try {
        let guildId = null;

        if (config.mode === "dev") {
            guildId = testServerId;
        }

        const localCommands = getLocalCommands();
        const applicationCommands = await getApplicationCommands(client, guildId);

        for (const localCommand of localCommands) {
            const commandName = localCommand.data.name;
            const existingCommand = applicationCommands.cache.find((cmd: any) => cmd.name === commandName);

            if (existingCommand) {
                if (localCommand.deleted) {
                    await applicationCommands.delete(existingCommand.id);
                    log.info(`Application command ${commandName} has been deleted.`);
                    continue;
                }

                const differentCommand = commandComparing(localCommand.data, existingCommand);
                if (differentCommand) {
                    await applicationCommands.edit(existingCommand.id, differentCommand);
                    log.info(`Application command ${commandName} has been edited.`);
                }
            } else {
                if (localCommand.deleted) {
                    log.info(`Application command ${commandName} has been skipped, since property "deleted" is set to "true".`);
                    continue;
                }

                await applicationCommands.create(localCommand.data);
                log.info(`Application command ${commandName} has been registered.`);
            }
        }
    } catch (err) {
        log.error("[ERROR] Error in your registerCommands.js file: " + err);
    }
};
