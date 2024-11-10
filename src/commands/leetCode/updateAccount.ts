import {SlashCommandBuilder} from "discord.js";
import log from "../../logger";
import {updateAccount} from "../../database/leetCodeLink";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("updateaccount")
        .setDescription("modifier son pseudo leetCode")
        .addStringOption(option =>
            option.setName('username')
                .setRequired(true)
                .setDescription('set your leetCode username'))
        .toJSON(),  // Ensure the command data is correctly transformed to JSON
    testMode: false,
    devOnly: false,
    deleted: false,
    userPermissions: [],
    botPermissions: [],

    run: async (client: any, interaction: any) => {
        try {
            const username = interaction.options.getString('username');
            const discordId = interaction.user.id;

            await updateAccount(username, discordId).then(() => {
                interaction.reply({content: 'Votre compte leetCode a bien été lié !', ephemeral: true});
            }).catch((err) => {
                if(err.code == 'P2002') {
                    interaction.reply('Le pseudo leetCode que vous avez entré est déjà lié à un autre compte. Veuillez réessayer avec un autre pseudo ou contacter un LeetGrinder .', {ephemeral: true});
                } else {
                    log.error("[ERROR - COMMAND - linkAccount] : " + err);
                    interaction.reply('Une erreur est survenue lors de la modification de votre compte leetCode. Vérifiez avoir bien entré votre LeetcodeId ou contacter un LeetGrinder', {ephemeral: true});
                }
            });
        } catch (err) {
            log.error("[ERROR - COMMAND - linkAccount] : " + err);
        }
    },
};
