
import { GoogleGenAI } from "@google/genai";

// The API key is now checked during the API call, not on initial load.
// This prevents the app from crashing with a blank screen if the
// environment variable isn't immediately available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const model = "gemini-2.5-flash";

const systemInstruction = `You are an expert creative director and prompt engineer for an advanced text-to-video AI model called 'Veo'.
Your task is to take a user's simple idea and expand it into a rich, detailed, and cinematic prompt.
The prompt should be a single paragraph.
Focus on visual details: lighting, camera angles, color palette, character appearance, environment, and mood.
Use evocative and descriptive language. Do not write any headers or titles, just the prompt itself.

Example User Idea: a knight fighting a dragon
Example Output: An epic fantasy battle scene. A knight in gleaming, battle-scarred silver armor wields a longsword that glows with faint blue energy. The knight stands on a crumbling castle parapet against a stormy, purple-hued sky. A colossal, emerald-green dragon with scales that shimmer like metal descends from the clouds, unleashing a torrent of golden fire. The camera is positioned low, looking up, to emphasize the scale of the dragon. Sparks and embers drift through the air, illuminating the intense, determined expression on the knight's face. The mood is tense, dramatic, and heroic.
`;

export const generateDetailedPrompt = async (idea: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: idea,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
        topP: 0.9,
      }
    });
    
    const text = response.text;
    if (!text) {
      throw new Error("The AI returned an empty response.");
    }
    return text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        if (error.message.includes('API key not valid')) {
            throw new Error('The configured API key is invalid. Please check your configuration.');
        }
         throw new Error(`Failed to generate prompt: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the AI.");
  }
};
