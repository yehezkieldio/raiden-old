import { IMessageEmbed } from "../../structures/client/message/IMessageEmbed";
import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions } from "@sapphire/framework";
import { hyperlink, roleMention, channelMention } from "@discordjs/builders";
import { Message } from "discord.js";

@ApplyOptions<CommandOptions>({
    name: "rules",
    aliases: ["peraturan", "guidelines"],
    description: ".",
    detailedDescription: ".",
    quotes: [],
    enabled: true,
})
export default class RulesCommand extends Command {
    public async messageRun(message: Message): Promise<Message> {
        await message.delete();

        const embed = new IMessageEmbed();
        embed.setTitle("❖ Rules");
        embed.addField(
            "── satu.",
            `Ikuti dan patuhi ${hyperlink(
                "Discord Terms of Serive",
                "https://discord.com/terms"
            )} dan ${hyperlink(
                "Discord Community Guidelines",
                "https://discord.com/guidelines"
            )}`
        );
        embed.addField(
            "── dua",
            "Gunakan kesopanan dan rasa hormat saat berinteraksi dengan semua member dan gunakan nickname dan avatar yang sopan."
        );
        embed.addField(
            "── tiga",
            "Gunakan channel sesuai dengan fungsi dan tujuan nya."
        );
        embed.addField(
            "── empat",
            `Tidak ada penggunaan bot di luar ${channelMention(
                "763237204478132264"
            )}, selain bot yang memiliki tujuan specifik seperti ${roleMention(
                "895422804219011133"
            )}.`
        );
        embed.addField(
            "── lima",
            "Konten sensitif seperti nsfw, phising, dan diskusi dan aktivitas ilegal atau mencurigakan akan membawa anda ke instant ban."
        );
        embed.addField(
            "── enam",
            "Tidak diizinkan untuk melakukan self-promoting, spamming, penggunaan celah dalam sistem leveling ataupun sistem bot kami."
        );
        embed.addField(
            "── notes",
            "Aturan tunduk pada akal sehat. Aturan ini tidak komprehensif dan penggunaan celah untuk melanggaraturan ini tidak akan di maafkan."
        );

        return message.channel.send({
            embeds: [embed],
        });
    }
}
