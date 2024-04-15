import { IMessageEmbed } from "../../structures/client/message/IMessageEmbed";
import { ApplyOptions } from "@sapphire/decorators";
import {
    Listener,
    ListenerOptions,
    Events,
    Identifiers,
    CommandErrorPayload,
    UserError,
    ArgumentError,
} from "@sapphire/framework";
import { Message, DiscordAPIError } from "discord.js";
import { inlineCode } from "@discordjs/builders";

@ApplyOptions<ListenerOptions>({
    once: false,
    event: Events.CommandError,
})
export default class CommandErrorListener extends Listener {
    public async userError(
        error: UserError,
        data: CommandErrorPayload
    ): Promise<Message> {
        if (error.identifier === Identifiers.ArgsMissing) {
            const embed = new IMessageEmbed();

            embed.setTitle("❖ Argument Error");
            embed.setDescription("Tidak ada argument yang di perlukan!");
            embed.addField(
                "── Expected Arguments",
                `${inlineCode(
                    `g.${data.command.name} ${data.command.detailedDescription}`
                )}`
            );
            embed.setAuthor(
                data.message.author.tag,
                data.message.author.avatarURL()
            );

            return data.message.channel.send({ embeds: [embed] });
        } else {
            const embed = new IMessageEmbed();

            embed.setTitle("❖ User Error");
            embed.setDescription(
                `User error ditemukan untuk ${data.command.name}`
            );
            embed.setAuthor(
                data.message.author.tag,
                data.message.author.avatarURL()
            );

            data.message.channel.send({ embeds: [embed] });
        }
    }

    public async argumentError(
        error: ArgumentError,
        data: CommandErrorPayload
    ): Promise<Message> {
        const embed = new IMessageEmbed();

        embed.setTitle("❖ Argument Error");
        embed.setDescription(error.message);
        embed.setAuthor(
            data.message.author.tag,
            data.message.author.avatarURL()
        );

        return data.message.channel.send({ embeds: [embed] });
    }

    public async unhandledError(
        error: Error,
        data: CommandErrorPayload
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

    public run(error: Error, data: CommandErrorPayload): Promise<Message> {
        if (error instanceof ArgumentError)
            return this.argumentError(error, data);

        if (error instanceof UserError) return this.userError(error, data);

        if (error instanceof DiscordAPIError) {
            this.container.logs.warn(
                `DiscordAPIError for ${data.message.author.tag}\n\n${error.stack}`
            );
        }

        return this.unhandledError(error, data);
    }
}
