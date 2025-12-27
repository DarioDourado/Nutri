
/**
 * Auth Transporter
 * Connects to the Nutri API for authentication using Firebase
 */

import { User } from "@/types/user";

const API_URL = (import.meta as any).env.VITE_API_URL;

// Storage keys
const TOKEN_KEY = 'nutri_auth_token';
const USER_KEY = 'nutri_user';

// Helper functions for token management
const saveToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

const saveUser = (user: User) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const authTransporter = {
  async login(email: string, password: string): Promise<User> {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Credenciais inválidas. Verifique o seu email e palavra-passe.');
      }

      const data = await response.json();
      
      // Save token and user data
      saveToken(data.token);
      saveUser(data.user);
      
      return data.user;
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Erro ao fazer login. Tente novamente.');
    }
  },

  async register(userData: Partial<User>, password: string): Promise<User> {
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          password,
          name: userData.name,
          goal: userData.goal || 'maintain',
          weight: userData.weight,
          height: userData.height,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao registrar. Tente novamente.');
      }

      const data = await response.json();
      
      // Save token and user data
      saveToken(data.token);
      saveUser(data.user);
      
      return data.user;
    } catch (error: any) {
      console.error('Register error:', error);
      throw new Error(error.message || 'Erro ao registrar. Tente novamente.');
    }
  },

  async logout(): Promise<void> {
    try {
      // Remove local storage data
      removeToken();
      return Promise.resolve();
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Erro ao fazer logout.');
    }
  },

  // Get current token
  getAuthToken(): string | null {
    return getToken();
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!getToken();
  },

  // Get stored user data
  getStoredUser(): User | null {
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },
};

