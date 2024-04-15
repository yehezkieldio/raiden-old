import { IMessageEmbed } from "../../structures/client/message/IMessageEmbed";
import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions, Args } from "@sapphire/framework";
import { Message } from "discord.js";

@ApplyOptions<CommandOptions>({
    name: "avatar",
    aliases: ["av"],
    description: ".",
    detailedDescription: "<member>",
    quotes: [],
    enabled: true,
    preconditions: ["DisabledOnMainChat"],
})
export default class AvatarCommand extends Command {
    public async messageRun(
        message: Message,
        args: Args
    ): Promise<Message | void> {
        // if (message.channel.id === "761550682754383882") {
        //     await message.delete();
        //     return;
        // }

        const member = await args.pick("member").catch(() => message.member);

        const embed = new IMessageEmbed();
        embed.setTitle(`❖ ${member.user.tag}`);
        embed.setImage(
            member.user.displayAvatarURL({ dynamic: true, size: 1024 })
        );

        return message.channel.send({ embeds: [embed] });
    }
}
