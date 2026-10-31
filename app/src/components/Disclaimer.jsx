import { useState } from 'react'
import { useLang } from '../lib/i18n.jsx'
import { load, save } from '../lib/storage.js'
import Icon from './Icon.jsx'

export default function Disclaimer() {
  const { t, lang, setLang } = useLang()
  const [ok, setOk] = useState(() => load('agreed', false))
  if (ok) return null
  return (
    <div className="modal-wrap" role="dialog" aria-modal="true" aria-labelledby="disc-title">
      <div className="modal glass-strong">
        <div className="modal-icon"><Icon name="shield" size={28} /></div>
        <h2 id="disc-title">{t({ sw: 'Karibu FugaBora', en: 'Welcome to FugaBora' })}</h2>
        <p>
          {t({
            sw: 'FugaBora ni chombo cha ushauri kinachokusaidia kutambua magonjwa yanayowezekana kwa mifugo na wanyama wa nyumbani.',
            en: 'FugaBora is an advisory tool that helps you spot possible diseases in livestock and pets.',
          })}
        </p>
        <ul>
          <li>{t({ sw: 'Haitoi uchunguzi rasmi wala haichukui nafasi ya daktari wa mifugo.', en: 'It does not give a formal diagnosis or replace a vet.' })}</li>
          <li>{t({ sw: 'Haitoi vipimo vya dawa. Dawa zote kupitia daktari au agrovet.', en: 'It never gives drug doses. All medicine goes through a vet or agro-vet.' })}</li>
          <li>{t({ sw: 'Ikionyesha dalili za hatari, mwite daktari mara moja.', en: 'If it shows danger signs, call a vet at once.' })}</li>
          <li>{t({ sw: 'Taarifa zako zinabaki kwenye simu yako.', en: 'Your records stay on your phone.' })}</li>
        </ul>
        <div className="row gap">
          <div className="lang" role="group" aria-label="Language">
            <button type="button" aria-pressed={lang === 'sw'} onClick={() => setLang('sw')}>Kiswahili</button>
            <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>English</button>
          </div>
          <button
            type="button"
            className="btn primary grow"
            onClick={() => {
              save('agreed', true)
              setOk(true)
            }}
          >
            {t({ sw: 'Nimeelewa, endelea', en: 'I understand, continue' })}
          </button>
        </div>
      </div>
    </div>
  )
}
