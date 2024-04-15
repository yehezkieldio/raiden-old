import { Precondition, Result, UserError } from "@sapphire/framework";
import { Message } from "discord.js";

export class UserPrecondition extends Precondition {
    public async run(message: Message): Promise<Result<unknown, UserError>> {
        if (message.channel.id === "761550682754383882") {
            await message.delete();
            return this.error({
                message: "Command ini disabled untuk channel ini.",
            });
        } else {
            return this.ok();
        }
    }
}

declare module "@sapphire/framework" {
    interface Preconditions {
        DisabledOnMainChat: never;
    }
}
