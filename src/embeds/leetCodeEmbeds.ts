import { EmbedBuilder } from "discord.js";
import { getRandomGif } from "../utils/getRandom";

export default function createEmbeds(url: any, titre: any, difficulty: any) {
  const validUrl = url || "No URL provided";
  const validTitle = titre || "No Title";
  const difficulties = ["Easy 🟢", "Medium 🟠", "Hard 🔴"];

  return new EmbedBuilder()
    .setColor("#6833ff")
    .setTitle("🎁 Nouveau challenge LeetCode disponible !")
    .addFields(
      { name: "\u200B", value: "\u200B" },
      { name: "✨ Titre du challenge :", value: validTitle },
      {
        name: "📈 Difficulté :",
        value: difficulties[difficulty - 1],
      },
      {
        name: "🔗 Lien :",
        value: `[Clique ici pour relever le défi !](${validUrl})`,
      },
      { name: "\u200B", value: "\u200B" }
    )
    .setDescription(
      "Bon GRIND à tous. Chaque ligne de code vous rapproche du sommet 🙌"
    )
    .setImage(getRandomGif())
    .setTimestamp()
    .setFooter({
      text: "y2Corp",
      iconURL:
        "https://i1.sndcdn.com/avatars-esGfMkGUS2E11gHw-yha4Fw-t240x240.jpg",
    });
}
