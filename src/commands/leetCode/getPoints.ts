import {SlashCommandBuilder} from "discord.js";
import log from "../../logger";
import {getPoints} from "../../database/verifyProblem";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("getpoints")
        .setDescription("Récupère le nombre de points leetCode d'un utilisateur.")
        .toJSON(),
    testMode: false,
    devOnly: false,
    deleted: false,
    userPermissions: [],
    botPermissions: [],
    rolePermissions: ["FSOCIETY", "LeetGrinder", "Protecteur de Gotham"],

    run: async (client: any, interaction: any) => {
        try {
            const userPoints = await getPoints(interaction.user.id);
            let points: number = 0;
            if (!userPoints) {
                interaction.reply({content: 'Vous n\'avez pas encore de points leetCode.', ephemeral: true});
                return;
            }

            userPoints.forEach((point: any) => {
                points += point.Points;
            });

            interaction.reply({content: 'Vous avez actuellement ' + points + ' points leetCode.', ephemeral: true});
        } catch (err) {
            log.error("[ERROR - COMMAND - getPoints] : " + err);
        }
    },
};
