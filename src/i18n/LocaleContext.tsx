import React from 'react';
import { locales, LocaleKey } from './locales';

type LocaleContextValue = {
  locale: LocaleKey;
  t: (key: string) => string;
  setLocale: (l: LocaleKey) => void;
};

const defaultLocale: LocaleKey = 'en';

const LocaleContext = React.createContext<LocaleContextValue>({
  locale: defaultLocale,
  t: (k: string) => k,
  setLocale: () => {},
});

export function LocaleProvider({ children }:{children:React.ReactNode}){
  const [locale, setLocaleState] = React.useState<LocaleKey>(() => {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('locale') : null;
      return (stored as LocaleKey) ?? defaultLocale;
    } catch { return defaultLocale; }
  });

  const setLocale = (l: LocaleKey) => {
    setLocaleState(l);
    try { localStorage.setItem('locale', l); } catch {}
  };

  React.useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      // only auto-detect if the user hasn't previously selected a locale
      const stored = localStorage.getItem('locale');
      if (stored) return;
      const nav = (navigator.languages && navigator.languages[0]) || (navigator.language) || '';
      const detected: LocaleKey = nav.startsWith('vi') ? 'vi' : 'en';
      setLocale(detected);
    } catch {
      // ignore
    }
  }, []);

  const t = React.useCallback((key: string) => {
    return locales[locale]?.[key] ?? locales[defaultLocale][key] ?? key;
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(){
  return React.useContext(LocaleContext);
}

export default LocaleContext;
