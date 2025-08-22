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
  // Start with the default locale on the server to ensure SSR output is stable.
  const [locale, setLocaleState] = React.useState<LocaleKey>(defaultLocale);

  const setLocale = (l: LocaleKey) => {
    setLocaleState(l);
    // persist selection only on the client
    if (typeof window !== 'undefined') {
      try { localStorage.setItem('locale', l); } catch {}
    }
  };

  React.useEffect(() => {
    try {
      // only run client-side: attempt to read stored locale or detect from navigator
      const stored = typeof window !== 'undefined' ? localStorage.getItem('locale') : null;
      if (stored) {
        setLocaleState(stored as LocaleKey);
        return;
      }
      const nav = (typeof navigator !== 'undefined' && ((navigator.languages && navigator.languages[0]) || navigator.language)) || '';
      const detected: LocaleKey = String(nav).startsWith('vi') ? 'vi' : 'en';
      setLocaleState(detected);
    } catch {
      // ignore client-side detection errors
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
