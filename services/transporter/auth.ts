

/**
 * Auth Transporter
 * Simulates network requests to an authentication provider (e.g., Firebase, Auth0, or custom API).
 */

import { User } from "@/types/user";

const MOCK_DELAY = 1000;

// Mock user for local/testing usage
export const MOCK_USER: User = {
  id: 'user-test',
  name: 'UserTest',
  email: 'user@test.com',
  goal: 'maintain',
  dailyCalorieTarget: 2200,
  weight: 70,
  height: 170,
};

export const authTransporter = {
  async login(email: string, pass: string): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'user@test.com' && pass === 'test') {
          resolve(MOCK_USER);
          return;
        }

        if (email.includes('@') && pass.length >= 4) {
          resolve({
            id: Math.random().toString(36).substr(2, 9),
            name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
            email: email,
            goal: 'maintain',
            dailyCalorieTarget: 2200,
            weight: 75,
            height: 180,
          });
        } else {
          reject(new Error("Credenciais inválidas. Verifique o seu email e palavra-passe."));
        }
      }, MOCK_DELAY);
    });
  },

  async register(userData: Partial<User>, pass: string): Promise<User> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Math.random().toString(36).substr(2, 9),
          name: userData.name || 'Novo Utilizador',
          email: userData.email || '',
          goal: 'maintain',
          dailyCalorieTarget: 2000,
          weight: 70,
          height: 170,
          ...userData
        } as User);
      }, MOCK_DELAY);
    });
  },

  async logout(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  }
};
