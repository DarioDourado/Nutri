
import { Type } from "@google/genai";
import { Nutrients, Language } from "../types";
import { transporter } from "./transporter/client";

export const analyzeMeal = async (mealDescription: string): Promise<Nutrients> => {
  const prompt = `Analyze this meal description and provide estimated calories and macronutrients (protein, carbs, fat in grams). 
      Description: "${mealDescription}"`;
  
  const config = {
    responseMimeType: "application/json",
    responseSchema: {
      type: Type.OBJECT,
      properties: {
        calories: { type: Type.NUMBER },
        protein: { type: Type.NUMBER },
        carbs: { type: Type.NUMBER },
        fat: { type: Type.NUMBER },
      },
      required: ["calories", "protein", "carbs", "fat"],
    },
  };

  const response = await transporter.post("gemini-3-flash-preview", prompt, config);
  const result = JSON.parse(response.text);
  return result as Nutrients;
};

export const getNutritionAdvice = async (dailyStats: Nutrients, goal: string, lang: Language): Promise<string> => {
  const langText = lang === 'pt' ? 'Portuguese' : 'English';
  const prompt = `Based on today's intake: ${JSON.stringify(dailyStats)} and user goal: ${goal}, provide a short, encouraging 2-sentence nutritional tip. The response must be in ${langText}.`;
  const response = await transporter.post("gemini-3-flash-preview", prompt);
  return response.text || (lang === 'pt' ? "Continue com o bom trabalho!" : "Keep up the good work!");
};
