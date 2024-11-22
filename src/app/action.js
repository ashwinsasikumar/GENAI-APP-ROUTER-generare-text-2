
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI({
  apiKey: "AIzaSyDttmLJaEMTwJ4JOiG9uCAU9HignOITTgg",
});

let chatHistory = [];

export async function handleGenerateText(userInput) {
  try {
    chatHistory.push({ role: "user", content: userInput });
    const prompt = chatHistory
      .map((message) =>
        message.role === "user"
          ? `User: ${message.content}`
          : `AI: ${message.content}`
      )
      .join("\n");

    let { text } = await generateText({
      model: google("gemini-1.5-flash"),
      prompt: prompt,
      temperature: 0.1,
      system: "You are a chatbot,Your knowledge is only about device specifications,should not ask any specific part to compare , should just tell the main specifications about the devices and mention its colour varients,storage varients and its price in india and tell which is good",
    });

    chatHistory.push({ role: "ai", content: text });
    return text; 
  } catch (error) {
    console.error("Error fetching Gemini AI response:", error);
    return null;
  }
}
