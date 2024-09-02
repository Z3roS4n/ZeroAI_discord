"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
exports.execute = execute;
const discord_js_1 = require("discord.js");
exports.data = new discord_js_1.SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!");
async function execute(interaction) {
    return interaction.reply("Pong!");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9waW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQU1BLDBCQUVDO0FBUkQsMkNBQXFFO0FBRXhELFFBQUEsSUFBSSxHQUFHLElBQUksZ0NBQW1CLEVBQUU7S0FDeEMsT0FBTyxDQUFDLE1BQU0sQ0FBQztLQUNmLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBRW5DLEtBQUssVUFBVSxPQUFPLENBQUMsV0FBK0I7SUFDekQsT0FBTyxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3RDLENBQUMifQ==