import { GoogleGenAI } from "@google/genai";

/**
 * Transporter Client
 * Responsible for bootstrapping the AI SDK and providing a consistent interface
 * for network-like operations.
 */

const getAIClient = () => {
  const apiKey = (import.meta as any).env?.VITE_API_KEY || "";
  if (!apiKey) {
    console.error("VITE_API_KEY not found in environment. Check .env file and restart dev server.");
    throw new Error("API key is missing. Please provide a valid API key.");
  }
  console.debug('[transporter/client] API_KEY loaded:', apiKey.slice(0, 8) + '***');
  return new GoogleGenAI({ apiKey });
};

export const aiClient = getAIClient();

export const transporter = {
  async post(model: string, input: any, opts?: any) {
    if (!model || typeof model !== 'string') {
      console.error('[transporter.post] invalid model:', model);
      throw new Error('model is required and must be a string');
    }

    try {
      const response = await aiClient.models.generateContent({
        model,
        contents: input,
        config: opts,
      });
      return response;
    } catch (err) {
      console.error('[transporter.post] request error:', err);
      throw err;
    }
  },
};
