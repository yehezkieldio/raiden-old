import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions, Args } from "@sapphire/framework";
import { Message } from "discord.js";

@ApplyOptions<CommandOptions>({
    name: "say",
    description: ".",
    detailedDescription: "<content>",
    quotes: [],
    enabled: true,
    requiredUserPermissions: ["MANAGE_MESSAGES"],
    requiredClientPermissions: ["MANAGE_MESSAGES", "EMBED_LINKS"],
})
export default class EmbedCommand extends Command {
    public async messageRun(message: Message, args: Args): Promise<Message> {
        await message.delete();

        const content = await args.rest("string");

        return message.channel.send({ content: content });
    }
}
