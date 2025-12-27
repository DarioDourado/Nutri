/**
 * User Profile Transporter
 * Connects to the Nutri API for user profile management
 */

import { User } from "@/types/user";

const API_URL = (import.meta as any).env?.VITE_API_URL ?? '';
const TOKEN_KEY = 'nutri_auth_token';

const getAuthHeader = (): HeadersInit => {
  const token = localStorage.getItem(TOKEN_KEY);
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

export const userTransporter = {
  async getProfile(): Promise<User> {
    try {
      const response = await fetch(`${API_URL}/api/users/profile`, {
        method: 'GET',
        headers: getAuthHeader(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Não autenticado. Faça login novamente.');
        }
        throw new Error('Erro ao buscar perfil.');
      }

      const data = await response.json();
      return data.user;
    } catch (error: any) {
      console.error('Get profile error:', error);
      throw new Error(error.message || 'Erro ao buscar perfil.');
    }
  },

  async updateProfile(updates: Partial<User>): Promise<User> {
    try {
      const response = await fetch(`${API_URL}/api/users/profile`, {
        method: 'PUT',
        headers: getAuthHeader(),
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Não autenticado. Faça login novamente.');
        }
        const error = await response.json();
        throw new Error(error.error || 'Erro ao atualizar perfil.');
      }

      const data = await response.json();
      
      // Update stored user data
      localStorage.setItem('nutri_user', JSON.stringify(data.user));
      
      return data.user;
    } catch (error: any) {
      console.error('Update profile error:', error);
      throw new Error(error.message || 'Erro ao atualizar perfil.');
    }
  },

  async deleteAccount(): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/api/users/profile`, {
        method: 'DELETE',
        headers: getAuthHeader(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Não autenticado. Faça login novamente.');
        }
        throw new Error('Erro ao deletar conta.');
      }

      // Clear local storage
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem('nutri_user');
    } catch (error: any) {
      console.error('Delete account error:', error);
      throw new Error(error.message || 'Erro ao deletar conta.');
    }
  },
};
