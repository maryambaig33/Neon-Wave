import { GoogleGenAI } from "@google/genai";
import { GroundingChunk } from "../types";
import { SYSTEM_INSTRUCTION } from "../constants";

let ai: GoogleGenAI | null = null;

// Initialize the AI client securely with the env key
try {
  // Check if process is defined before accessing properties to prevent ReferenceError in some environments
  if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
} catch (error) {
  console.error("Failed to initialize GoogleGenAI:", error);
}

interface ChatResponse {
  text: string;
  groundingChunks: GroundingChunk[];
}

export const sendMessageToGuide = async (
  userMessage: string,
  location?: { lat: number; lng: number }
): Promise<ChatResponse> => {
  if (!ai) {
    return {
      text: "I'm sorry, but I cannot connect to the AI service right now. Please check your API key configuration.",
      groundingChunks: []
    };
  }

  try {
    const modelId = "gemini-2.5-flash";
    
    // Setup tool config for Maps
    // If we have user location, we can pass it to retrievalConfig
    const toolConfig = location ? {
      retrievalConfig: {
        latLng: {
          latitude: location.lat,
          longitude: location.lng
        }
      }
    } : undefined;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleMaps: {} }],
        toolConfig: toolConfig,
      },
    });

    const text = response.text || "I found some places, but couldn't generate a description.";
    
    // Extract grounding chunks safely
    const candidates = response.candidates;
    let groundingChunks: GroundingChunk[] = [];

    if (candidates && candidates[0]?.groundingMetadata?.groundingChunks) {
      groundingChunks = candidates[0].groundingMetadata.groundingChunks;
    }

    return { text, groundingChunks };

  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return {
      text: "I'm having trouble scanning the nightlife frequency right now. Please try again in a moment.",
      groundingChunks: []
    };
  }
};