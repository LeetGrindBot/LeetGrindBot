import {SlashCommandBuilder, TextChannel} from "discord.js";
import getRandomProblem from "../../utils/scraper";
import {getRandomDifficulty} from "../../utils/getRandom";
import createEmbeds from "../../embeds/leetCodeEmbeds"


module.exports = {
    data: new SlashCommandBuilder()
        .setName("getleetcodeurl")
        .setDescription("Test if everything works.3")
        .addStringOption(option =>
            option.setName('difficulty')
                .setDescription('choose difficulty (empty = random) between easy, medium, hard'))
        .toJSON(),  // Ensure the command data is correctly transformed to JSON
    testMode: false,
    devOnly: false,
    deleted: false,
    userPermissions: [],
    botPermissions: [],

    run: async (client: any, interaction: any) => {
        try {
            const difficulty = interaction.options.getString('difficulty');
            let choose: number = getRandomDifficulty();
            switch (difficulty) {
                case 'easy':
                    choose = 1;
                    break
                case 'medium':
                    choose = 2;
                    break
                case 'hard':
                    choose = 3;
                    break
            }

            interaction.reply('Un nouveau test leetCode est entrain de charger sur la difficulté suivante : ' + choose);

            const [code, text, url] = await getRandomProblem(choose);

            const guild = client.guilds.cache.get(interaction.guildId);
            const channel: TextChannel = guild.channels.cache.get(interaction.channelId);

            if (!channel) {
                console.error('Channel not found!');
                return;
            }

            console.log('Sending message...');
            await channel.send({embeds: [createEmbeds(url, text, choose)]});
            console.log('Message sent successfully');

        } catch (err) {
            console.log("[ERROR] Error in your exampleCmd.js run function:");
            console.log(err);
        }
    },
};
