import {Client, SlashCommandBuilder, TextChannel} from "discord.js";
import {getLeaderboard} from "../../database/getLeaderboard";
import log from "../../logger";
import generateLeaderBoardImg from "../../utils/generateLeaderBoardImg";
import GenerateLeaderBoardEmbed from "../../embeds/leaderBoardEmbeds";

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

    run: async (client: Client, interaction: any) => {
        try {
            const date = new Date();
            const leaderboard = await getLeaderboard(date, 13);
            const attachment = await generateLeaderBoardImg(leaderboard, client);
            const embeds = await GenerateLeaderBoardEmbed(leaderboard, client);

            const guild = client.guilds.cache.get(interaction.guildId);
            // @ts-ignore
            const channel: TextChannel = guild?.channels.cache.get(interaction.channelId);

            if (!channel) {
                log.error('Channel not found!');
                return;
            }

            await channel.send({ files: [attachment]});
            await channel.send({ embeds: [embeds] });
        } catch (err) {
            log.error("[ERROR] Error in your exampleCmd.js run function: " + err);
        }
    },
};