import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { User } from '@/types/user';

export const getProfile = async (uid: string): Promise<User | null> => {
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as User;
};

export const updateProfile = async (uid: string, data: Partial<User>): Promise<User> => {
  
  const ref = doc(db, 'users', uid);
  
  const { id, ...updateData } = data as User;
  
  await setDoc(ref, updateData, { merge: true });
    
  const snap = await getDoc(ref);
  return { id: snap.id, ...snap.data() } as User;
};