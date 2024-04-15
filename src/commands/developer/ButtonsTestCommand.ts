import { IMessageEmbed } from "../../structures/client/message/IMessageEmbed";
import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions } from "@sapphire/framework";
import { Message } from "discord.js";
import { IButton } from "../../structures/client/message/IButton";

@ApplyOptions<CommandOptions>({
    name: "buttonstest",
    description: ".",
    detailedDescription: ".",
    quotes: [],
    enabled: true,
    requiredUserPermissions: ["MANAGE_MESSAGES"],
    preconditions: ["DeveloperOnly"],
})
export default class ButtonsTestCommand extends Command {
    public async messageRun(message: Message): Promise<Message> {
        await message.delete();

        const ButtonsManager = new IButton(this.container.client);

        const geoRole = ButtonsManager.createRole({
            color: "SECONDARY",
            label: "GEO",
            role: "839758471594246154",
            emoji: "<:Element_Hydro:763984820342095882> ",
        });
        const hydroRole = ButtonsManager.createRole({
            color: "SECONDARY",
            label: "HYDRO",
            role: "839758453500280832",
            emoji: "<:Element_Geo:763984820052819978>",
        });

        return ButtonsManager.createButtons({
            role: [geoRole, hydroRole],
            content: new IMessageEmbed().setDescription(
                "Test Embed for Buttons!"
            ),
            channelId: message.channel.id,
        });
    }
}
