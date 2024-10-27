import { EmbedBuilder } from "discord.js";
import { getRandomGif } from "../utils/getRandom";

export default function createEmbeds(url: any, titre: any, difficulty: any) {
  const validUrl = url || "No URL provided";
  const validTitle = titre || "No Title";
  const difficulties = ["Easy 🟢", "Medium 🟠", "Hard 🔴"];

  return new EmbedBuilder()
    .setTitle("🎁 Nouveau challenge LeetCode disponible !")
    .addFields(
      { name: "\u200B", value: "\u200B" },
      { name: `✨ Titre du challenge : _${validTitle}_`, value: "\u200B" },
      {
        name: `📈 Difficulté : ${difficulties[difficulty - 1]}`,
        value: "\u200B",
      },
      {
        name: `🔗 Lien : ${validUrl}`,
        value: "\u200B",
      },
      {
        name: "Bon GRIND à tous. Chaque ligne de code vous rapproche du sommet 🙌",
        value: "\u200B",
      }
    )

    .setImage(getRandomGif())
    .setColor("#6833ff")
    .setFooter({
      text: "y2Corp",
      iconURL:
        "https://i1.sndcdn.com/avatars-esGfMkGUS2E11gHw-yha4Fw-t240x240.jpg",
    })
    .setTimestamp();
}
