
import { ProfileProps } from '@/types/profile';
import React from 'react';


export default function ProfilePage({ user, onUpdateUser, t }: ProfileProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onUpdateUser({
      ...user,
      [name]: name === 'dailyCalorieTarget' || name === 'weight' || name === 'height' ? Number(value) : value
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 animate-fade-in-up">
      <div className="bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden">
        <div className="bg-emerald-600 px-8 py-16 text-white">
          <h1 className="text-4xl font-black tracking-tight">{t.profile.title}</h1>
          <p className="text-emerald-100 mt-2 text-lg">{t.profile.subtitle}</p>
        </div>
        <div className="p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">{t.profile.name}</label>
              <input name="name" type="text" value={user.name} onChange={handleChange} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">{t.profile.email}</label>
              <input type="email" value={user.email} disabled className="w-full p-4 bg-slate-100 border border-slate-200 rounded-2xl cursor-not-allowed text-slate-500" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">{t.profile.weight}</label>
              <input name="weight" type="number" value={user.weight} onChange={handleChange} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">{t.profile.height}</label>
              <input name="height" type="number" value={user.height} onChange={handleChange} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">{t.profile.goal}</label>
              <select name="goal" value={user.goal} onChange={handleChange} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none">
                <option value="lose">{t.profile.lose}</option>
                <option value="maintain">{t.profile.maintain}</option>
                <option value="gain">{t.profile.gain}</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">{t.profile.calories}</label>
              <input name="dailyCalorieTarget" type="number" value={user.dailyCalorieTarget} onChange={handleChange} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl" />
            </div>
          </div>
          <div className="pt-8 border-t border-slate-50 flex justify-end">
            <button className="px-12 py-4 bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95">
              {t.profile.save}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
