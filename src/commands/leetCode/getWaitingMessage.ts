import {Client, SlashCommandBuilder} from "discord.js";
import log from "../../logger";
import { sendWaitingMessage } from "../../utils/cronjob";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("getwaitingmessage")
        .setDescription("Generate the waiting message")
        .toJSON(),  // Ensure the command data is correctly transformed to JSON
    testMode: false,
    devOnly: false,
    deleted: false,
    userPermissions: [],
    botPermissions: [],
    rolePermissions: ["FSOCIETY", "LeetGrinder", "Protecteur de Gotham"],

    run: async (client: Client, interaction: any) => {
        try {
            interaction.reply({content: "Sending waiting message...", ephemeral: true})
            await sendWaitingMessage(client);
        } catch (err) {
            log.error("[ERROR] Error in your exampleCmd.js run function: " + err);
        }
    },
};
