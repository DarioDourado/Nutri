import React from 'react';
import { usePathname, Link } from '@/services/navigation';
import { NavbarProps } from '@/types/navbar';


const Navbar: React.FC<NavbarProps> = ({ user, onLogout, lang, onLangChange, t }) => {
  const pathname = usePathname();

  const langLabels = (t && t.lang) ? t.lang : { pt: 'PT', en: 'EN' };
  const transl = t ?? {};

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link 
            href={user ? "/dashboard" : "/"} 
            className="flex items-center group"
          >
            <div className="bg-emerald-500 p-2 rounded-xl mr-3 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-100">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent tracking-tighter">
              {t.brand}
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {user ? (
              <>
                <Link 
                  href="/dashboard"
                  className={`${pathname === '/dashboard' ? 'text-emerald-600 bg-emerald-50' : 'text-slate-500 hover:text-emerald-500 hover:bg-slate-50'} font-bold transition-all px-4 py-2 rounded-xl`}
                >
                  {t.nav.dashboard}
                </Link>
                <Link 
                  href="/plans"
                  className={`${pathname === '/plans' ? 'text-emerald-600 bg-emerald-50' : 'text-slate-500 hover:text-emerald-500 hover:bg-slate-50'} font-bold transition-all px-4 py-2 rounded-xl`}
                >
                  {t.nav.plans}
                </Link>
                <Link 
                  href="/profile"
                  className={`${pathname === '/profile' ? 'text-emerald-600 bg-emerald-50' : 'text-slate-500 hover:text-emerald-500 hover:bg-slate-50'} font-bold transition-all px-4 py-2 rounded-xl`}
                >
                  {t.nav.profile}
                </Link>
              </>
            ) : (
              <>
                <Link href="/" className="text-slate-500 hover:text-emerald-500 font-bold px-4 py-2">{t.nav.home}</Link>
                <Link href="/contact" className="text-slate-500 hover:text-emerald-500 font-bold px-4 py-2">{t.nav.contacts}</Link>
              </>
            )}
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex bg-slate-100/50 backdrop-blur p-1 rounded-xl border border-slate-200">
              <button 
                onClick={() => onLangChange('pt')}
                className={`px-3 py-1.5 text-xs font-black rounded-lg transition-all ${lang === 'pt' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {langLabels.pt}
              </button>
              <button 
                onClick={() => onLangChange('en')}
                className={`px-3 py-1.5 text-xs font-black rounded-lg transition-all ${lang === 'en' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {langLabels.en}
              </button>
            </div>
            
            {user ? (
              <div className="flex items-center gap-4">
                <div className="hidden lg:block text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{t.nav.hello}</p>
                  <p className="text-sm font-black text-slate-800 leading-none">{user.name}</p>
                </div>
                <button 
                  onClick={onLogout}
                  className="bg-slate-900 text-white hover:bg-slate-800 px-6 py-2.5 rounded-xl text-sm font-black transition-all shadow-lg active:scale-95"
                >
                  {t.nav.logout}
                </button>
              </div>
            ) : (
              <Link 
                href="/login"
                className="bg-emerald-600 text-white hover:bg-emerald-700 px-8 py-2.5 rounded-xl font-black shadow-xl shadow-emerald-100 transition-all active:scale-95"
              >
                {t.nav.login}
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
