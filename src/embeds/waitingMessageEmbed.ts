import { EmbedBuilder } from "discord.js";

export default function createWaitingEmbeds() {
  return new EmbedBuilder()
    .setTitle("Pas de challenge leetcode aujourd'hui !")
    .addFields(
      {
        name: "Rendez-vous lundi pour le début du prochain arc ! :fire:",
        value: "\u200B",
      }
    )

    .setImage("https://media1.tenor.com/m/GvOhELq35LMAAAAd/zoro-sleep.gif")
    .setColor("#6833ff")
    .setFooter({
      text: "y2Corp",
      iconURL:
        "https://i1.sndcdn.com/avatars-esGfMkGUS2E11gHw-yha4Fw-t240x240.jpg",
    })
    .setTimestamp();
}
