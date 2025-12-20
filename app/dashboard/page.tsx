
import React, { useState, useEffect, useRef } from 'react';
import { Meal, User, Nutrients, Language } from '../../types';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';

interface DashboardPageProps {
  user: User;
  todayMeals: Meal[];
  dailyTotals: Nutrients;
  isAnalyzing: boolean;
  aiAdvice: string;
  onLogMeal: (desc: string) => Promise<any>;
  lang: Language;
  t: any;
}

export default function DashboardPage({ 
  user, todayMeals, dailyTotals, isAnalyzing, aiAdvice, onLogMeal, lang, t
}) {
  const [mealInput, setMealInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

  const progressPercent = Math.min(100, Math.round((dailyTotals.calories / user.dailyCalorieTarget) * 100));

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = lang === 'pt' ? 'pt-PT' : 'en-US';
      recognitionRef.current.onresult = (event: any) => {
        setMealInput((prev) => (prev ? `${prev} ${event.results[0][0].transcript}` : event.results[0][0].transcript));
        setIsRecording(false);
      };
      recognitionRef.current.onend = () => setIsRecording(false);
    }
  }, [lang]);

  const toggleRecording = () => {
    if (!recognitionRef.current) return alert(t.dashboard.speechError);
    isRecording ? recognitionRef.current.stop() : (setIsRecording(true), recognitionRef.current.start());
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mealInput.trim()) {
      try { await onLogMeal(mealInput); setMealInput(''); } catch (err) { alert(t.dashboard.error); }
    }
  };

  const macroData = [
    { name: lang === 'pt' ? 'Proteína' : 'Protein', value: dailyTotals.protein, color: '#10b981' },
    { name: lang === 'pt' ? 'Carboidratos' : 'Carbs', value: dailyTotals.carbs, color: '#3b82f6' },
    { name: lang === 'pt' ? 'Gordura' : 'Fat', value: dailyTotals.fat, color: '#f59e0b' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
      <div className="lg:col-span-2 space-y-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{t.dashboard.welcome}, {user.name}!</h1>
              <p className="text-slate-500">{t.dashboard.progress}</p>
            </div>
            <div className="bg-emerald-50 px-6 py-4 rounded-2xl flex items-center border border-emerald-100">
              <div className="mr-4">
                <p className="text-xs uppercase tracking-wider text-emerald-600 font-bold">{t.dashboard.dailyMeta}</p>
                <p className="text-2xl font-black text-emerald-900">{user.dailyCalorieTarget} kcal</p>
              </div>
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">{progressPercent}%</div>
            </div>
          </div>
          <div className="mt-8 h-4 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            </span>
            {t.dashboard.addMeal}
          </h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="relative">
              <textarea
                className="w-full p-4 pr-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none min-h-[120px]"
                placeholder={t.dashboard.inputPlaceholder}
                value={mealInput}
                onChange={(e) => setMealInput(e.target.value)}
                disabled={isAnalyzing}
              ></textarea>
              <button type="button" onClick={toggleRecording} className={`absolute right-4 top-4 p-3 rounded-full ${isRecording ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-emerald-50 text-emerald-600'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isRecording ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H10a1 1 0 01-1-1v-4z" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />}
                </svg>
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400 italic">{isRecording ? t.dashboard.listening : t.dashboard.tip}</span>
              <button type="submit" disabled={isAnalyzing || !mealInput.trim()} className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-lg disabled:opacity-50">
                {isAnalyzing ? t.dashboard.analyzing : t.dashboard.register}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold mb-6">{t.dashboard.todayMeals}</h2>
          {todayMeals.length === 0 ? <p className="text-center py-12 text-slate-400">{t.dashboard.noMeals}</p> : (
            <div className="space-y-4">
              {todayMeals.map((meal) => (
                <div key={meal.id} className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between hover:bg-emerald-50 transition-colors">
                  <div>
                    <p className="font-semibold text-slate-800 capitalize">{meal.description}</p>
                    <p className="text-sm text-slate-500">{meal.nutrients.calories} kcal</p>
                  </div>
                  <div className="flex gap-2 text-xs font-bold">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg">{meal.nutrients.protein}g P</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg">{meal.nutrients.carbs}g C</span>
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-lg">{meal.nutrients.fat}g F</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold mb-6">{t.dashboard.macros}</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={macroData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {macroData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-8 rounded-3xl shadow-xl text-white">
          <div className="flex items-center mb-4 uppercase tracking-widest text-xs font-bold opacity-80">{t.dashboard.insight}</div>
          <p className="text-lg leading-relaxed italic">"{aiAdvice}"</p>
        </div>
      </div>
    </div>
  );
}
