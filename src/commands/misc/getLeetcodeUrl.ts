import {PermissionFlagsBits, SlashCommandBuilder} from "discord.js";
import getRandomProblem from "../../utils/scraper";

const difficulties = [
    {
        name: "easy",
        value: 1,
    },
    {
        name: "medium",
        value: 2,
    },
    {
        name: "hard",
        value: 3,
    },
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName("getleetcodeurl")
        .setDescription("Test if everything works.2")
        .addStringOption(option =>
            option.setName("difficulty")
                .setDescription("Test if everything works.")
                .setRequired(true)
                .setAutocomplete(true))
        .toJSON()
    ,
    testMode: false,
    devOnly: false,
    deleted: false,
    userPermissions: [],
    botPermissions: [],

    run: async (client: any, interaction:any) => {
        try {
            interaction.reply('Un nouveau lien est entrain de se charger...');
            const [code, text, url] = await getRandomProblem(3);
            const guild = client.guilds.cache.get(interaction.guildId);
            console.log(guild.id);
            const channel = guild.channels.cache.get(interaction.channelId);

            if (!channel) {
                console.error('Channel not found!');
                return;
            }

            channel.send("Test Bateau ok my boyyyyy!: " + url + " / " + code + " / " + text)
                .then(() => console.log('Message sent successfully'))
                .catch(console.error);

        } catch (err) {
            console.log("[ERROR] Error in your exampleCmd.js run function:");
            console.log(err);
        }
    },

    autocomplete: async () => {
        try {
            const options = [
                {
                    name: "test",
                    description: "Test if everything works.2",
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
