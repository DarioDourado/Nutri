import { useState, useCallback } from 'react';
import { Meal } from '@/types/meal';
import { addMeal } from '@/services/transporter/meals';


export const usePostMeal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postMeal = useCallback(async (data: Partial<Meal>, uid?: string) => {
    setLoading(true);
    setError(null);
    try {
      const userId = uid;
      if (!userId) throw new Error('No uid provided for addMeal');
      const created = await addMeal(userId, data);
      return created;
    } catch (err: any) {
      setError(err?.message ?? String(err));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { postMeal, loading, error };
};

export default usePostMeal;
