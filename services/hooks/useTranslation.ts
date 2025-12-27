import { useState, useEffect } from 'react';
import ptTranslations from '../../locales/pt.json';
import enTranslations from '../../locales/en.json';

type Lang = 'pt' | 'en';

interface Translations {
  [key: string]: any;
}

const translations: Record<Lang, Translations> = {
  pt: ptTranslations,
  en: enTranslations
};

export const useTranslation = () => {
  const [lang, setLang] = useState<Lang>(() => {
    const stored = localStorage.getItem('lang');
    return (stored === 'pt' || stored === 'en') ? stored : 'pt';
  });

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const changeLanguage = (newLang: Lang) => {
    setLang(newLang);
  };

  return {
    lang,
    changeLanguage,
    t: translations[lang]
  };
};
