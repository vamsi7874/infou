import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const geminiGpt = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  temperature: 1.0,
  apiKey: process.env.GOOGLE_API_KEY,
});

const baseMessages = [
  new SystemMessage(
    "Answer the user Question, ask a followup. You are an assistant that responds strictly in valid HTML format — without using markdown syntax, triple backticks, or escape characters.Return only the <div> or <p> elements as raw HTML"
  ),
];

export const getAiResponse = async (req: any) => {
  const userMessage = req?.body?.message || req?.message;

  const messages = [...baseMessages, new HumanMessage(userMessage ?? "Hi!")];

  const response = await geminiGpt.invoke(messages);
  const cleanHtml = JSON.stringify(response.content)
    .replace(/```html|```/g, "")
    .replace(/\\n/g, "")
    .trim();

  return { response: cleanHtml };
};
