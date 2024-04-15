import { Precondition, Result, UserError } from "@sapphire/framework";
import { Message } from "discord.js";

const DEVELOPERS = ["327849142774923266"];

export class UserPrecondition extends Precondition {
    public async run(message: Message): Promise<Result<unknown, UserError>> {
        return DEVELOPERS.includes(message.author.id)
            ? this.ok()
            : this.error({
                  message: "Command ini hanya untuk para developers.",
              });
    }
}

declare module "@sapphire/framework" {
    interface Preconditions {
        DeveloperOnly: never;
    }
}
