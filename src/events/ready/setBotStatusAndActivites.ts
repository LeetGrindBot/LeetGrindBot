import {ActivityType} from 'discord.js';

module.exports = async (client: any) => {
    console.log('Bot is now playing!');
    client.user.setPresence({
        activities: [{
            name: 'with leetCode',
            type: ActivityType.Playing,
        }],
        status: 'online'
    });
}
