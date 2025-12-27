import { Nutrients } from "./nutrients";

export interface NutritionPlan {
  id: string;
  name: string;
  description: string;
  targetMacros: Nutrients;
}