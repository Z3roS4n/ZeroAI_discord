"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const deploy_commmands_1 = require("./deploy-commmands");
const commands_1 = require("./commands");
const config_1 = require("./config");
const tslog_1 = require("tslog");
const fs_1 = __importDefault(require("fs"));
const log = new tslog_1.Logger({ type: "pretty" });
log.attachTransport((logObj) => {
    fs_1.default.appendFileSync("./logs.txt", JSON.stringify(logObj) + "\n");
});
try {
    const client = new discord_js_1.Client({
        intents: ["Guilds", "GuildMessages", "DirectMessages"],
    });
    client.once("ready", () => {
        log.silly("Discord bot is ready! 🤖");
    });
    client.on("guildCreate", async (guild) => {
        await (0, deploy_commmands_1.deployCommands)({ guildId: guild.id });
        log.info(`Deployed commands to guild: ${guild.name}`);
    });
    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isCommand()) {
            log.warn("Interaction is not a command");
            return;
        }
        const { commandName } = interaction;
        if (commands_1.commands[commandName]) {
            commands_1.commands[commandName].execute(interaction);
        }
    });
    client.login(config_1.config.TOKEN);
}
catch (error) {
    log.error(error);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwyQ0FBb0M7QUFDcEMseURBQW9EO0FBQ3BELHlDQUFzQztBQUN0QyxxQ0FBa0M7QUFDbEMsaUNBQXdDO0FBQ3hDLDRDQUFvQjtBQUVwQixNQUFNLEdBQUcsR0FBb0IsSUFBSSxjQUFNLENBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQztBQUMxRCxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7SUFDM0IsWUFBRSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUNuRSxDQUFDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQztJQUNELE1BQU0sTUFBTSxHQUFHLElBQUksbUJBQU0sQ0FBQztRQUN0QixPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixDQUFDO0tBQ3pELENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtRQUN0QixHQUFHLENBQUMsS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7SUFDMUMsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDckMsTUFBTSxJQUFBLGlDQUFjLEVBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDNUMsR0FBRyxDQUFDLElBQUksQ0FBQywrQkFBK0IsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDMUQsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsRUFBRTtRQUNqRCxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUM7WUFDM0IsR0FBRyxDQUFDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1lBQ3pDLE9BQU87UUFDWCxDQUFDO1FBQ0QsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLFdBQVcsQ0FBQztRQUNwQyxJQUFJLG1CQUFRLENBQUMsV0FBb0MsQ0FBQyxFQUFFLENBQUM7WUFDakQsbUJBQVEsQ0FBQyxXQUFvQyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3hFLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQy9CLENBQUM7QUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO0lBQ2IsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNyQixDQUFDIn0=