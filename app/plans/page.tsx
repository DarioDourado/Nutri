
import React from 'react';

interface PlansPageProps {
  t: any;
}

export default function PlansPage({ t }: PlansPageProps) {
  const plans = [
    { title: 'Bulk Clean', desc: 'Foco em ganho de massa magra com alimentos densos.', kcal: 2800, color: 'emerald' },
    { title: 'Cutting Express', desc: 'Déficit calórico controlado para perda de gordura.', kcal: 1800, color: 'blue' },
    { title: 'Manutenção Saudável', desc: 'Estilo de vida equilibrado e energia constante.', kcal: 2200, color: 'teal' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 animate-fade-in">
      <h1 className="text-5xl font-black mb-4 text-center tracking-tighter">{t.plans.title}</h1>
      <p className="text-slate-500 text-center mb-16 max-w-2xl mx-auto text-lg">Planos desenhados pela nossa IA para as tuas necessidades específicas.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {plans.map((p, i) => (
          <div key={i} className="bg-white p-10 rounded-[40px] border border-slate-100 hover:shadow-2xl transition-all group hover:-translate-y-2">
            <div className={`w-14 h-14 bg-${p.color}-50 rounded-2xl mb-8 flex items-center justify-center text-${p.color}-600`}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            </div>
            <h3 className="text-2xl font-black mb-3">{p.title}</h3>
            <p className="text-slate-500 mb-10 leading-relaxed font-medium">{p.desc}</p>
            <div className="flex items-center justify-between pt-8 border-t border-slate-50">
              <span className={`font-black text-xl text-${p.color}-600 tracking-tight`}>{p.kcal} kcal/day</span>
              <button className="text-sm font-black text-slate-400 hover:text-emerald-600 transition-colors uppercase tracking-widest">{t.plans.activate}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
