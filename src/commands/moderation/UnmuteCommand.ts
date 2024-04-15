import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions, Args } from "@sapphire/framework";
import { Message } from "discord.js";
import { IMessageEmbed } from "../../structures/client/message/IMessageEmbed";

@ApplyOptions<CommandOptions>({
    name: "unmute",
    description: ".",
    detailedDescription: "<member>",
    quotes: [],
    enabled: true,
    requiredUserPermissions: ["KICK_MEMBERS"],
    requiredClientPermissions: ["MANAGE_ROLES"],
})
export default class UnMuteCommand extends Command {
    public async messageRun(message: Message, args: Args): Promise<Message> {
        const member = await args.pick("member");

        const mutedRoleId = "764454877400268801";
        const travelerRoleId = "761577898750246942";

        const embed = new IMessageEmbed();

        if (member.id === message.author.id) {
            embed.setDescription(`Tidak bisa ngeunmute diri sendiri.`);
            return message.channel.send({ embeds: [embed] });
        }

        if (!member.roles.cache.has(mutedRoleId)) {
            embed.setDescription(`${member.user.tag} sudah di unmute.`);
            return message.channel.send({ embeds: [embed] });
        }

        const mutedRole = message.guild.roles.cache.get(mutedRoleId);
        const travelerRole = message.guild.roles.cache.get(travelerRoleId);

        member.roles.remove(mutedRole);
        member.roles.add(travelerRole);

        embed.setDescription(`${member.user.tag} telah di unmuted.`);

        return message.channel.send({ embeds: [embed] });
    }
}
