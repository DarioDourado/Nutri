
import { useState, useEffect, useCallback } from 'react';
import { User } from '../../types';
import { AuthService } from '../authService';

export const useAuth = (onLoginSuccess: () => void) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('nutriai_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, pass: string) => {
    setIsAuthenticating(true);
    setAuthError(null);
    try {
      const authenticatedUser = await AuthService.signIn(email, pass);
      setUser(authenticatedUser);
      localStorage.setItem('nutriai_user', JSON.stringify(authenticatedUser));
      onLoginSuccess();
    } catch (error: any) {
      setAuthError(error.message || "Erro ao tentar entrar.");
    } finally {
      setIsAuthenticating(false);
    }
  }, [onLoginSuccess]);

  const logout = useCallback(async () => {
    setIsAuthenticating(true);
    try {
      await AuthService.signOut();
      setUser(null);
    } catch (error) {
      console.error("Erro ao sair:", error);
    } finally {
      setIsAuthenticating(false);
    }
  }, []);

  const updateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('nutriai_user', JSON.stringify(updatedUser));
  }, []);

  return { 
    user, 
    login, 
    logout, 
    updateUser, 
    isLoading, 
    isAuthenticating, 
    authError 
  };
};
