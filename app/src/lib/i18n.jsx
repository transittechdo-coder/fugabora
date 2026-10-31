import { createContext, useContext, useEffect, useState } from 'react'
import { load, save } from './storage.js'

const LangCtx = createContext({ lang: 'sw', setLang: () => {}, t: (o) => o?.sw })

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => load('lang', 'sw'))
  useEffect(() => {
    save('lang', lang)
    document.documentElement.lang = lang
  }, [lang])
  // t() accepts {sw, en} objects or a plain string
  const t = (o) => (o == null ? '' : typeof o === 'string' ? o : o[lang] ?? o.sw)
  return <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>
}

export const useLang = () => useContext(LangCtx)

// UI strings
export const S = {
  appTag: { sw: 'Msaidizi wa afya ya mifugo', en: 'Animal health helper' },
  home: { sw: 'Mwanzo', en: 'Home' },
  check: { sw: 'Kagua dalili', en: 'Check symptoms' },
  diseases: { sw: 'Magonjwa', en: 'Diseases' },
  feeding: { sw: 'Lishe', en: 'Feeding' },
  myAnimals: { sw: 'Mifugo yangu', en: 'My animals' },
  about: { sw: 'Kuhusu', en: 'About' },
  callVet: { sw: 'Mwite daktari wa mifugo sasa', en: 'Call a vet now' },
  possible: { sw: 'Magonjwa yanayowezekana', en: 'Possible diseases' },
  notDiagnosis: { sw: 'Haya ni magonjwa yanayowezekana tu, si uchunguzi rasmi. Daktari wa mifugo ndiye anayethibitisha.', en: 'These are possible diseases only, not a diagnosis. A vet confirms.' },
  firstAid: { sw: 'Fanya sasa', en: 'Do this now' },
  prevention: { sw: 'Kinga', en: 'Prevention' },
  zoonotic: { sw: 'Huambukiza binadamu', en: 'Spreads to people' },
  notifiable: { sw: 'Lazima kuripotiwa', en: 'Must be reported' },
  levels: {
    red: { sw: 'Hatari', en: 'Emergency' },
    amber: { sw: 'Juu', en: 'High' },
    green: { sw: 'Wastani', en: 'Medium' },
  },
  conf: {
    high: { sw: 'Uwezekano mkubwa', en: 'Strong match' },
    medium: { sw: 'Uwezekano wa kati', en: 'Possible match' },
    low: { sw: 'Uwezekano mdogo', en: 'Weak match' },
  },
  back: { sw: 'Rudi', en: 'Back' },
  next: { sw: 'Endelea', en: 'Next' },
  startOver: { sw: 'Anza upya', en: 'Start over' },
  search: { sw: 'Tafuta ugonjwa au jina la kienyeji', en: 'Search a disease or local name' },
  comingSoon: { sw: 'Inakuja', en: 'Coming soon' },
  reviewNote: { sw: 'Taarifa hizi bado zinakaguliwa na daktari wa mifugo.', en: 'This information is still being reviewed by a vet.' },
}
