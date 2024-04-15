import { IMessageEmbed } from "../../structures/client/message/IMessageEmbed";
import { ApplyOptions } from "@sapphire/decorators";
import {
    Listener,
    ListenerOptions,
    Events,
    CommandDeniedPayload,
    UserError,
    Identifiers,
} from "@sapphire/framework";
import { inlineCode } from "@discordjs/builders";
import { Message } from "discord.js";

@ApplyOptions<ListenerOptions>({
    once: false,
    event: Events.CommandDenied,
})
export default class CommandDeniedListener extends Listener {
    public missingUserPermissions(
        error: UserError,
        data: CommandDeniedPayload
    ): Promise<Message> {
        const embed = new IMessageEmbed();

        embed.setTitle("❖ Missing Permission");
        embed.setDescription("Kamu tidak ada permission yang di perlukan!");
        embed.addField(
            "── Expected Permission",
            `${inlineCode(`${error.context["missing"].join(" ")}`)}`
        );

        return data.message.channel.send({ embeds: [embed] });
    }

    public missingClientPermissions(
        error: UserError,
        data: CommandDeniedPayload
    ): Promise<Message> {
        const embed = new IMessageEmbed();

        embed.setTitle("❖ Missing Permission");
        embed.setDescription("Bot tidak ada permission yang di perlukan!");
        embed.addField(
            "── Expected Permission",
            `${inlineCode(`${error.context["missing"].join(" ")}`)}`
        );

        return data.message.channel.send({ embeds: [embed] });
    }

    public async unhandledError(
        error: Error,
        data: CommandDeniedPayload
    ): Promise<Message> {
        this.container.logs.error(
            `Command ${data.command.name} existed with unhandled error ${error.name}: ${error.message}\n\n ${error.stack}`
        );

        const embed = new IMessageEmbed();

        embed.setTitle("❖ Error");
        embed.setDescription(error.message);
        embed.setAuthor(
            data.message.author.tag,
            data.message.author.avatarURL()
        );

        return data.message.channel.send({ embeds: [embed] });
    }

    public async run(
        error: UserError,
        data: CommandDeniedPayload
    ): Promise<Message<boolean>> {
        this.container.logs.debug(
            `Command ${data.command.name} denied for ${data.message.author.tag}.`
        );

        if (error.identifier === Identifiers.PreconditionUserPermissions) {
            this.missingUserPermissions(error, data);
        }

        if (error.identifier === Identifiers.PreconditionClientPermissions) {
            this.missingClientPermissions(error, data);
        }

        return this.unhandledError(error, data);
    }
}
