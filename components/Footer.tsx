
import React from 'react';
import { Link } from '../services/navigation';

interface FooterProps {
  t: any;
}

const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center mb-6">
              <div className="bg-emerald-500 p-2 rounded-xl mr-3 shadow-lg shadow-emerald-500/20">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-2xl font-black text-white tracking-tighter">NutriAi</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-500 font-medium">
              Transformando a nutrição através da inteligência artificial e linguagem natural. O seu corpo, os seus objetivos, a nossa tecnologia.
            </p>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-6">{t.nav.home}</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li><Link href="/dashboard" className="hover:text-emerald-500 transition-colors">{t.nav.dashboard}</Link></li>
              <li><Link href="/plans" className="hover:text-emerald-500 transition-colors">{t.nav.plans}</Link></li>
              <li><Link href="/profile" className="hover:text-emerald-500 transition-colors">{t.nav.profile}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-6">{t.footer.support}</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li><Link href="/contact" className="hover:text-emerald-500 transition-colors">{t.nav.contacts}</Link></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Blog Nutrição</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-6">{t.footer.legal}</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li><a href="#" className="hover:text-emerald-500 transition-colors">{t.footer.privacy}</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">{t.footer.terms}</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs font-bold uppercase tracking-widest text-slate-600">
          <p>© 2024 NutriAi Inc. {t.footer.rights}</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
