
import React from 'react';

interface ContactPageProps {
  t: any;
}

export default function ContactPage({ t }: ContactPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="text-6xl font-black mb-6 tracking-tighter text-slate-900">{t.nav.contacts}</h1>
          <p className="text-xl text-slate-500 mb-8 leading-relaxed">Tens dúvidas sobre o teu plano ou como a nossa IA funciona? A nossa equipa está aqui para ajudar.</p>
          <div className="space-y-8">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-[24px] flex items-center justify-center shadow-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Email Comercial</p>
                <p className="text-xl font-bold text-slate-800">suporte@nutriai.pt</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-12 rounded-[48px] border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Nome</label>
              <input type="text" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Email</label>
              <input type="email" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Mensagem</label>
              <textarea className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl h-32 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none resize-none"></textarea>
            </div>
            <button className="w-full py-6 bg-slate-900 text-white rounded-2xl font-black text-xl shadow-2xl hover:bg-slate-800 transition-all active:scale-95">Enviar Mensagem</button>
          </form>
        </div>
      </div>
    </div>
  );
}
