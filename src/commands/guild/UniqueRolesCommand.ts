import { IMessageEmbed } from "../../structures/client/message/IMessageEmbed";
import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions } from "@sapphire/framework";
import { channelMention, roleMention } from "@discordjs/builders";
import { Message } from "discord.js";

@ApplyOptions<CommandOptions>({
    name: "uniqueroles",
    aliases: ["unique"],
    description: ".",
    detailedDescription: ".",
    quotes: [],
    enabled: true,
})
export default class LevelRolesCommand extends Command {
    public async messageRun(message: Message): Promise<Message> {
        const embed = new IMessageEmbed();
        embed.setTitle("❖ Unique Roles");
        embed.addField(
            "〃 Expert Traveler",
            `${roleMention(
                "899471901934637147"
            )} 100% Exploration Progress 3 region Teyvat.`
        );
        embed.addField(
            "〃 Primodial Traveler",
            `${roleMention("899472465430994945")} 365+ days active.`
        );
        embed.addField(
            "〃 Legendary Traveler",
            `${roleMention("899473299346718740")} Adventure Rank 60+.`
        );
        embed.addField(
            "〃 Narukami's Envoy",
            `${roleMention("899472965119410247")} Sacred Sakura's Favor 50+.`
        );
        embed.addField(
            "〃 Character Hoarder",
            `${roleMention("899472955225026570")} Characters 40+.`
        );
        embed.addField(
            "〃 The Art of Achievement Hunting",
            `${roleMention("899472947415228467")} Achievements 400+.`
        );
        embed.addField(
            "〃 Dead Men Tell No Tales",
            `${roleMention("899472936229044224")} Qiqi constellation 2+.`
        );
        embed.addField(
            "〃 Above and Beyond",
            `${roleMention(
                "899472925072187422"
            )} Showcase Damage 1.0-2.0+ Million.`
        );
        embed.addField(
            "〃 Luck or Curse",
            `${roleMention("899472915920203807")} Giveaway winner 2x.`
        );
        embed.addField(
            "〃 Trial By Fire",
            `${roleMention("899472910689902634")} Bennet constellation 6+`
        );
        embed.addField(
            "〃 Fly Fisherman",
            `${roleMention("899472901806358548")} Memancing 2000+ fish.`
        );
        embed.addField(
            "〃 Chef de Cuisine",
            `${roleMention("899472888787263509")} 80+ recipes mastered.`
        );
        embed.addField(
            "〃 Stellar Companionship",
            `${roleMention(
                "899472884093820998"
            )} Friendship Level 10 on 20+ Characters.`
        );
        embed.addField(
            "〃 Whaler",
            `${roleMention("899472874300125215")} Initial Top-Up Bonus habis.`
        );
        embed.addField(
            "〃 notes",
            `Untuk mendapatkan role-role tersebut. Createlah thread baru untuk melakukan verifikasi di ${channelMention(
                "899572305875832853"
            )}`
        );

        return message.channel.send({
            embeds: [embed],
        });
    }
}
