import {SlashCommandBuilder} from "discord.js";
import {updateAccount} from "../../database/leetCodeLink";
import log from "../../logger";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("updateaccount")
        .setDescription("lier son compte entre le bot et le site leetCode")
        .addStringOption(option =>
            option.setName('username')
                .setRequired(true)
                .setDescription('set your leetCode username'))
        .addMentionableOption(option =>
            option.setName('mention')
                .setRequired(true)
                .setDescription('mention a user to update his account name'))
        .toJSON(),  // Ensure the command data is correctly transformed to JSON
    testMode: false,
    devOnly: false,
    deleted: false,
    userPermissions: [],
    botPermissions: [],
    rolePermissions: ["FSOCIETY", "LeetGrinder", "Protecteur de Gotham"],

    run: async (client: any, interaction: any) => {
        const username = interaction.options.getString('username');
        const discordId = interaction.options.getMentionable('mention').id;

        await updateAccount(username, discordId).then(() => {
            interaction.reply('Le compte leetCode a bien été lié avec le nom d\'utilisateur : ' + username);
        }).catch((err) => {
            log.error("[ERROR - COMMAND - linkAccount] : " + err);
            interaction.reply('Une erreur est survenue lors de la liaison de votre compte leetCode. Merci de réessayer plus tard.', {ephemeral: true});
        });

    },
};
