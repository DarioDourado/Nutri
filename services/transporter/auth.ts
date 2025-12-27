/**
 * Auth Transporter
 * Simulates network requests to an authentication provider (e.g., Firebase, Auth0, or custom API).
 */

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as fbSignOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/services/firebase';
import { User } from '@/types/user';

export const authTransporter = {
  async login(email: string, pass: string): Promise<User> {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      const uid = cred.user.uid;
      const snap = await getDoc(doc(db, 'users', uid));
      if (!snap.exists()) throw new Error('Profile not found');
      return snap.data() as User;
    } catch (err: any) {
      console.error('[authTransporter.login] error', err.code, err.message, err);
      throw err;
    }
  },

  async register(userData: Partial<User>, pass: string): Promise<User> {
    const cred = await createUserWithEmailAndPassword(auth, userData.email || '', pass);
    const uid = cred.user.uid;
    const userDoc: User = {
      id: uid,
      email: userData.email || '',
      name: userData.name || '',
      weight: userData.weight ?? 0,
      height: userData.height ?? 0,
      goal: userData.goal ?? 'maintain',
      dailyCalorieTarget: userData.dailyCalorieTarget ?? 2000,
    };
    await setDoc(doc(db, 'users', uid), userDoc);
    return userDoc;
  },

  async logout(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  },

  signUp: async (email: string, password: string, profileData: Partial<User>) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;
    const userDoc: User = { id: uid, email, name: profileData.name ?? '', weight: profileData.weight ?? 0, height: profileData.height ?? 0, goal: profileData.goal ?? 'maintain', dailyCalorieTarget: profileData.dailyCalorieTarget ?? 2000 };
    await setDoc(doc(db, 'users', uid), userDoc);
    return userDoc;
  },

  signIn: async (email: string, password: string) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;
    const snap = await getDoc(doc(db, 'users', uid));
    return snap.exists() ? (snap.data() as User) : null;
  },

  signOut: () => fbSignOut(auth),
};
