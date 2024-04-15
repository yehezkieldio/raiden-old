import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions } from "@sapphire/framework";
import { Message } from "discord.js";

@ApplyOptions<CommandOptions>({
    name: "invite",
    description: ".",
    detailedDescription: ".",
    quotes: [],
    enabled: true,
})
export default class InviteCommand extends Command {
    public async messageRun(message: Message): Promise<Message> {
        const discordIo = "https://discord.io/giid";
        const discordGg = "https://discord.gg/EU4ksbdWd6";

        return message.reply({ content: discordIo + "\n" + discordGg });
    }
}
