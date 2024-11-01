import { TextChannel } from "discord.js";

export async function cleanChannel(channel: TextChannel) {
    let fetched;
    do {
        const manager = channel.messages;
        fetched = await manager.channel.messages.fetch({limit: 100});
        channel.bulkDelete(fetched, true); 
    } while(fetched.size >= 1);
}
