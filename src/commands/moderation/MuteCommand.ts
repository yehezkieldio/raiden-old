import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions, Args } from "@sapphire/framework";
import { GuildMember, Message, Role } from "discord.js";
import ms from "ms";
import { IMessageEmbed } from "../../structures/client/message/IMessageEmbed";

@ApplyOptions<CommandOptions>({
    name: "mute",
    description: ".",
    detailedDescription: "<member> <duration> <reason>",
    quotes: [],
    enabled: true,
    requiredUserPermissions: ["KICK_MEMBERS"],
    requiredClientPermissions: ["MANAGE_ROLES"],
})
export default class MuteCommand extends Command {
    public async messageRun(message: Message, args: Args): Promise<Message> {
        const member = await args.pick("member");
        const time = args.finished ? "1y" : await args.pick("string");
        const reason = await args.rest("string").catch(() => "");

        const embed = new IMessageEmbed();

        const hasNumber = /\d/;

        if (!hasNumber.test(time)) {
            embed.setDescription(`${time} bukanlah format waktu yang valid.`);
            return message.channel.send({ embeds: [embed] });
        }

        const formatTime = ms(time);
        const mutedRoleId = "764454877400268801";
        const travelerRoleId = "761577898750246942";

        if (member.id === message.author.id) {
            embed.setDescription(`Tidak bisa ngemute diri sendiri.`);
            return message.channel.send({ embeds: [embed] });
        }

        if (member.user.bot) {
            embed.setDescription(`Tidak bisa ngemute bot.`);
            return message.channel.send({ embeds: [embed] });
        }

        if (member.roles.cache.has(mutedRoleId)) {
            embed.setDescription(`${member.user.tag} sudah di mute.`);
            return message.channel.send({ embeds: [embed] });
        }

        if (formatTime < 60000) {
            embed.setDescription(`Waktu harus lebih dari 1 menit.`);
            return message.channel.send({ embeds: [embed] });
        }

        const mutedRole = message.guild.roles.cache.get(mutedRoleId);
        const travelerRole = message.guild.roles.cache.get(travelerRoleId);

        if (formatTime > 2592000000) {
            member.roles.add(mutedRole);
            member.roles.remove(travelerRole);

            if (reason) {
                embed.setDescription(
                    `${member.user.tag} telah di mute permanen karena ${reason}`
                );
                return message.channel.send({ embeds: [embed] });
            } else {
                embed.setDescription(
                    `${member.user.tag} telah di mute permanen tanpa alasan.`
                );
                return message.channel.send({ embeds: [embed] });
            }
        }

        member.roles.add(mutedRole);
        member.roles.remove(travelerRole);
        this.__timeout(formatTime, member, mutedRole, travelerRole);

        if (reason) {
            embed.setDescription(
                `${member.user.tag} telah di mute selama ${ms(formatTime, {
                    long: true,
                })} karena ${reason}`
            );
            return message.channel.send({ embeds: [embed] });
        } else {
            embed.setDescription(
                `${member.user.tag} telah di mute selama ${ms(formatTime, {
                    long: true,
                })} tanpa alasan.`
            );
            return message.channel.send({ embeds: [embed] });
        }
    }

    private async __timeout(
        time: number,
        member: GuildMember,
        mutedRole: Role,
        travelerRole: Role
    ) {
        setTimeout(async () => {
            if (member.roles.cache.has(mutedRole.id)) {
                member.roles.remove(mutedRole);
                member.roles.add(travelerRole);

                const embed = new IMessageEmbed();
                embed.setDescription(`${member.user.tag} telah di unmuted.`);

                return member.send({ embeds: [embed] });
            } else {
                return;
            }
        }, time);
    }
}
