import { IMessageEmbed } from "../../structures/client/message/IMessageEmbed";
import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions, Args } from "@sapphire/framework";
import { bold, roleMention } from "@discordjs/builders";
import { Message } from "discord.js";

@ApplyOptions<CommandOptions>({
    name: "mabar",
    description: ".",
    detailedDescription: "<world-level> <uid> <content>",
    quotes: [],
    enabled: true,
})
export default class MabarCommand extends Command {
    public async messageRun(message: Message, args: Args): Promise<Message> {
        await message.delete();

        const worldlevel = await args.pick("string");
        const uid = await args.pick("string");
        const content = await args.rest("string");

        const embed = new IMessageEmbed();
        embed.setTitle("❖ Mabar Request");
        embed.setDescription(content);
        embed.addField(
            "── Profile",
            `〃Username: <@${message.author.id}>\n〃UID: ${bold(
                uid
            )}\n〃World Level: ${bold(worldlevel)}`
        );

        return message.channel.send({
            content: roleMention("782542155896979457"),
            embeds: [embed],
        });
    }
}
