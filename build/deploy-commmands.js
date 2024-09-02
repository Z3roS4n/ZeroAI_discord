"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployCommands = deployCommands;
const discord_js_1 = require("discord.js");
const config_1 = require("./config");
const commands_1 = require("./commands/");
const fs_1 = __importDefault(require("fs"));
const tslog_1 = require("tslog");
const log = new tslog_1.Logger({ type: "pretty" });
log.attachTransport((logObj) => {
    fs_1.default.appendFileSync("./logs.txt", JSON.stringify(logObj) + "\n");
});
const commandsData = Object.values(commands_1.commands).map((command) => command.data);
const rest = new discord_js_1.REST({ version: "10" }).setToken(config_1.config.TOKEN);
async function deployCommands({ guildId }) {
    try {
        log.info("Started refreshing application (/) commands.");
        await rest.put(discord_js_1.Routes.applicationGuildCommands(config_1.config.CLIENT_ID, guildId), {
            body: commandsData,
        });
        log.info("Successfully reloaded application (/) commands.");
    }
    catch (error) {
        log.error(error);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95LWNvbW1tYW5kcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9kZXBsb3ktY29tbW1hbmRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBbUJBLHdDQWVDO0FBbENELDJDQUEwQztBQUMxQyxxQ0FBa0M7QUFDbEMsMENBQXVDO0FBQ3ZDLDRDQUFvQjtBQUNwQixpQ0FBd0M7QUFFeEMsTUFBTSxHQUFHLEdBQW9CLElBQUksY0FBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUM7QUFDMUQsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO0lBQzNCLFlBQUUsQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDbkUsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLG1CQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUU1RSxNQUFNLElBQUksR0FBRyxJQUFJLGlCQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsZUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBTXpELEtBQUssVUFBVSxjQUFjLENBQUMsRUFBRSxPQUFPLEVBQXVCO0lBQ2pFLElBQUksQ0FBQztRQUNELEdBQUcsQ0FBQyxJQUFJLENBQUMsOENBQThDLENBQUMsQ0FBQztRQUV6RCxNQUFNLElBQUksQ0FBQyxHQUFHLENBQ1YsbUJBQU0sQ0FBQyx3QkFBd0IsQ0FBQyxlQUFNLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxFQUMxRDtZQUNJLElBQUksRUFBRSxZQUFZO1NBQ3JCLENBQ0osQ0FBQztRQUVGLEdBQUcsQ0FBQyxJQUFJLENBQUMsaURBQWlELENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNiLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckIsQ0FBQztBQUNMLENBQUMifQ==