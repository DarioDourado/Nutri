
import React from 'react';
import { User } from '../types';

interface ProfileProps {
  user: User;
  onUpdateUser: (user: User) => void;
  t: any;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdateUser, t }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onUpdateUser({
      ...user,
      [name]: name === 'dailyCalorieTarget' || name === 'weight' || name === 'height' ? Number(value) : value
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="bg-emerald-600 px-8 py-12 text-white">
          <h1 className="text-3xl font-bold">{t.profile.title}</h1>
          <p className="text-emerald-100 mt-2">{t.profile.subtitle}</p>
        </div>
        
        <div className="p-8 space-y-6">
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
          
          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <button className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">
              {t.profile.save}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
