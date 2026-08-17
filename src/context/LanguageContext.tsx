import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Translation, translations } from '@/types';

interface LanguageContextValue {
  language: Language;
  t: Translation;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('vnb-lang');
    if (saved === 'en' || saved === 'es' || saved === 'zh') return saved;
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('vnb-lang', language);
  }, [language]);

  const value: LanguageContextValue = {
    language,
    t: translations[language],
    setLanguage,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
