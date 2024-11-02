import { TextChannel } from "discord.js";
import log from "../logger";

export async function cleanChannel(channel: TextChannel) {
    try {
        let fetched;
        do {
            const manager = channel.messages;
            fetched = await manager.channel.messages.fetch({limit: 100});
            if(fetched.size > 0) {
                channel.bulkDelete(fetched, true); 
            }
        } while(fetched.size > 0);
    } catch(e) {
        log.error("[ERROR | CLEAN CHANNEL] : " + e);
    }
}
