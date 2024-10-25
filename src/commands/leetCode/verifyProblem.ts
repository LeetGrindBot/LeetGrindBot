import {SlashCommandBuilder} from "discord.js";
import log from "../../logger";
import { verify, addPoints } from "../../database/verifyProblem";
import computePoints from "../../utils/computePoints";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("verify")
        .setDescription("vérifier le problème du jour")
        .toJSON(),  // Ensure the command data is correctly transformed to JSON
    testMode: false,
    devOnly: false,
    deleted: false,
    userPermissions: [],
    botPermissions: [],

    run: async (client: any, interaction: any) => {
        try {
            const discordId = interaction.user.id;
            const pair = await verify(discordId);
            const completed = pair.completed;
            if (!completed) {
                await interaction.reply("Le problème n'a pas pu être vérifié"); 
            }
            const titleSlug = pair.titleSlug;
            const points = await computePoints(titleSlug);
            await addPoints(discordId, titleSlug, points);
            await interaction.reply("Le problème a été vérifié");
        } catch(err) {
            log.error("[ERROR - COMMAND - verifiyAccount] : " + err);
        }
    },
};
