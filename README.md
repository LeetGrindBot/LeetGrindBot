# LeetGrindBot 🦇 - V1

## Description
LeetGrindBot is an exclusive Discord bot for the **y2's Empire** server, designed to send a new LeetCode challenge to members every day and display a weekly leaderboard of the top performers. This bot encourages daily practice and fosters friendly competition around algorithms and problem-solving.

## ✨ Features

- **Daily LeetCode Challenges**: Each day, the bot sends a new problem to keep members engaged and practicing consistently.
- **Weekly Leaderboard**: The bot displays a leaderboard every week, highlighting the top three solvers.
- **Exclusive Access**: Currently limited to the "y2's Empire" Discord server.

## 🔪 Technologies Used

### Backend
- **TypeScript**: Ensures a reliable and maintainable codebase.
- **Discord.js**: API to integrate with Discord.
- **Axios**: Handles HTTP requests to retrieve LeetCode problems.

### Database
- **PostgreSQL**: Relational database to store scores and user data.
- **Prisma**: ORM for streamlined database management.

### DevOps
- **Docker**: Containerization for simplified and consistent deployment.

## 🤸 Quick Start

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have the following installed on your machine:

Git
Node.js
npm (Node Package Manager)


1. Clone the repository:

   ```bash
   git clone https://github.com/LeetGrindBot/LeetGrindBot-V1.git
   cd leetgrindbot-v1

2. Install dependencies:
   
   ```bash
   npm install


4. Set up environment variables. Create a .env file in the root directory and add your configurations:
   ```bash
     DISCORD_TOKEN="your-discord-bot-token"
     MODE="dev"
     GUILD_ID="your-guild-id"
     CHANNEL_ID="your-channel-id"
     
     DB_DATABASE=""
     DB_USERNAME=""
     DB_PASSWORD=""
     DB_PORT=""
     DATABASE_URL=""

4. Run the bot with Docker (optional):
   
   ```bash
   docker-compose up
   
5. Start the bot in development mode:

   ```bash
   npm run start

## 🎉  Contributing

![contributors](https://contrib.rocks/image?repo=LeetGrindBot/LeetGrindBot-V1)

LeetGrindBot V1 is currently exclusive to the y2's Empire server, but contributions are welcome for testing or local development!

1. Fork the repo
2. Create your feature branch (git checkout -b feature/AmazingFeature).
3. Commit your changes (git commit -m 'Add some AmazingFeature').
4. Push to the branch (git push origin feature/AmazingFeature).
5. Create a Pull Request 🎉

## Contact

For questions or suggestions, join us on the y2's Empire Discord server or reach out via GitHub or 𝕏.

