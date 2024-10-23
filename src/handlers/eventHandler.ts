import path from 'path';
import getAllFiles from '../utils/getAllFiles'

const eventHandler = (client: any) => {
    const eventFolders = getAllFiles(path.join(__dirname, "..", "events"), true);

    for (const eventFolder of eventFolders) {
        const eventFiles = getAllFiles(eventFolder);
        let eventName;
        eventName = eventFolder.replace(/\\/g, "/").split("/").pop();

        eventName === "validations" ? eventName = "interactionCreate" : eventName;

        client.on(eventName, async(...args: any) => {
            for (const eventFile of eventFiles) {
                const eventFunction = require(eventFile);
                if (typeof eventFunction === 'function') {
                    await eventFunction(client, ...args);
                } else {
                    console.error(`Export from ${eventFile} is not a function`);
                }
            }
        });

    }
}

export default eventHandler;
