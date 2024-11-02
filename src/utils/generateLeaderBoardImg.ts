import Canvas from '@napi-rs/canvas';
import {AttachmentBuilder, Client} from "discord.js";
import {GetLeadersBoardsInterface} from "../interfaces/getLeadersBoards.interface";
import {request} from "undici";

const GenerateLeaderBoardImg = async (data: GetLeadersBoardsInterface[], client: Client) => {
    const canvas = Canvas.createCanvas(700, 300);
    const context = canvas.getContext('2d');

    const background = await Canvas.loadImage('./src/assets/img/leaderboardBackground.jpeg');

    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    const positions = [
        { x: 250, y: 50, rank: '1er', borderColor: '#FFD700' },
        { x: 50, y: 50, rank: '2ème', borderColor: '#C0C0C0' },
        { x: 450, y: 50, rank: '3ème', borderColor: '#CD7F32' }
    ];

    for (let i = 0; i < 3; i++) {
        const userData = data[i];
        const position = positions[i];

        const user = await client.users.fetch(userData.discordId);
        const { body } = await request(user.displayAvatarURL({ extension: 'jpg' }));
        const avatar = await Canvas.loadImage(await body.arrayBuffer());

        context.save();
        context.beginPath();
        context.arc(position.x + 50, position.y + 50, 55, 0, Math.PI * 2, true);
        context.closePath();
        context.lineWidth = 5;
        context.strokeStyle = position.borderColor;
        context.stroke();
        context.restore();

        context.save();
        context.beginPath();
        context.arc(position.x + 50, position.y + 50, 50, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();
        context.drawImage(avatar, position.x, position.y, 100, 100);
        context.restore();

        context.fillStyle = '#ffffff';
        context.font = '20px Arial';
        context.fillText(`${position.rank}: ${user.username}`, position.x, position.y + 130);
        context.fillText(`Points: ${userData.points}`, position.x, position.y + 160);
    }

    return new AttachmentBuilder(await canvas.encode('png'), { name: 'leaderboard-image.png' });
}

export default GenerateLeaderBoardImg;
