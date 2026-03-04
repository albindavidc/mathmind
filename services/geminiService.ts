import { GoogleGenAI, Type } from "@google/genai";
import { MathResponse } from "../types";

// Initialize Gemini Client
// IMPORTANT: The API key is injected via process.env.API_KEY automatically.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are an advanced mathematical assistant and calculator. 
Your goal is to solve the user's math problem accurately.
If the input is a simple arithmetic expression, solve it directly.
If the input is a word problem or complex equation, break it down.
You must return the response in a structured JSON format.
`;

export const solveWithGemini = async (prompt: string): Promise<MathResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            answer: {
              type: Type.STRING,
              description: "The final concise result (e.g., '42', 'x = 5').",
            },
            steps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A list of short steps taken to reach the solution.",
            },
            reasoning: {
              type: Type.STRING,
              description: "A brief conversational explanation of the concept used.",
            },
          },
          required: ["answer", "steps", "reasoning"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as MathResponse;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      answer: "Error",
      steps: [],
      reasoning: "Failed to process the request with Gemini."
    };
  }
};