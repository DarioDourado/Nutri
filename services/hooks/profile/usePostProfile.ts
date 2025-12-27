import { useState, useCallback } from 'react';
import { User } from '@/types/user';
import { updateProfile } from '@/services/transporter/profile';

export const usePostProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postProfile = useCallback(async (data: Partial<User>, uid?: string) => {
    setLoading(true);
    setError(null);
    try {
      const userId = uid ?? (data as User).id;
      if (!userId) throw new Error('No uid provided for updateProfile');
      const updated = await updateProfile(userId, data);
      return updated;
    } catch (err: any) {
      setError(err?.message ?? String(err));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { postProfile, loading, error };
};