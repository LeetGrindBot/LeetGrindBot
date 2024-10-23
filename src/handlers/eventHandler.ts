import {path} from 'path';
import {getAllFiles} from '../utils/fileUtils';

module.exports = (client: any) => {
    const eventFolders = getAlllFiles(path.join(__dirname, "..", "events"), true);

    for (const eventFolder of eventFolders) {
        const eventFiles = getAllFiles(eventFolder);
        let eventName;
        eventName = eventFolder.replace(/\\/g, "/").split("/").pop();

        eventName === "validations" ? eventName = "interactionCreate" : eventName;

        client.on(eventName, async(...args: any) => {
            for (const eventFile of eventFiles) {
                const eventFunction = require(eventFile);
                await eventFunction(client, ...args);
            }
        });

    }
}
