import { REST, Routes } from "discord.js";
import { config } from "./config";
import { commands } from "./commands/";
import fs from "fs";
import { Logger, ILogObj } from "tslog";

const log: Logger<ILogObj> = new Logger({type: "pretty"});
log.attachTransport((logObj) => {
    fs.appendFileSync("./logs.txt", JSON.stringify(logObj) + "\n");
});

const commandsData = Object.values(commands).map((command) => command.data);

const rest = new REST({ version: "10" }).setToken(config.TOKEN);

type DeployCommandsProps = {
    guildId: string;
};

export async function deployCommands({ guildId }: DeployCommandsProps) {
    try {
        log.info("Started refreshing application (/) commands.");

        await rest.put(
            Routes.applicationGuildCommands(config.CLIENT_ID, guildId),
            {
                body: commandsData,
            }
        );

        log.info("Successfully reloaded application (/) commands.");
    } catch (error) {
        log.error(error);
    }
}