
import React from 'react';
import { LoginPageProps } from '@/types/login';


export default function LoginPage({ login, isAuthenticating, authError, t }: LoginPageProps) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="bg-white p-12 rounded-[48px] shadow-2xl max-w-md w-full border border-slate-50 text-center animate-fade-in-up">
        <h2 className="text-3xl font-black text-slate-900 mb-3">{t.login.welcome}</h2>
        <form className="space-y-4" onSubmit={(e) => {
          e.preventDefault();
          const email = (document.getElementById('login-email') as HTMLInputElement).value;
          const pass = (document.getElementById('login-pass') as HTMLInputElement).value;
          login(email, pass);
        }}>
          <input id="login-email" type="email" placeholder={t.login.email} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl" required />
          <input id="login-pass" type="password" placeholder={t.login.password} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl" required />
          {authError && <p className="text-red-500 text-sm font-bold">{authError}</p>}
          <button type="submit" disabled={isAuthenticating} className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg">
            {isAuthenticating ? t.login.entering : t.login.enter}
          </button>
        </form>
      </div>
    </div>
  );
}
