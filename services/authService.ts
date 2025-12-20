
import { authTransporter } from "./transporter/auth";
import { User } from "../types";

/**
 * AuthService
 * Higher-level service for handling authentication business logic.
 */
export const AuthService = {
  async signIn(email: string, pass: string): Promise<User> {
    try {
      const user = await authTransporter.login(email, pass);
      // Here we could handle additional logic like setting cookies or analytics
      return user;
    } catch (error) {
      console.error("AuthService SignIn Error:", error);
      throw error;
    }
  },

  async signUp(userData: Partial<User>, pass: string): Promise<User> {
    try {
      return await authTransporter.register(userData, pass);
    } catch (error) {
      console.error("AuthService SignUp Error:", error);
      throw error;
    }
  },

  async signOut(): Promise<void> {
    try {
      await authTransporter.logout();
      localStorage.removeItem('nutriai_user');
    } catch (error) {
      console.error("AuthService SignOut Error:", error);
      throw error;
    }
  }
};
