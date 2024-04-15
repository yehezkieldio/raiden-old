import { IMessageEmbed } from "../../structures/client/message/IMessageEmbed";
import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions } from "@sapphire/framework";
import { Message } from "discord.js";
import { IButton } from "../../structures/client/message/IButton";

@ApplyOptions<CommandOptions>({
    name: "setuppingroles",
    description: ".",
    detailedDescription: ".",
    quotes: [],
    enabled: true,
    requiredUserPermissions: ["ADMINISTRATOR"],
    preconditions: ["DeveloperOnly"],
})
export default class SetupPingRolesCommand extends Command {
    public async messageRun(message: Message): Promise<Message> {
        await message.delete();

        const ButtonsManager = new IButton(this.container.client);

        const giveaway = ButtonsManager.createRole({
            color: "PRIMARY",
            label: "GIVEAWAY",
            role: "778632492546654209",
            emoji: "🎉",
        });
        const cariParty = ButtonsManager.createRole({
            color: "PRIMARY",
            label: "MABAR GENSHIN",
            role: "782542155896979457",
            emoji: "<:genshin_impact:889346147125178449>",
        });
        const partnerEvent = ButtonsManager.createRole({
            color: "PRIMARY",
            label: "PARTNER EVENT",
            role: "872323009732550697",
            emoji: "🤝",
        });
        const youtubeNotification = ButtonsManager.createRole({
            color: "PRIMARY",
            label: "YOUTUBE ALERT",
            role: "881704990304006146",
            emoji: "🆕",
        });
        const mobileLegendsNotification = ButtonsManager.createRole({
            color: "PRIMARY",
            label: "MABAR MLBB",
            role: "860462711212867605",
            emoji: "<:mlbb:908570809746984970>",
        });

        const embed = new IMessageEmbed();

        embed.setTitle("❖ Ping Roles");
        embed.setDescription(
            "Click pada menu yang tersedia untuk mendapatkan role color dan vice-versa."
        );

        return ButtonsManager.createButtons({
            role: [
                giveaway,
                cariParty,
                partnerEvent,
                youtubeNotification,
                mobileLegendsNotification,
            ],
            content: embed,
            channelId: message.channel.id,
        });
    }
}
