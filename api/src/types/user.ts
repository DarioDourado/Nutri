export interface User {
  id: string;
  name: string;
  email: string;
  goal?: 'lose' | 'gain' | 'maintain';
  dailyCalorieTarget?: number;
  weight?: number;
  height?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends AuthRequest {
  name: string;
  goal?: string;
  weight?: number;
  height?: number;
}

export interface UpdateProfileRequest {
  name?: string;
  goal?: string;
  dailyCalorieTarget?: number;
  weight?: number;
  height?: number;
}
