const getApplicationCommands = async (client: any, guildId: any) => {
    let applicationCommands;

    if (guildId) {
        const guild = await client.guilds.fetch(guildId);
        applicationCommands = guild.commands;
    } else {
        applicationCommands = client.application.commands;
    }

    await applicationCommands.fetch({withLocalizations: true});
    return applicationCommands;
}

export default getApplicationCommands;
