import { Attachment, CommandInteraction, SlashCommandBuilder } from "discord.js";
import { oAIReq } from "../utilities/oAIReq";
import { Logger, ILogObj } from "tslog";
import fs from "fs";

const log: Logger<ILogObj> = new Logger({type: "pretty"});
log.attachTransport((logObj) => {
    fs.appendFileSync("../logs.txt", JSON.stringify(logObj) + "\n");
});

export const data = new SlashCommandBuilder()
    .setName("ask")
    .setDescription("Ask a question to OpenAI")
    .addStringOption(option =>
        option.setName("question")
            .setDescription("The question you want to ask")
            .setRequired(true)
    )
    .addAttachmentOption(option =>
            option.setName("attachment")
                .setDescription("The file you want to upload")
                .setRequired(false)
    );

export async function execute(interaction: CommandInteraction) {
    try {
        const question = interaction.options.get("question")?.value as string;
        if(!question) return interaction.reply("Please provide a question");
        
        const attachment = interaction.options.get("attachment")?.attachment as Attachment; 
        if(attachment) 
            log.info(`ATTACHMENT: ${attachment.url}`); // log the attachment url

        const text = (attachment ? "\n(attachment's text below)\n" + await fetch(attachment.url).then(response => response.text()) : ""); // fetch the text from the attachment

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

        const completion = await new oAIReq().getCompletion("gpt-4o", messages);
        const response = completion.choices[0].message.content;

        /*defer reply */

        if(response !== null && response.length > 0)
            await interaction.editReply(response.length <= 2000 ? response : response.slice(0, 2000));
        else {
            log.error("An error occurred, response null or empty.");
            await interaction.editReply('An error occurred, response null or empty.');
        }
    } catch (error) {
        log.error(error);
        await interaction.reply("An error occurred");
    }
}