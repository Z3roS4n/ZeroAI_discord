"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.oAIReq = void 0;
const openai_1 = __importDefault(require("openai"));
const conf = __importStar(require("../conf.json"));
const fs_1 = __importDefault(require("fs"));
const openai = new openai_1.default({
    apiKey: conf.OPENAI
});
class oAIReq {
    async getCompletion(model, messages) {
        const completion = await openai.chat.completions.create({
            model: model,
            messages: messages
        });
        return completion;
    }
    async uploadFile(file) {
        const completion = await openai.files.create({
            file: fs_1.default.createReadStream(file),
            purpose: "fine-tune",
        });
        return completion;
    }
}
exports.oAIReq = oAIReq;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib0FJUmVxLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxpdGllcy9vQUlSZXEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBNEI7QUFDNUIsbURBQXFDO0FBQ3JDLDRDQUFvQjtBQUVwQixNQUFNLE1BQU0sR0FBRyxJQUFJLGdCQUFNLENBQUM7SUFDdEIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO0NBQ3RCLENBQUMsQ0FBQztBQUVILE1BQWEsTUFBTTtJQUVmLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBYSxFQUFFLFFBQWE7UUFDNUMsTUFBTSxVQUFVLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7WUFDcEQsS0FBSyxFQUFFLEtBQUs7WUFDWixRQUFRLEVBQUUsUUFBUTtTQUNyQixDQUFDLENBQUM7UUFDSCxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFTO1FBQ3RCLE1BQU0sVUFBVSxHQUFHLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFDekMsSUFBSSxFQUFFLFlBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUM7WUFDL0IsT0FBTyxFQUFFLFdBQVc7U0FDdkIsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQztDQUVKO0FBbEJELHdCQWtCQyJ9