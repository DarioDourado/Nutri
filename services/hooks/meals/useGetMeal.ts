import { useEffect, useState, useCallback } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, orderBy, onSnapshot, getDocs } from 'firebase/firestore';
import { Meal } from '@/types/meal';

type UseGetMealResult = {
  meals: Meal[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

export const useGetMeal = (): UseGetMealResult => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uid, setUid] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
        setMeals([]);
        setLoading(false);
      }
    });
    return () => unsubAuth();
  }, []);

  useEffect(() => {
    if (!uid) return;
    setLoading(true);
    setError(null);
    try {
      const db = getFirestore();
      const col = collection(db, 'users', uid, 'meals');
      const q = query(col, orderBy('timestamp', 'desc'));
      const unsub = onSnapshot(
        q,
        (snapshot) => {
          const docs: Meal[] = [];
          snapshot.forEach((d) => {
            const data = d.data() as any;
            docs.push({
              id: d.id,
              description: data.description ?? '',
              timestamp: data.timestamp ?? Date.now(),
              nutrients: data.nutrients ?? { calories: 0, protein: 0, carbs: 0, fat: 0 },
              type: data.type ?? 'lunch',
            });
          });
          setMeals(docs);
          setLoading(false);
        },
        (err) => {
          console.error('[useGetMeal] onSnapshot error:', err);
          setError(err?.message ?? String(err));
          setMeals([]);
          setLoading(false);
        }
      );
      return () => unsub();
    } catch (err: any) {
      console.error('[useGetMeal] error setting listener:', err);
      setError(err?.message ?? String(err));
      setLoading(false);
    }
  }, [uid]);

  const refresh = useCallback(async () => {
    if (!uid) return;
    setLoading(true);
    setError(null);
    try {
      const db = getFirestore();
      const col = collection(db, 'users', uid, 'meals');
      const q = query(col, orderBy('timestamp', 'desc'));
      const snap = await getDocs(q);
      const docs: Meal[] = [];
      snap.forEach((d) => {
        const data = d.data() as any;
        docs.push({
          id: d.id,
          description: data.description ?? '',
          timestamp: data.timestamp ?? Date.now(),
          nutrients: data.nutrients ?? { calories: 0, protein: 0, carbs: 0, fat: 0 },
          type: data.type ?? 'lunch',
        });
      });
      setMeals(docs);
    } catch (err: any) {
      console.error('[useGetMeal] refresh error:', err);
      setError(err?.message ?? String(err));
    } finally {
      setLoading(false);
    }
  }, [uid]);

  return { meals, loading, error, refresh };
};

export default useGetMeal;
