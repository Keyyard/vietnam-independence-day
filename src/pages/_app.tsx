import React from 'react';
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { LocaleProvider, useLocale } from "../i18n/LocaleContext";

function LangToggle(){
  const { locale, setLocale } = useLocale();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { setMounted(true); }, []);
  // Render a stable placeholder on the server (and during first client render)
  // to avoid hydration mismatches when locale is auto-detected on the client.
  const label = mounted ? (locale === 'en' ? 'VI' : 'EN') : '';
  return (
    <div className="fixed right-4 top-4 z-50">
      <button className="btn-outline" onClick={() => setLocale(locale === 'en' ? 'vi' : 'en')}>
        {label}
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
