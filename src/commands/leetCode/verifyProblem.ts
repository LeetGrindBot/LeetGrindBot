import {SlashCommandBuilder} from "discord.js";
import log from "../../logger";
import {addPoints, verify} from "../../database/verifyProblem";
import {computePointsFromSlug} from "../../utils/computePoints";
import {verifyLink} from "../../database/leetCodeLink";

const validChar = ":white_check_mark:";
const warningChar = ":warning:";
const errorChar = ":x:";

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
                await interaction.reply(`${warningChar} Vous devez lier votre compte leetCode avant de vérifier un problème.`);
                return
            }

            const verificationData = await verify(dataLink.leetCodeUsername);
            const completed = verificationData.completed;
            if (!completed) {
                await interaction.reply(`${errorChar} Le problème n'a pas été résolu.`);
                return;
            }

            const titleSlug = verificationData.titleSlug;
            const lang = verificationData.lang;
            const langFormatted = lang[0].toUpperCase() + lang.slice(1);
            const points = await computePointsFromSlug(titleSlug);
            const pointsFormatted = points.toFixed(2).toString();
            await addPoints(discordId, titleSlug, points).catch(async (err) => {
                if(err.code == 'P2002') {
                    await interaction.reply(`${warningChar} Vous avez déjà vérifié ce problème.`);
                } else {
                    log.error("[ERROR - COMMAND - verify] : " + err);
                    await interaction.reply(`${warningChar} Une erreur est survenue lors de l'ajout des points.`); 
                }
           });

            await interaction.reply(`${validChar} **${usernameFormatted}** a terminé le challenge en **${langFormatted}**. Il gagne **${pointsFormatted}** points.`);
        } catch(err) {
            log.error("[ERROR - COMMAND - verify] : " + err);
        }
    },
};
