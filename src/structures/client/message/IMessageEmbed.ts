import { MessageEmbed } from "discord.js";

export class IMessageEmbed extends MessageEmbed {
    constructor() {
        super();

        this.setColor("#ff0fff");
    }
}
