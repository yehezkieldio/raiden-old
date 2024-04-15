import "dotenv/config";
import { IClient } from "./structures/client/IClient";
import { container } from "@sapphire/pieces";

const main = (): void => {
    const client = new IClient({
        prefix: process.env.PRODUCTION_BUILD === "true" ? "g." : "g..",
    });

    container.logs.info(
        process.env.PRODUCTION_BUILD === "true"
            ? "Running a production build."
            : "Running a non-production build."
    );

    try {
        container.logs.info("Starting up..");
        client.__intialize(process.env.DISCORD_TOKEN);
    } catch (error) {
        container.logs.error(error);
        client.destroy();
        process.exit(1);
    }
};

void main();
