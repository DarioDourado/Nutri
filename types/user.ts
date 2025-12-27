export interface User {
  id: string;
  name: string;
  email: string;
  goal: 'lose' | 'gain' | 'maintain';
  dailyCalorieTarget: number;
  weight: number;
  height: number;
}
