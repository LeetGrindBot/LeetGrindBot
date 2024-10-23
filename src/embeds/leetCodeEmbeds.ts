import {EmbedBuilder} from "discord.js";
import {getRandomGif} from "../utils/getRandom";

export default function createEmbeds(url: any, titre: any, difficulty: any) {
    const validUrl = url || 'No URL provided';
    const validTitle = titre || 'No Title';
    const difficulties = ['easy', 'medium', 'hard'];

    return new EmbedBuilder()
        .setColor('#42106e')
        .setTitle("Nouveau challenge leetCode !")
        .addFields(
            { name: '\u200B', value: '\u200B' },
            { name: 'Titre du challenge : ', value: validTitle },
            { name: 'Difficulté du challenge : ', value: difficulties[difficulty - 1] },
            { name: 'Url : ', value: validUrl },
            { name: '\u200B', value: '\u200B' }
        )
        .setImage(getRandomGif())
        .setTimestamp()
        .setFooter({ text: 'y2Corp', iconURL: 'https://static-00.iconduck.com/assets.00/games-batman-icon-2048x2048-zjmbyc6b.png' })
}
