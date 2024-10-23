import commandComparing from "../../utils/commandComparing";
import getApplicationCommands from "../../utils/getApplicationCommands";
import getLocalCommands from "../../utils/getLocalCommands";
import {testServerId} from "../../config.json";

module.exports = async (client: any) => {
    try {
        let guildId = null;

        process.env.MODE === "dev"
            ? guildId = testServerId
            : guildId;

        const localCommands = getLocalCommands();
        const applicationCommands = await getApplicationCommands(client, guildId);

        for (const localCommand of localCommands) {
            const commandName = localCommand.data.name;
            const existingCommand = await applicationCommands.cache.find((cmd: any) => cmd.name === commandName);

            if (existingCommand) {
                if (localCommand.deleted) {
                    console.log('ici3')
                    await applicationCommands.delete(existingCommand.id);
                    console.log(`Application command ${commandName} has been deleted.`);
                    continue;
                }

                const differentCommand = commandComparing(localCommand.data, existingCommand);
                if (differentCommand) {
                    await applicationCommands.edit(existingCommand.id, differentCommand);
                    console.log(`Application command ${commandName} has been edited.`);
                }
            } else {
                console.log('ici2')
                if (localCommand.deleted) {
                    console.log(`Application command ${commandName} has been skipped, since property "deleted" is set to "true".`);
                    continue;
                }

                await applicationCommands.create(localCommand.data);
                console.log(`Application command ${commandName} has been registered.`);
            }
        }
    } catch (err) {
        console.log("[ERROR]" + "Error in your registerCommands.js file:");
        console.log(err);
    }
}
