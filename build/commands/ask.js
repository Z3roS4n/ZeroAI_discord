"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
exports.execute = execute;
const discord_js_1 = require("discord.js");
const oAIReq_1 = require("../utilities/oAIReq");
const tslog_1 = require("tslog");
const fs_1 = __importDefault(require("fs"));
const log = new tslog_1.Logger({ type: "pretty" });
log.attachTransport((logObj) => {
    fs_1.default.appendFileSync("../logs.txt", JSON.stringify(logObj) + "\n");
});
exports.data = new discord_js_1.SlashCommandBuilder()
    .setName("ask")
    .setDescription("Ask a question to OpenAI")
    .addStringOption(option => option.setName("question")
    .setDescription("The question you want to ask")
    .setRequired(true))
    .addAttachmentOption(option => option.setName("attachment")
    .setDescription("The file you want to upload")
    .setRequired(false));
async function execute(interaction) {
    try {
        const question = interaction.options.get("question")?.value;
        if (!question)
            return interaction.reply("Please provide a question");
        const attachment = interaction.options.get("attachment")?.attachment;
        if (attachment)
            log.info(`ATTACHMENT: ${attachment.url}`);
        const text = (attachment ? "\n(attachment's text below)\n" + await fetch(attachment.url).then(response => response.text()) : "");
        const messages = [
            {
                role: "system",
                content: "Max 1500 characters"
            },
            {
                role: "user",
                content: "User: " + question + text
            },
        ];
        await interaction.deferReply();
        const completion = await new oAIReq_1.oAIReq().getCompletion("gpt-4o", messages);
        const response = completion.choices[0].message.content;
        if (response !== null && response.length > 0)
            await interaction.editReply(response.length <= 2000 ? response : response.slice(0, 2000));
        else {
            log.error("An error occurred, response null or empty.");
            await interaction.editReply('An error occurred, response null or empty.');
        }
    }
    catch (error) {
        log.error(error);
        await interaction.reply("An error occurred");
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2Fzay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUF3QkEsMEJBdUNDO0FBL0RELDJDQUFpRjtBQUNqRixnREFBNkM7QUFDN0MsaUNBQXdDO0FBQ3hDLDRDQUFvQjtBQUVwQixNQUFNLEdBQUcsR0FBb0IsSUFBSSxjQUFNLENBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQztBQUMxRCxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7SUFDM0IsWUFBRSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUNwRSxDQUFDLENBQUMsQ0FBQztBQUVVLFFBQUEsSUFBSSxHQUFHLElBQUksZ0NBQW1CLEVBQUU7S0FDeEMsT0FBTyxDQUFDLEtBQUssQ0FBQztLQUNkLGNBQWMsQ0FBQywwQkFBMEIsQ0FBQztLQUMxQyxlQUFlLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FDdEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7S0FDckIsY0FBYyxDQUFDLDhCQUE4QixDQUFDO0tBQzlDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FDekI7S0FDQSxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUN0QixNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztLQUN2QixjQUFjLENBQUMsNkJBQTZCLENBQUM7S0FDN0MsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUM5QixDQUFDO0FBRUMsS0FBSyxVQUFVLE9BQU8sQ0FBQyxXQUErQjtJQUN6RCxJQUFJLENBQUM7UUFDRCxNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxLQUFlLENBQUM7UUFDdEUsSUFBRyxDQUFDLFFBQVE7WUFBRSxPQUFPLFdBQVcsQ0FBQyxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUVwRSxNQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsRUFBRSxVQUF3QixDQUFDO1FBQ25GLElBQUcsVUFBVTtZQUNULEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUU5QyxNQUFNLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsK0JBQStCLEdBQUcsTUFBTSxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVqSSxNQUFNLFFBQVEsR0FBRztZQUNiO2dCQUNJLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxxQkFBcUI7YUFDakM7WUFDRDtnQkFDSSxJQUFJLEVBQUUsTUFBTTtnQkFDWixPQUFPLEVBQUUsUUFBUSxHQUFHLFFBQVEsR0FBRyxJQUFJO2FBQ3RDO1NBQ0osQ0FBQztRQUVGLE1BQU0sV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRS9CLE1BQU0sVUFBVSxHQUFHLE1BQU0sSUFBSSxlQUFNLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUl2RCxJQUFHLFFBQVEsS0FBSyxJQUFJLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQ3ZDLE1BQU0sV0FBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ3pGLENBQUM7WUFDRixHQUFHLENBQUMsS0FBSyxDQUFDLDRDQUE0QyxDQUFDLENBQUM7WUFDeEQsTUFBTSxXQUFXLENBQUMsU0FBUyxDQUFDLDRDQUE0QyxDQUFDLENBQUM7UUFDOUUsQ0FBQztJQUNMLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2IsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQixNQUFNLFdBQVcsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUNqRCxDQUFDO0FBQ0wsQ0FBQyJ9