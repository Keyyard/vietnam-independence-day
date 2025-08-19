import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { LocaleProvider, useLocale } from "../i18n/LocaleContext";

function LangToggle(){
  const { locale, setLocale } = useLocale();
  return (
    <div style={{ position: 'fixed', right: 12, top: 12, zIndex: 999 }}>
      <button className="btn-outline" onClick={() => setLocale(locale === 'en' ? 'vi' : 'en')}>
        {locale === 'en' ? 'VI' : 'EN'}
      </button>
    </div>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LocaleProvider>
      <LangToggle />
      <Component {...pageProps} />
    </LocaleProvider>
  );
}
