
export interface User {
  id: string;
  name: string;
  email: string;
  goal: 'lose' | 'gain' | 'maintain';
  dailyCalorieTarget: number;
  weight: number;
  height: number;
}

export interface Nutrients {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Meal {
  id: string;
  timestamp: number;
  description: string;
  nutrients: Nutrients;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface NutritionPlan {
  id: string;
  name: string;
  description: string;
  targetMacros: Nutrients;
}

export enum Page {
  LANDING = 'landing',
  DASHBOARD = 'dashboard',
  PROFILE = 'profile',
  PLANS = 'plans',
  LOGIN = 'login',
  CONTACT = 'contact'
}

export type Language = 'pt' | 'en';
