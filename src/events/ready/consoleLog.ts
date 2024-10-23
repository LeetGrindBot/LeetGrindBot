import log from "../../logger";

module.exports = async (client: any) => {
    log.info(`Logged in as ${client.user.tag}`);
}
