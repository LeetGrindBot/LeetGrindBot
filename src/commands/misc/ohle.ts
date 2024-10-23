import {PermissionFlagsBits, SlashCommandBuilder} from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("Test if everything works.")
        .toJSON()
    ,
    testMode: false,
    devOnly: false,
    deleted: false,
    userPermissions: [],
    botPermissions: [],

    run: (client: any, interaction:any) => {
        try {

            interaction.reply("Test Bateau ok my boyyyyy!");

        } catch (err) {
            console.log("[ERROR]" + "Error in your exampleCmd.js run function:");
            console.log(err);
        }
    },

    autocomplete: async (client: any, interaction: any) => {
        try {
            const options = [
                {
                    name: "test",
                    description: "Test if everything works.",
                    type: 1,
                    options: [],
                },
            ];
            return options;

        } catch (err) {
            console.log("[ERROR]" + "Error in your exampleCmd.js autocomplete function:");
            console.log(err);
        }
    }
};
