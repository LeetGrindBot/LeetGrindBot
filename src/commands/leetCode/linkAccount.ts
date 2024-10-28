import {SlashCommandBuilder} from "discord.js";
import log from "../../logger";
import {linkAccount} from "../../database/leetCodeLink";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("linkaccount")
        .setDescription("lier son compte entre le bot et le site leetCode")
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

            await linkAccount(username, discordId).then(() => {
                interaction.reply({content: 'Votre compte leetCode a bien été lié !', ephemeral: true});
            }).catch((err) => {
                log.error("[ERROR - COMMAND - linkAccount] : " + err);
                interaction.reply('Une erreur est survenue lors de la liaison de votre compte leetCode. Merci de réessayer plus tard.', {ephemeral: true});
            });
        } catch (err) {
            log.error("[ERROR - COMMAND - linkAccount] : " + err);
        }
    },
};
