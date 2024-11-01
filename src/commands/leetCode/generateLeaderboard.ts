import {SlashCommandBuilder, TextChannel} from "discord.js";
import { getLeaderboard } from "../../database/getLeaderboard";
import createEmbeds from "../../embeds/leetCodeEmbeds"
import log from "../../logger";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("generateleaderboard")
        .setDescription("Génère le leaderboard de la semaine")
        .toJSON(),  // Ensure the command data is correctly transformed to JSON
    testMode: false,
    devOnly: false,
    deleted: false,
    userPermissions: [],
    botPermissions: [],
    rolePermissions: ["FSOCIETY", "LeetGrinder", "Protecteur de Gotham"],

    run: async (client: any, interaction: any) => {
        try {
            const date = new Date();
            const leaderboard = await getLeaderboard(date, 5);
            await interaction.reply({content: `
                Leaderboard de la semaine :
                1. ${leaderboard[0].username} avec ${leaderboard[0].points} points !
                2. ${leaderboard[1].username} avec ${leaderboard[1].points} points !
                3. ${leaderboard[2].username} avec ${leaderboard[2].points} points !
            `});
        } catch (err) {
            log.error("[ERROR] Error in your exampleCmd.js run function: " + err);
        }
    },
};
