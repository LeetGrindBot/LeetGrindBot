import {ActivityType} from 'discord.js';

module.exports = async (client: any) => {
    client.user.setPresence({
        activities: [{
            name: 'with leetCode',
            type: ActivityType.Playing,
            name_localizations: {"fr": "Bonjour, monde !", "de": "Hallo, Welt !", "en": "Hello, World !"}
        }],
        status: 'online'
    });
}
