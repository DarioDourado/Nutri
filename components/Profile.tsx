import React, { useEffect, useState } from 'react';
import { User } from '@/types/user';
import { useGetProfile } from '@/services/hooks/profile/useGetProfile';
import { useUpdateProfile } from '@/services/hooks/profile/useUpdateProfile';
import { useDeleteProfile } from '@/services/hooks/profile/useDeleteProfile';

type Props = { t: any; onLogout?: () => void };

const Profile: React.FC<Props> = ({ t, onLogout }) => {
  const { profile, loading, error, refresh, setProfile } = useGetProfile();
  const { updateProfile, loading: updating, error: updateError } = useUpdateProfile();
  const { deleteProfile, loading: deleting, error: deleteError } = useDeleteProfile();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (profile) setUser(profile);
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!user) return;
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]:
        name === 'dailyCalorieTarget' || name === 'weight' || name === 'height'
          ? Number(value)
          : value,
    } as User);
  };

  const handleSave = async () => {
    if (!user) {
      console.error('[Profile] handleSave: user is null');
      return;
    }
    
    console.log('[Profile] handleSave START');
    console.log('[Profile] user.id:', user.id);
    console.log('[Profile] user data:', JSON.stringify(user, null, 2));
    
    try {
      const updated = await updateProfile(user, user.id);
      console.log('[Profile] handleSave SUCCESS:', updated);
      setProfile && setProfile(updated);
      alert(t?.profile?.saved ?? 'Profile saved successfully!');
    } catch (err: any) {
      console.error('[Profile] handleSave ERROR:', err);
      alert(t?.profile?.saveError ?? 'Failed to save profile');
    }
  };

  const handleDelete = async () => {
    if (!user) return;
    const confirmed = window.confirm(t?.profile?.deleteConfirm ?? 'Are you sure you want to delete your profile?');
    if (!confirmed) return;
    
    try {
      await deleteProfile(user.id);
      alert(t?.profile?.deleted ?? 'Profile deleted successfully!');
      onLogout?.();
    } catch (err: any) {
      console.error('[Profile] handleDelete error:', err);
      alert(t?.profile?.deleteError ?? 'Failed to delete profile');
    }
  };

  if (loading || !user) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center text-slate-500">{t?.profile?.loading ?? 'Loading...'}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center text-red-500">{error}</div>
        <div className="text-center mt-4">
          <button onClick={refresh} className="px-4 py-2 bg-emerald-600 text-white rounded">
            {t?.profile?.retry ?? 'Retry'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="bg-emerald-600 px-8 py-12 text-white">
          <h1 className="text-3xl font-bold">{t.profile.title}</h1>
          <p className="text-emerald-100 mt-2">{t.profile.subtitle}</p>
        </div>

        <div className="p-8 space-y-6">
          {(updateError || deleteError) && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {updateError || deleteError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">{t.profile.name}</label>
              <input
                name="name"
                type="text"
                value={user.name}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">{t.profile.email}</label>
              <input
                name="email"
                type="email"
                value={user.email}
                disabled
                className="w-full p-3 bg-slate-100 border border-slate-200 rounded-xl cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">{t.profile.weight}</label>
              <input
                name="weight"
                type="number"
                value={user.weight}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">{t.profile.height}</label>
              <input
                name="height"
                type="number"
                value={user.height}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">{t.profile.goal}</label>
              <select
                name="goal"
                value={user.goal}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="lose">{t.profile.lose}</option>
                <option value="maintain">{t.profile.maintain}</option>
                <option value="gain">{t.profile.gain}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">{t.profile.calories}</label>
              <input
                name="dailyCalorieTarget"
                type="number"
                value={user.dailyCalorieTarget}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-between">
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-8 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-100 disabled:opacity-50"
            >
              {deleting ? (t?.profile?.deleting ?? 'Deleting...') : (t?.profile?.delete ?? 'Delete Profile')}
            </button>
            <button
              onClick={handleSave}
              disabled={updating}
              className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 disabled:opacity-50"
            >
              {updating ? (t?.profile?.saving ?? 'Saving...') : t.profile.save}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
