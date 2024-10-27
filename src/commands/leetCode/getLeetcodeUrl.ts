import {SlashCommandBuilder, TextChannel} from "discord.js";
import getRandomProblem from "../../utils/getProblem";
import {getRandomDifficulty} from "../../utils/getRandom";
import createEmbeds from "../../embeds/leetCodeEmbeds"
import log from "../../logger";
import {LeetCodeProblemInterface} from "../../interfaces";
import {createProblem} from "../../database/historyProblem";

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
    rolePermissions: ["FSOCIETY", "LeetGrinder", "Protecteur de Gotham"],

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

            const problem: LeetCodeProblemInterface = await getRandomProblem(choose);

            const guild = client.guilds.cache.get(interaction.guildId);
            const channel: TextChannel = guild.channels.cache.get(interaction.channelId);

            if (!channel) {
                log.error('Channel not found!');
                return;
            }

            await createProblem(problem).catch(err => log.error(err));

            await channel.send({embeds: [createEmbeds(problem.url, problem.title, choose)]});

        } catch (err) {
            log.error("[ERROR] Error in your exampleCmd.js run function: " + err);
        }
    },
};
