import Canvas from "@napi-rs/canvas";
import { AttachmentBuilder, Client } from "discord.js";
import { request } from "undici";
import { GetLeadersBoardsInterface } from "../interfaces/getLeadersBoards.interface";

const GenerateLeaderBoardImg = async (
  data: GetLeadersBoardsInterface[],
  client: Client
) => {
  const canvas = Canvas.createCanvas(700, 400);
  const context = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "./src/assets/img/leaderboardBackground.png"
  );

  context.drawImage(background, 0, 0, canvas.width, canvas.height);
  const positions = [
    {
      x: canvas.width / 2 - 50,
      y: canvas.height / 2 - 100,
      rank: "1er",
      borderColor: "rgba(255, 215, 0, 0.8)",
    },
    {
      x: canvas.width / 4 - 50,
      y: canvas.height / 2 - 75,
      rank: "2ème",
      borderColor: "rgba(192, 192, 192, 0.8)",
    },
    {
      x: (3 * canvas.width) / 4 - 50,
      y: canvas.height / 2 - 75,
      rank: "3ème",
      borderColor: "rgba(205, 127, 50, 0.8)",
    },
  ];

  for (let i = 0; i < 3; i++) {
    const userData = data[i];
    const position = positions[i];

    const user = await client.users.fetch(userData.discordId);
    const { body } = await request(user.displayAvatarURL({ extension: "jpg" }));
    const avatar = await Canvas.loadImage(await body.arrayBuffer());

    context.save();
    context.beginPath();
    context.arc(position.x + 50, position.y + 50, 55, 0, Math.PI * 2, true);
    context.closePath();
    context.lineWidth = 5;
    context.strokeStyle = position.borderColor;
    context.shadowBlur = 10;
    context.stroke();
    context.restore();

    context.save();
    context.beginPath();
    context.arc(position.x + 50, position.y + 50, 50, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();
    context.drawImage(avatar, position.x, position.y, 100, 100);
    context.restore();

    context.fillStyle = "#ffffff";
    context.font = "bold 20px 'Roboto', sans-serif";
    context.textAlign = "center";
    context.shadowColor = "rgba(0, 0, 0, 0.5)";
    context.shadowBlur = 5;
    context.fillText(
      `${position.rank}: ${user.username}`,
      position.x + 50,
      position.y + 130
    );
    context.fillText(
      `Points: ${userData.points}`,
      position.x + 50,
      position.y + 160
    );
  }

  return new AttachmentBuilder(await canvas.encode("png"), {
    name: "leaderboard-image.png",
  });
};

export default GenerateLeaderBoardImg;
