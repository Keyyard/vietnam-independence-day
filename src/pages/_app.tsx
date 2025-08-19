import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { LocaleProvider, useLocale } from "../i18n/LocaleContext";

function LangToggle(){
  const { locale, setLocale } = useLocale();
  return (
    <div className="fixed right-4 top-4 z-50">
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
