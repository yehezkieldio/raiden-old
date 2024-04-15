import { ApplyOptions } from "@sapphire/decorators";
import { Listener, ListenerOptions, Events } from "@sapphire/framework";

@ApplyOptions<ListenerOptions>({
    once: true,
    event: Events.ClientReady,
})
export default class ReadyListener extends Listener {
    public run(): void {
        this.container.logs.info(
            `Logged in as ${this.container.client.user.username}!`
        );

        const commands = this.container.stores.get("commands");

        this.container.logs.info(`Loaded ${commands.size} available commands!`);

        const randomActivities = [
            "discord.io/giid",
            "discord.gg/EU4ksbdWd6",
            "discord.gg/3nF7WwvC9b",
            "discord.gg/fEwp8FTW4P",
        ];

        const randomizePresence = (): void => {
            this.container.client.user.setPresence({
                activities: [
                    {
                        name: randomActivities[
                            Math.floor(Math.random() * randomActivities.length)
                        ],
                        type: "COMPETING",
                    },
                ],
                status: "dnd",
            });
        };

        void randomActivities;
        setInterval(randomizePresence, 90000);
    }
}
