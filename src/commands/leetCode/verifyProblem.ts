import {SlashCommandBuilder} from "discord.js";
import log from "../../logger";
import {addPoints, verify} from "../../database/verifyProblem";
import computePoints from "../../utils/computePoints";
import {verifyLink} from "../../database/leetCodeLink";

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
            const username = interaction.user.username;
            const usernameFormatted = username[0].toUpperCase() + username.slice(1);

            const dataLink: any = await verifyLink(discordId);
            if (!dataLink) {
                await interaction.reply("Vous devez lier votre compte leetCode avant de vérifier un problème");
                return
            }

            const verificationData = await verify(dataLink.leetCodeUsername);
            const completed = verificationData.completed;
            if (!completed) {
                await interaction.reply("Le problème n'a pas été résolu");
                return;
            }

            const titleSlug = verificationData.titleSlug;
            const lang = verificationData.lang;
            const langFormatted = lang[0].toUpperCase() + lang.slice(1);
            const points = await computePoints(titleSlug);
            const pointsFormatted = points.toFixed(2).toString();
            await addPoints(discordId, titleSlug, points).catch(async (err) => {
                await interaction.reply("Un problème est survenu lors de l'ajout des points ou alors vous avez déjà vérifié ce problème");
                return;
            });

            await interaction.reply(`${usernameFormatted} a terminé le challenge en ${langFormatted}. Il gagne ${pointsFormatted} points.`);
        } catch(err) {
            log.error("[ERROR - COMMAND - verifiy] : " + err);
        }
    },
};
