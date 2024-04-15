import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions } from "@sapphire/framework";
import { MessageAttachment, Message } from "discord.js";

@ApplyOptions<CommandOptions>({
    name: "sendlogs",
    description: ".",
    detailedDescription: ".",
    quotes: [],
    enabled: true,
    requiredUserPermissions: ["ADMINISTRATOR"],
    preconditions: ["DeveloperOnly"],
})
export default class SendLogsCommand extends Command {
    public async messageRun(message: Message): Promise<Message> {
        const logs = new MessageAttachment("./logs/all.log");

        return message.channel.send({ files: [logs] });
    }
}
