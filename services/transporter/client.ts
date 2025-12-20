
import { GoogleGenAI } from "@google/genai";

/**
 * Transporter Client
 * Responsible for bootstrapping the AI SDK and providing a consistent interface
 * for network-like operations.
 */

const getAIClient = () => {
  const apiKey = process.env.API_KEY || "";
  if (!apiKey) {
    console.warn("API_KEY not found in environment.");
  }
  return new GoogleGenAI({ apiKey });
};

export const aiClient = getAIClient();

export const transporter = {
  async post(model: string, prompt: string, config?: any) {
    try {
      const response = await aiClient.models.generateContent({
        model,
        contents: prompt,
        config,
      });
      return response;
    } catch (error) {
      console.error("Transporter Error:", error);
      throw error;
    }
  }
};
