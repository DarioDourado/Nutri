import { Meal } from "./meal";
import { Nutrients } from "./nutrients";
import { User } from "./user";

export interface DashboardProps {
  user: User;
  todayMeals: Meal[];
  dailyTotals: Nutrients;
  isAnalyzing: boolean;
  aiAdvice: string;
  onLogMeal: (desc: string) => Promise<any>;
}