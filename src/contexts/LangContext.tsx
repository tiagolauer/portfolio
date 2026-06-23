'use client';

import { createContext, useContext, useState } from 'react';
import { T, type Lang } from '@/i18n/strings';

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof T.en) => string;
}

const LangContext = createContext<LangCtx>({
  lang: 'en',
  setLang: () => {},
  t: (k) => T.en[k],
});

export function LangProvider({
  children,
  initialLang = 'en',
}: {
  children: React.ReactNode;
  initialLang?: Lang;
}) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const t = (key: keyof typeof T.en) => T[lang][key];
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx.lang) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
