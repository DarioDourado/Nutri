import { useCallback, useState } from 'react';
import { auth } from '@/services/firebase';
import { updateProfile as updateProfileTransporter } from '@/services/transporter/profile';
import { User } from '@/types/user';

export const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = useCallback(async (data: Partial<User>, uid?: string): Promise<User> => {
    const userId = uid || auth.currentUser?.uid;
    
    if (!userId) {
      throw new Error('No authenticated user');
    }

    setLoading(true);
    setError(null);
    
    try {
      // Chama diretamente o transporter do Firestore
      const result = await updateProfileTransporter(userId, data);
      console.log('[useUpdateProfile] result:', result);
      return result;
    } catch (err: any) {
      console.error('[useUpdateProfile] error:', err);
      setError(err?.message ?? String(err));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { updateProfile, loading, error };
};