import { Nutrients } from "./nutrients";

export interface Meal {
  id: string;
  timestamp: number;
  description: string;
  nutrients: Nutrients;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}