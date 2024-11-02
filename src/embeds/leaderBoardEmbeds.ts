import {Client, EmbedBuilder} from "discord.js";
import {GetLeadersBoardsInterface} from "../interfaces/getLeadersBoards.interface";

const GenerateLeaderBoardEmbed = async (data: GetLeadersBoardsInterface[], client: Client) => {
    const embed = new EmbedBuilder()
        .setColor('#808080') // Couleur grise
        .setTitle('Classement des utilisateurs')
        .setFooter({ text: 'Classement global' });

        for (let i = 3; i < data.length && i < 16; i++) {
        const userData = data[i];
        const user = await client.users.fetch(userData.discordId);

        embed.addFields({
            name: `${i + 1}. ${user.username}`,
            value: `Points: ${userData.points}`,
            inline: true
        });
    }

    return embed;
}

export default GenerateLeaderBoardEmbed;
