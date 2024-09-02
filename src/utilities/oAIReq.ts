import OpenAI from "openai";
import * as conf from '../conf.json';
import fs from "fs";

const openai = new OpenAI({
    apiKey: conf.OPENAI
});

export class oAIReq {

    async getCompletion(model: string, messages: any) {
        const completion = await openai.chat.completions.create({
            model: model,
            messages: messages
        });
        return completion;
    }

    async uploadFile(file: any) {
        const completion = await openai.files.create({
            file: fs.createReadStream(file),
            purpose: "fine-tune",
        });
        return completion;
    }

}