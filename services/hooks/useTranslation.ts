
import { useState, useEffect, useCallback } from 'react';
import { Language } from '../../types';
import { translations } from '../translations';

export const useTranslation = () => {
  const [lang, setLang] = useState<Language>('pt');

  useEffect(() => {
    const savedLang = localStorage.getItem('nutriai_lang') as Language;
    if (savedLang && (savedLang === 'pt' || savedLang === 'en')) {
      setLang(savedLang);
    }
  }, []);

  const changeLanguage = useCallback((newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('nutriai_lang', newLang);
  }, []);

  const t = translations[lang];

  return { lang, changeLanguage, t };
};
