import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions, Args } from "@sapphire/framework";
import { Message } from "discord.js";
import { IMessageEmbed } from "../../structures/client/message/IMessageEmbed";

@ApplyOptions<CommandOptions>({
    name: "kick",
    description: ".",
    detailedDescription: "<member> <reason>",
    quotes: [],
    enabled: true,
    requiredUserPermissions: ["KICK_MEMBERS"],
    requiredClientPermissions: ["KICK_MEMBERS"],
})
export default class KickCommand extends Command {
    public async messageRun(message: Message, args: Args): Promise<Message> {
        const member = await args.pick("member");
        const reason = await args.rest("string").catch(() => "");

        const embed = new IMessageEmbed();

        if (member.id === message.author.id) {
            embed.setDescription(`Tidak bisa ngekick diri sendiri.`);
            return message.channel.send({ embeds: [embed] });
        }

        if (reason) {
            await member.kick(reason);
            embed.setDescription(
                `${member.user.tag} di kick.\nDengan alasan: ${reason}`
            );

            if (!member.user.bot) {
                member.send(
                    `Anda telah di kick dari ${message.guild.name} dengan alasan ${reason}`
                );
            }
        } else {
            await member.kick();
            embed.setDescription(`${member.user.tag} di kick.\nTanpa alasan.`);

            if (!member.user.bot) {
                member.send(
                    `Anda telah di kick dari ${message.guild.name} tanpa alasan.`
                );
            }
        }

        return message.channel.send({ embeds: [embed] });
    }
}
