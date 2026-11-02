import { createContext, useContext, useEffect, useState } from 'react'
import { load, save } from './storage.js'

const LangContext = createContext({ lang: 'sw', setLang: () => {}, t: (sw) => sw, tx: (o) => o?.sw })

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => load('lang', 'sw'))
  useEffect(() => { save('lang', lang); document.documentElement.lang = lang }, [lang])
  const t = (sw, en) => (lang === 'en' ? en : sw)
  const tx = (o) => (o ? o[lang] ?? o.sw : '')
  return <LangContext.Provider value={{ lang, setLang, t, tx }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
