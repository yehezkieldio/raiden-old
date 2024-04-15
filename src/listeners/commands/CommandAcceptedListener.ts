import { ApplyOptions } from "@sapphire/decorators";
import {
    Listener,
    ListenerOptions,
    Events,
    CommandAcceptedPayload,
} from "@sapphire/framework";

@ApplyOptions<ListenerOptions>({
    once: false,
    event: Events.CommandAccepted,
})
export default class CommandAcceptedListener extends Listener {
    public run(data: CommandAcceptedPayload): void {
        this.container.logs.debug(
            `Command ${data.command.name} accepted for ${data.message.author.tag}.`
        );
    }
}
