import { IMessageEmbed } from "../../structures/client/message/IMessageEmbed";
import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions } from "@sapphire/framework";
import { Message } from "discord.js";
import { ISelectMenu } from "../../structures/client/message/ISelectMenu";

@ApplyOptions<CommandOptions>({
    name: "setupcolorroles",
    description: ".",
    detailedDescription: ".",
    quotes: [],
    enabled: true,
    requiredUserPermissions: ["ADMINISTRATOR"],
    preconditions: ["DeveloperOnly"],
})
export default class SetupColorRolesCommand extends Command {
    public async messageRun(message: Message): Promise<Message> {
        await message.delete();

        const SelectMenuManager = new ISelectMenu(this.container.client);

        const pyroRole = SelectMenuManager.createRole({
            label: "Pyro",
            role: "839754552353095680",
            emoji: "<:Element_Pyro:763984820564525066>",
        });

        const anemoRole = SelectMenuManager.createRole({
            label: "Anemo",
            role: "839758478872150036",
            emoji: "<:Element_Anemo:763984819066634289>",
        });

        const electroRole = SelectMenuManager.createRole({
            label: "Electro",
            role: "839758463135383582",
            emoji: "<:Element_Electro:763984819864076289>",
        });

        const cryoRole = SelectMenuManager.createRole({
            label: "Cryo",
            role: "839758482991480874",
            emoji: "<:Element_Cryo:763984819688308768>",
        });

        const dendroRole = SelectMenuManager.createRole({
            label: "Dendro",
            role: "899948307042959370",
            emoji: "<:Element_Dendro:763984819792773120>",
        });

        const hydroRole = SelectMenuManager.createRole({
            label: "Hydro",
            role: "839758453500280832",
            emoji: "<:Element_Hydro:763984820342095882> ",
        });

        const geoRole = SelectMenuManager.createRole({
            label: "Geo",
            role: "839758471594246154",
            emoji: "<:Element_Geo:763984820052819978>",
        });

        const embed = new IMessageEmbed();

        embed.setTitle("❖ Color Roles");
        embed.setDescription(
            "Click pada menu yang tersedia untuk mendapatkan role color dan vice-versa."
        );

        return SelectMenuManager.createMenus({
            role: [
                pyroRole,
                hydroRole,
                anemoRole,
                electroRole,
                cryoRole,
                dendroRole,
                geoRole,
            ],
            content: embed,
            channelId: message.channel.id,
            type: "SINGLE",
        });
    }
}
