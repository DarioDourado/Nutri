
import React, { useState, useEffect } from 'react';
import { useRouter } from '../services/navigation';
import { HomePageProps } from '@/types/home';

// SEO metadata for the public homepage
export const metadata = {
  title: 'Nutri — Alimentação Inteligente',
  description: 'Nutri ajuda a registar refeições, acompanhar macronutrientes e alcançar objetivos com recomendações inteligentes.',
  keywords: ['nutri', 'nutrição', 'refeições', 'calorias', 'macronutrientes', 'IA', 'plano alimentar'],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Nutri — Alimentação Inteligente',
    description: 'Regista refeições, acompanha macros e recebe recomendações personalizadas com IA.',
    url: 'https://example.com',
    siteName: 'Nutri'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nutri — Alimentação Inteligente',
    description: 'Regista refeições e alcança os teus objetivos com recomendações baseadas em IA.'
  },
  alternates: { canonical: 'https://example.com' }
};


const carouselSlides = [
  { image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1200", label: "Fresh & Healthy", context: "Salads & Bowls" },
  { image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=1200", label: "Nutrition Focused", context: "Meal Planning" },
  { image: "https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&q=80&w=1200", label: "Daily Progress", context: "Macro Tracking" },
  { image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1200", label: "Natural Ingredients", context: "Organic Choices" },
  { image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=1200", label: "AI Intelligence", context: "Smart Analysis" }
];

export default function HomePage({ t }: HomePageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div role="main" aria-labelledby="home-heading" className="flex flex-col bg-white overflow-x-hidden">
      <section className="relative min-h-[95vh] flex items-center pt-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-left animate-fade-in-up">
              <h1 id="home-heading" className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-slate-900 mb-8 leading-[0.95]">
                {t.hero.title.split('{span}')[0]}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400">{t.hero.span}</span>
                {t.hero.title.split('{span}')[1]}
              </h1>
              <p className="text-xl text-slate-500 mb-12 leading-relaxed max-w-lg font-medium">{t.hero.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-5">
                <button onClick={() => router.push('/login')} className="px-10 py-6 bg-emerald-600 text-white rounded-2xl font-black text-xl shadow-2xl shadow-emerald-200 hover:bg-emerald-700 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center group">
                  {t.hero.cta}
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[500px] md:h-[650px] w-full rounded-[60px] overflow-hidden shadow-2xl border-[12px] border-white">
                {carouselSlides.map((slide, index) => (
                  <div key={index} className={`absolute inset-0 transition-all duration-1000 ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}>
                    <img src={slide.image} className="w-full h-full object-cover" alt={slide.label} />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JSON-LD structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": "https://example.com/#website",
              "url": "https://example.com",
              "name": "Nutri",
              "description": "Regista refeições, acompanha macros e recebe recomendações personalizadas com IA.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://example.com/?s={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            },
            {
              "@type": "Organization",
              "@id": "https://example.com/#organization",
              "name": "Nutri",
              "url": "https://example.com",
              "contactPoint": [{
                "@type": "ContactPoint",
                "email": "suporte@nutriai.pt",
                "contactType": "customer support",
                "availableLanguage": ["Portuguese", "English"]
              }]
            },
            {
              "@type": "WebPage",
              "@id": "https://example.com/#webpage",
              "url": "https://example.com",
              "name": "Nutri — Alimentação Inteligente",
              "isPartOf": { "@id": "https://example.com/#website" }
            }
          ]
        }) }}
      />
    </div>
  );
}
