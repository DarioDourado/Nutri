
import React, { useState, useEffect } from 'react';
import { Page } from '../types';

interface LandingPageProps {
  onGetStarted: () => void;
  t: any;
}

const carouselSlides = [
  {
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1200",
    label: "Fresh & Healthy",
    context: "Salads & Bowls"
  },
  {
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=1200",
    label: "Nutrition Focused",
    context: "Meal Planning"
  },
  {
    image: "https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&q=80&w=1200",
    label: "Daily Progress",
    context: "Macro Tracking"
  },
  {
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1200",
    label: "Natural Ingredients",
    context: "Organic Choices"
  },
  {
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=1200",
    label: "AI Intelligence",
    context: "Smart Analysis"
  }
];

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, t }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);

  return (
    <div className="flex flex-col bg-white overflow-x-hidden">
      
      {/* Cinematic Hero Section */}
      <section className="relative min-h-[95vh] flex items-center pt-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Content Side */}
            <div className="text-left order-2 lg:order-1 animate-fade-in-up">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-widest mb-8 border border-emerald-100">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Nova Versão NutriAi v2.0</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-slate-900 mb-8 leading-[0.95]">
                {t.hero.title.split('{span}')[0]}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400">
                  {t.hero.span}
                </span>
                {t.hero.title.split('{span}')[1]}
              </h1>
              <p className="text-xl text-slate-500 mb-12 leading-relaxed max-w-lg font-medium">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <button 
                  onClick={onGetStarted}
                  className="px-10 py-6 bg-emerald-600 text-white rounded-2xl font-black text-xl shadow-2xl shadow-emerald-200 hover:bg-emerald-700 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center group"
                >
                  {t.hero.cta}
                  <svg className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <button className="px-10 py-6 bg-slate-50 text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-100 transition-all flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  {t.hero.howItWorks}
                </button>
              </div>
              
              <div className="mt-16 grid grid-cols-3 gap-8 border-t border-slate-100 pt-10">
                <div>
                  <p className="text-3xl font-black text-slate-900">50k+</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Utilizadores</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-slate-900">1.2M</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Registos IA</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-slate-900">4.9/5</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Satisfação</p>
                </div>
              </div>
            </div>

            {/* Carousel Side */}
            <div className="relative order-1 lg:order-2">
              <div className="relative h-[500px] md:h-[650px] w-full rounded-[60px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] border-[12px] border-white ring-1 ring-slate-100">
                {carouselSlides.map((slide, index) => (
                  <div 
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-110 z-0'}`}
                  >
                    <img 
                      src={slide.image} 
                      alt={slide.label}
                      className="w-full h-full object-cover transition-transform duration-[6000ms] ease-linear transform hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                    <div className="absolute bottom-10 left-10 text-white animate-fade-in">
                      <p className="text-sm font-bold uppercase tracking-[0.2em] mb-2 text-emerald-400">{slide.label}</p>
                      <h3 className="text-3xl font-black">{slide.context}</h3>
                    </div>
                  </div>
                ))}
                
                {/* Navigation Controls */}
                <div className="absolute bottom-10 right-10 z-20 flex space-x-3">
                  <button onClick={prevSlide} className="p-3 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full hover:bg-white/40 transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
                  </button>
                  <button onClick={nextSlide} className="p-3 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full hover:bg-white/40 transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                  </button>
                </div>
              </div>
              
              {/* Floating Dashboard Widget Preview */}
              <div className="absolute -left-12 bottom-20 z-20 bg-white/95 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border border-slate-100 animate-float hidden xl:block">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 font-black">75%</div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Meta Diária</p>
                    <p className="text-sm font-black text-slate-800">1850 / 2400 kcal</p>
                  </div>
                </div>
              </div>

              {/* Decorative Blur Elements */}
              <div className="absolute -top-10 -right-10 w-80 h-80 bg-emerald-100 rounded-full blur-[100px] opacity-60 -z-10 animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-teal-100 rounded-full blur-[100px] opacity-60 -z-10 animate-pulse delay-1000"></div>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">{t.howItWorks.title}</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">A tecnologia Gemini permite que você fale livremente sobre o que comeu, sem tabelas complexas ou pesquisas infinitas.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: t.howItWorks.step1, desc: t.howItWorks.step1Desc, icon: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z", color: "emerald" },
              { title: t.howItWorks.step2, desc: t.howItWorks.step2Desc, icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z", color: "teal" },
              { title: t.howItWorks.step3, desc: t.howItWorks.step3Desc, icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", color: "blue" }
            ].map((step, i) => (
              <div key={i} className="relative bg-white p-12 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden">
                <div className={`w-16 h-16 bg-${step.color}-50 text-${step.color}-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={step.icon}/></svg>
                </div>
                <h3 className="text-2xl font-black mb-4">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed text-lg">{step.desc}</p>
                <div className="absolute top-0 right-0 p-8 text-6xl font-black text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">0{i+1}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-20">{t.testimonials.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-12 rounded-[48px] border border-slate-100 relative">
              <div className="text-emerald-500 mb-6 flex">
                {[...Array(5)].map((_, i) => <svg key={i} className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
              </div>
              <p className="text-2xl font-bold text-slate-800 leading-snug mb-8">"{t.testimonials.user1}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-emerald-200 rounded-full mr-4"></div>
                <div>
                  <p className="font-black text-slate-900">Ricardo Silva</p>
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Crossfit Athlete</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-12 rounded-[48px] border border-slate-100 relative">
              <div className="text-emerald-500 mb-6 flex">
                {[...Array(5)].map((_, i) => <svg key={i} className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
              </div>
              <p className="text-2xl font-bold text-slate-800 leading-snug mb-8">"{t.testimonials.user2}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-teal-200 rounded-full mr-4"></div>
                <div>
                  <p className="font-black text-slate-900">Marta Ferreira</p>
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Wellness Enthusiast</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Footer */}
      <section className="py-40 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-emerald-500 rounded-full blur-[160px]"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tighter leading-none">
            A sua nova vida<br/><span className="text-emerald-500">começa hoje.</span>
          </h2>
          <button 
            onClick={onGetStarted}
            className="px-16 py-8 bg-emerald-600 text-white rounded-[32px] font-black text-2xl shadow-[0_24px_48px_-12px_rgba(16,185,129,0.5)] hover:bg-emerald-500 transition-all transform hover:scale-105 active:scale-95"
          >
            Começar Gratuitamente
          </button>
          <p className="mt-8 text-slate-500 font-bold uppercase tracking-widest text-sm">Sem cartão de crédito necessário</p>
        </div>
      </section>

      {/* Simplified Footer */}
      <footer className="bg-slate-950 text-slate-400 py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
            <div className="flex items-center">
              <div className="bg-emerald-500 p-2 rounded-xl mr-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <span className="text-3xl font-black text-white tracking-tighter">NutriAi</span>
            </div>
            <div className="flex space-x-12 text-sm font-bold uppercase tracking-widest">
              <a href="#" className="hover:text-emerald-500 transition-colors">Funcionalidades</a>
              <a href="#" className="hover:text-emerald-500 transition-colors">Privacidade</a>
              <a href="#" className="hover:text-emerald-500 transition-colors">Suporte</a>
            </div>
            <div className="text-xs font-medium text-slate-600">
              © 2024 NutriAi Inc. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
