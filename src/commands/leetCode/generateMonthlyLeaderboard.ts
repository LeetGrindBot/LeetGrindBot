import {Client, SlashCommandBuilder, TextChannel} from "discord.js";
import {getLeaderboard} from "../../database/getLeaderboard";
import log from "../../logger";
import generateLeaderBoardImg from "../../utils/generateLeaderBoardImg";
import GenerateLeaderBoardEmbed from "../../embeds/leaderBoardEmbeds";
import { getFirstOfMonthFromDate } from "../../utils/dateUtils";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("generatemonthlyleaderboard")
        .setDescription("Génère le leaderboard du mois")
        .addIntegerOption(option =>
            option.setName('month')
                .setDescription('month of the generated leaderboard'))
        .addIntegerOption(option =>
            option.setName('year')
                .setDescription('year of the generated leaderboard'))
        .toJSON(),  // Ensure the command data is correctly transformed to JSON
    testMode: false,
    devOnly: false,
    deleted: false,
    userPermissions: [],
    botPermissions: [],
    rolePermissions: ["FSOCIETY", "LeetGrinder", "Protecteur de Gotham"],

    run: async (client: Client, interaction: any) => {
        try {
            interaction.reply({ content: "Génération du leaderboard en cours...", ephemeral: true });
            const month: number = interaction.options.getInteger('month');
            const year: number = interaction.options.getInteger('year');
            let date = new Date(year, month, 1);
            date.setDate(-1);
            const endOfMonth = date;
            const startOfMonth = getFirstOfMonthFromDate(endOfMonth);
            const leaderboard = await getLeaderboard(startOfMonth, endOfMonth, 100);
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
