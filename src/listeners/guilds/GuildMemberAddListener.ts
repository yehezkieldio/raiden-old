import { IMessageEmbed } from "../../structures/client/message/IMessageEmbed";
import { ApplyOptions } from "@sapphire/decorators";
import { Listener, ListenerOptions, Events } from "@sapphire/framework";
import { Message, GuildMember, TextChannel } from "discord.js";
import { bold, channelMention, roleMention } from "@discordjs/builders";

@ApplyOptions<ListenerOptions>({
    once: false,
    event: Events.GuildMemberAdd,
})
export default class GuildMemberAddListener extends Listener {
    public run(member: GuildMember): void {
        this.container.logs.debug(`${member.user.tag} joined the server.`);

        if (member.user.bot) return;

        this.__assignRole(member);
        this.__welcomer(member);
    }

    private __assignRole(member: GuildMember): Promise<GuildMember> {
        const role = member.guild.roles.cache.find(
            (role) => role.id === "761577898750246942"
        );
        return member.roles.add(role);
    }

    private __sendDirectMessage(member: GuildMember): void {
        const embed = new IMessageEmbed();

        embed.setAuthor(member.user.tag, member.user.displayAvatarURL());
        embed.setDescription(
            `${bold(
                "・Who are we? "
            )} ー adalah server berbasis komunitas yang didedikasikan untuk semua mengenai Genshin Impact dan lainnya. Temukan bantuan dan panduan untuk eksplorasi, artifact build, dan lainnya.\n\n${bold(
                "ー 〃What we have"
            )}\n\n${bold(
                "・Unique Roles."
            )} ー dapatkan berbagai jenis role berdasarkan perkembangan dan pencapaian akun anda saat bermain Genshin Impact!\n\n${bold(
                "・Events & Giveaways."
            )} ambil bagian dalam berbagai events yang kami adakan memenangkan hadiah atau just for fun! Dari Weekly Spiral Abyss Speedrun sampai Quiz umum mengenai Genshin Impact.\n\n${bold(
                "・Bots."
            )} ー gunakan berbagai aneka bot seperti Mudae, Epic RPG, OwO, Tatsu, dan lainnya. Oh dan, kami juga mempunyai bot buatan sendiri!\n\n${bold(
                "・Others. "
            )} ー kami menyediakan berbagai channel-channel untuk topik seperti Anime & Memes, Virtual Youtubers, Honkai Impact 3, dan lainnya! Oh, don't forget the custom voice channels.\n\n・Mengobrol tentang apa pun dengan kami! dan mungkin anda akan menemukan diri anda pendamping yang baik seperti Paimon :)\n\n- Raiden\n${bold(
                "Genshin Impact ID Operations Management Bot"
            )}`
        );

        member.send({
            content: `Welcome to ${bold("Genshin Impact ID")}`,
            embeds: [embed],
        });
    }

    private async __welcomer(member: GuildMember): Promise<Message> {
        const channel = member.guild.channels.cache.find(
            (channel) => channel.id === "761553333214773298"
        ) as TextChannel;

        if (!channel) {
            return;
        }

        const embed = new IMessageEmbed();

        embed.setTitle("❖ Welcome");
        embed.setAuthor(member.user.tag, member.user.displayAvatarURL());
        embed.setThumbnail(member.user.displayAvatarURL());
        embed.setDescription(
            `Welcome to ${bold("Genshin Impact ID")}, ${
                member.user.username
            }!\nPlease enjoy your stay on our server.\n\nBaca dan patuhi guidelines dan peraturan kami di ${channelMention(
                "762708708870193202"
            )}\n Silakan untuk mengambil role di ${channelMention(
                "768276361500426261"
            )}\nChat tentang apa saja di ${channelMention(
                "761550682754383882"
            )}\nDiskusi mengenai Genshin Impact di ${channelMention(
                "764011633621073940"
            )}\n\nFeel free to contact ${roleMention(
                "768313012196737065"
            )} or ${roleMention(
                "895508886168146000"
            )} for questions and support!`
        );

        this.__sendDirectMessage(member);
        return channel.send({ embeds: [embed] });
    }
}
