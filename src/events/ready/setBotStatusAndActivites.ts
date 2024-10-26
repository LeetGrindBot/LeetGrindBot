import { ActivityType } from "discord.js";

module.exports = async (client: any) => {
  client.user.setPresence({
    activities: [
      {
        name: "LeetCode",
        type: ActivityType.Playing,
      },
    ],
    status: "online",
  });
};
