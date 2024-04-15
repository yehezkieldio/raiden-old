import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions, Args } from "@sapphire/framework";
import { Message } from "discord.js";
import { IMessageEmbed } from "../../structures/client/message/IMessageEmbed";

@ApplyOptions<CommandOptions>({
    name: "ban",
    description: ".",
    detailedDescription: "<member> <reason>",
    quotes: [],
    enabled: true,
    requiredUserPermissions: ["BAN_MEMBERS"],
    requiredClientPermissions: ["BAN_MEMBERS"],
})
export default class BanCommand extends Command {
    public async messageRun(message: Message, args: Args): Promise<Message> {
        const member = await args.pick("member");
        const reason = await args.rest("string").catch(() => "");

        const embed = new IMessageEmbed();

        if (member.id === message.author.id) {
            embed.setDescription(`Tidak bisa ngeban diri sendiri.`);
            return message.channel.send({ embeds: [embed] });
        }

        if (reason) {
            await member.ban({ reason: reason });
            embed.setDescription(
                `${member.user.tag} di ban.\nDengan alasan: ${reason}`
            );

            if (!member.user.bot) {
                member.send(
                    `Anda telah di ban dari ${message.guild.name} dengan alasan ${reason}`
                );
            }
        } else {
            await member.ban();
            embed.setDescription(`${member.user.tag} di ban.\nTanpa alasan.`);

            if (!member.user.bot) {
                member.send(
                    `Anda telah di ban dari ${message.guild.name} tanpa alasan.`
                );
            }
        }

        return message.channel.send({ embeds: [embed] });
    }
}
