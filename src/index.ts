import { Client } from "discord.js";
import { deployCommands } from "./deploy-commmands";
import { commands } from "./commands";
import { config } from "./config";
import { Logger, ILogObj } from "tslog";
import fs from "fs";

const log: Logger<ILogObj> = new Logger({type: "pretty"});
log.attachTransport((logObj) => {
    fs.appendFileSync("./logs.txt", JSON.stringify(logObj) + "\n");
});
  
try {
    const client = new Client({
        intents: ["Guilds", "GuildMessages", "DirectMessages"],
    });

    client.once("ready", () => {
        log.silly("Discord bot is ready! 🤖");
    });
    
    client.on("guildCreate", async (guild) => {
        await deployCommands({ guildId: guild.id });
        log.info(`Deployed commands to guild: ${guild.name}`);
    });

    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isCommand()) {
            log.warn("Interaction is not a command");
            return;
        }
        const { commandName } = interaction;
        if (commands[commandName as keyof typeof commands]) {
            commands[commandName as keyof typeof commands].execute(interaction);
        }
    });

    client.login(config.TOKEN);
} catch (error) {
    log.error(error);
}

