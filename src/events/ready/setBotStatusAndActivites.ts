import {ActivityType} from 'discord.js';

module.exports = async (client: any) => {
    client.user.setPresence({
        activities: [{
            name: 'with leetCode',
            type: ActivityType.Playing,
        }],
        status: 'online'
    });
}
