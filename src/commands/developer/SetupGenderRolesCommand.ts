import { IMessageEmbed } from "../../structures/client/message/IMessageEmbed";
import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions } from "@sapphire/framework";
import { Message } from "discord.js";
import { ISelectMenu } from "../../structures/client/message/ISelectMenu";
import { roleMention, userMention } from "@discordjs/builders";

@ApplyOptions<CommandOptions>({
    name: "setupgenderroles",
    description: ".",
    detailedDescription: ".",
    quotes: [],
    enabled: true,
    requiredUserPermissions: ["ADMINISTRATOR"],
    preconditions: ["DeveloperOnly"],
})
export default class SetupGenderRolesCommand extends Command {
    public async messageRun(message: Message): Promise<Message> {
        await message.delete();

        const SelectMenuManager = new ISelectMenu(this.container.client);

        const heRole = SelectMenuManager.createRole({
            label: "He/Him",
            role: "782919963529969685",
            emoji: "👦",
        });

        const theyRole = SelectMenuManager.createRole({
            label: "They/Them",
            role: "839760725840625684",
            emoji: "<:gigachad:894134107758530622>",
        });

        const embed = new IMessageEmbed();

        embed.setTitle("❖ Gender Roles");
        embed.setDescription(
            `Click pada menu yang tersedia untuk mendapatkan role color dan vice-versa.\n\nUntuk mendapatkan role ${roleMention(
                "782920121483788298"
            )} silahkan untuk DM (direct message) ${userMention(
                "592064310344286265"
            )} atau ${userMention("601028494855766026")}`
        );

        return SelectMenuManager.createMenus({
            role: [heRole, theyRole],
            content: embed,
            channelId: message.channel.id,
            type: "SINGLE",
        });
    }
}
