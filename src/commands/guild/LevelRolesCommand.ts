import { IMessageEmbed } from "../../structures/client/message/IMessageEmbed";
import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions } from "@sapphire/framework";
import { bold, roleMention } from "@discordjs/builders";
import { Message } from "discord.js";

@ApplyOptions<CommandOptions>({
    name: "levelroles",
    aliases: ["level", "rank"],
    description: ".",
    detailedDescription: ".",
    quotes: [],
    enabled: true,
})
export default class LevelRolesCommand extends Command {
    public async messageRun(message: Message): Promise<Message> {
        const embed = new IMessageEmbed();
        embed.setTitle("❖ Level Roles");
        embed.addField(
            "〃 Tier 1",
            `${roleMention("826944581831753760")} LVL 10+`
        );
        embed.addField(
            "〃 Tier 2",
            `${roleMention("826944581831753760")} LVL 10+`
        );
        embed.addField(
            "〃 Tier 3",
            `${roleMention("826944578237628447")} LVL 25+`
        );
        embed.addField(
            "〃 Tier 4",
            `${roleMention("826945768463532102")} LVL 50+`
        );
        embed.addField(
            "〃 Tier 5",
            `${roleMention("826945774033305661")} LVL 110+`
        );
        embed.addField(
            "〃 notes",
            `Dapatkan XP dengan mengirim message atau aktif di sebuah voice channel. Secara default member yang tidak memiliki ${bold(
                "Tier 1"
            )} tidak akan bisa mengirim link!`
        );

        return message.channel.send({
            embeds: [embed],
        });
    }
}
