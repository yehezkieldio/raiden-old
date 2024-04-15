import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions, Args } from "@sapphire/framework";
import { Message } from "discord.js";

@ApplyOptions<CommandOptions>({
    name: "deletechannels",
    description: ".",
    detailedDescription: "<channels>",
    quotes: [],
    enabled: true,
    requiredUserPermissions: ["BAN_MEMBERS"],
    requiredClientPermissions: ["BAN_MEMBERS"],
})
export default class DeleteChannelsCommand extends Command {
    public async messageRun(message: Message, args: Args): Promise<Message> {
        const channels = await args.repeat("guildTextChannel");

        channels.forEach((channel) => {
            channel.delete();
        });
        return message.channel.send(`Deleting ${channels}`);
    }
}
