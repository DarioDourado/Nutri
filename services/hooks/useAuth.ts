import { useState, useEffect, useCallback } from 'react';
import { AuthService } from '../authService';
import { User } from '@/types/user';
import { getProfile, updateProfile as updateProfileTransporter } from '@/services/transporter/profile';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/services/firebase';

export const useAuth = (onLoginSuccess: () => void) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        try {
          const p = await getProfile(fbUser.uid);
          setUser(p);
        } catch (e) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  const login = useCallback(async (email: string, pass: string) => {
    setIsAuthenticating(true);
    setAuthError(null);
    try {
      const authenticatedUser = await AuthService.signIn(email, pass);
      setUser(authenticatedUser);
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

  const updateUser = useCallback(async (updatedUser: User) => {
    try {
      const result = await updateProfileTransporter(updatedUser.id, updatedUser as Partial<User>);
      setUser(result);
      return result;
    } catch (err) {
      console.error('[useAuth.updateUser] failed to update profile:', err);
      setUser(updatedUser);
      throw err;
    }
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
