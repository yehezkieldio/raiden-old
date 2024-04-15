import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions } from "@sapphire/framework";
import { Message } from "discord.js";

@ApplyOptions<CommandOptions>({
    name: "emitjoinevent",
    description: ".",
    detailedDescription: ".",
    quotes: [],
    enabled: true,
    requiredUserPermissions: ["MANAGE_MESSAGES"],
})
export default class EmitJoinEventCommand extends Command {
    public async messageRun(message: Message): Promise<void> {
        await message.delete();

        this.container.client.emit("guildMemberAdd", message.member);
    }
}
