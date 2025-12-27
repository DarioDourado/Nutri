import { useEffect, useState, useCallback } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, onSnapshot, getDoc } from 'firebase/firestore';
import { User } from '@/types/user';

type UseGetProfileResult = {
  profile: User | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  setProfile: (p: User | null) => void;
};

export const useGetProfile = (): UseGetProfileResult => {
  const [profile, setProfileState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uid, setUid] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    console.debug('[useGetProfile] attaching onAuthStateChanged, currentUser:', auth.currentUser);
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      console.debug('[useGetProfile] onAuthStateChanged -> user:', user);
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
        setProfileState(null);
        setLoading(false);
      }
    });
    return () => {
      console.debug('[useGetProfile] detaching onAuthStateChanged');
      unsubAuth();
    };
  }, []);

  useEffect(() => {
    if (!uid) {
      console.debug('[useGetProfile] no uid, skipping onSnapshot');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const db = getFirestore();
      const ref = doc(db, 'users', uid);
      console.debug('[useGetProfile] attaching onSnapshot to', ref.path);
      const unsub = onSnapshot(
        ref,
        (snap) => {
          console.debug('[useGetProfile] onSnapshot snapshot.exists:', snap.exists());
          if (snap.exists()) {
            const data = snap.data() as any;
            const u: User = {
              id: snap.id,
              name: data.name ?? '',
              email: data.email ?? '',
              weight: data.weight ?? 0,
              height: data.height ?? 0,
              goal: data.goal ?? 'maintain',
              dailyCalorieTarget: data.dailyCalorieTarget ?? 0,
            } as User;
            console.debug('[useGetProfile] setProfileState:', u);
            setProfileState(u);
          } else {
            console.debug('[useGetProfile] document does not exist');
            setProfileState(null);
          }
          setLoading(false);
        },
        (err) => {
          console.error('[useGetProfile] onSnapshot error:', err);
          setError(err?.message ?? String(err));
          setLoading(false);
        }
      );
      return () => {
        console.debug('[useGetProfile] detaching onSnapshot');
        unsub();
      };
    } catch (err: any) {
      console.error('[useGetProfile] error setting up snapshot:', err);
      setError(err?.message ?? String(err));
      setLoading(false);
    }
  }, [uid]);

  const refresh = useCallback(async () => {
    if (!uid) {
      console.debug('[useGetProfile] refresh called but no uid');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const db = getFirestore();
      console.debug('[useGetProfile] refresh fetching doc users/', uid);
      const snap = await getDoc(doc(db, 'users', uid));
      if (snap.exists()) {
        const data = snap.data() as any;
        const u: User = {
          id: snap.id,
          name: data.name ?? '',
          email: data.email ?? '',
          weight: data.weight ?? 0,
          height: data.height ?? 0,
          goal: data.goal ?? 'maintain',
          dailyCalorieTarget: data.dailyCalorieTarget ?? 0,
        } as User;
        console.debug('[useGetProfile] refresh setProfileState:', u);
        setProfileState(u);
      } else {
        console.debug('[useGetProfile] refresh doc does not exist');
        setProfileState(null);
      }
    } catch (err: any) {
      console.error('[useGetProfile] refresh error:', err);
      setError(err?.message ?? String(err));
    } finally {
      setLoading(false);
    }
  }, [uid]);

  // setProfile apenas atualiza o estado local (o seu useUpdateProfile já faz persistência)
  const setProfile = useCallback((p: User | null) => {
    console.debug('[useGetProfile] setProfile (local) called:', p);
    setProfileState(p);
  }, []);

  return { profile, loading, error, refresh, setProfile };
};

export default useGetProfile;