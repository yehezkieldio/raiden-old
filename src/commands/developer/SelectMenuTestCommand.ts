import { IMessageEmbed } from "../../structures/client/message/IMessageEmbed";
import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions } from "@sapphire/framework";
import { Message } from "discord.js";
import { ISelectMenu } from "../../structures/client/message/ISelectMenu";

@ApplyOptions<CommandOptions>({
    name: "menustest",
    description: ".",
    detailedDescription: ".",
    quotes: [],
    enabled: true,
    requiredUserPermissions: ["MANAGE_MESSAGES"],
    preconditions: ["DeveloperOnly"],
})
export default class SelectMenuTestCommand extends Command {
    public async messageRun(message: Message): Promise<Message> {
        await message.delete();

        const SelectMenuManager = new ISelectMenu(this.container.client);

        const geoRole = SelectMenuManager.createRole({
            label: "GEO",
            role: "839758471594246154",
            emoji: "<:Element_Hydro:763984820342095882> ",
        });
        const hydroRole = SelectMenuManager.createRole({
            label: "HYDRO",
            role: "839758453500280832",
            emoji: "<:Element_Geo:763984820052819978>",
        });

        return SelectMenuManager.createMenus({
            role: [geoRole, hydroRole],
            content: new IMessageEmbed().setDescription(
                "Test Embed for Select Menus!"
            ),
            channelId: message.channel.id,
            type: "SINGLE",
        });
    }
}
