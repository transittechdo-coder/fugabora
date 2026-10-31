import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang, S } from '../lib/i18n.jsx'
import { load, save, uid } from '../lib/storage.js'
import { ANIMALS, animalById } from '../data/animals.js'
import { VACCINES } from '../data/care.js'
import { diseaseById } from '../data/diseases.js'
import { upcoming, ageText } from '../lib/reminders.js'
import Icon from '../components/Icon.jsx'

const SPECIES = ANIMALS.filter((a) => VACCINES[a.id])
const fmt = (d, lang) => d.toLocaleDateString(lang === 'sw' ? 'sw-TZ' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

export default function MyAnimals() {
  const { t, lang } = useLang()
  const [list, setList] = useState(() => load('animals', []))
  const [form, setForm] = useState({ name: '', species: 'cattle', birth: '', count: 1 })
  const [err, setErr] = useState('')
  const [confirmId, setConfirmId] = useState(null)
  const history = load('history', [])

  const persist = (next) => {
    setList(next)
    save('animals', next)
  }

  const add = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return setErr(t({ sw: 'Andika jina au namba ya mnyama/kundi.', en: 'Enter a name or tag for the animal or group.' }))
    if (!form.birth) return setErr(t({ sw: 'Chagua tarehe ya kuzaliwa (au makadirio).', en: 'Choose a birth date (or an estimate).' }))
    if (new Date(form.birth) > new Date()) return setErr(t({ sw: 'Tarehe haiwezi kuwa ya baadaye.', en: 'The date cannot be in the future.' }))
    persist([{ ...form, name: form.name.trim(), id: uid(), added: new Date().toISOString() }, ...list])
    setForm({ ...form, name: '', birth: '', count: 1 })
    setErr('')
  }

  const all = useMemo(
    () =>
      list
        .flatMap((r) => upcoming(r, 12).map((e) => ({ ...e, rec: r })))
        .sort((a, b) => a.date - b.date)
        .slice(0, 8),
    [list],
  )

  return (
    <>
      <div className="page-head">
        <h1 className="h1">{t(S.myAnimals)}</h1>
        <p className="sub">{t({ sw: 'Andika mifugo yako. FugaBora itakuonyesha chanjo na huduma zinazokuja. Taarifa zinabaki kwenye simu yako.', en: 'Record your animals. FugaBora shows upcoming vaccines and care. Records stay on your phone.' })}</p>
      </div>

      <div className="cols">
        <form className="glass panel" onSubmit={add} noValidate>
          <h2><Icon name="plus" /> {t({ sw: 'Ongeza mnyama au kundi', en: 'Add an animal or group' })}</h2>
          <label className="field">
            <span>{t({ sw: 'Jina au namba', en: 'Name or tag' })}</span>
            <input id="ma-name" value={form.name} onChange={(e) => { setForm({ ...form, name: e.target.value }); setErr('') }} placeholder={t({ sw: 'Mf. Bahati, au Kuku banda 1', en: 'e.g. Bahati, or Coop 1' })} />
          </label>
          <label className="field">
            <span>{t({ sw: 'Aina', en: 'Species' })}</span>
            <select id="ma-species" value={form.species} onChange={(e) => setForm({ ...form, species: e.target.value })}>
              {SPECIES.map((a) => (
                <option key={a.id} value={a.id}>{t(a)}</option>
              ))}
            </select>
          </label>
          <div className="row gap">
            <label className="field grow">
              <span>{t({ sw: 'Tarehe ya kuzaliwa', en: 'Birth date' })}</span>
              <input id="ma-birth" type="date" value={form.birth} max={new Date().toISOString().slice(0, 10)} onChange={(e) => { setForm({ ...form, birth: e.target.value }); setErr('') }} />
            </label>
            <label className="field" style={{ maxWidth: 120 }}>
              <span>{t({ sw: 'Idadi', en: 'Count' })}</span>
              <input id="ma-count" type="number" min="1" inputMode="numeric" value={form.count} onChange={(e) => setForm({ ...form, count: Math.max(1, Number(e.target.value) || 1) })} />
            </label>
          </div>
          {err && <p className="error" role="alert">{err}</p>}
          <button className="btn primary" type="submit">{t({ sw: 'Hifadhi', en: 'Save' })}</button>
        </form>

        <section className="glass panel">
          <h2><Icon name="bell" /> {t({ sw: 'Zinazokuja (wiki 12)', en: 'Coming up (12 weeks)' })}</h2>
          {all.length === 0 ? (
            <p className="muted">{t({ sw: 'Ongeza mnyama kuona ratiba ya chanjo na dawa ya minyoo.', en: 'Add an animal to see its vaccine and deworming schedule.' })}</p>
          ) : (
            <ul className="events">
              {all.map((e, i) => (
                <li key={i} className={e.overdue ? 'late' : ''}>
                  <span className="date num">{fmt(e.date, lang)}</span>
                  <span>
                    <b>{t(e.name)}</b> · {e.rec.name}
                    {e.note && <small className="muted"> ({t(e.note)})</small>}
                  </span>
                  {e.overdue && <span className="pill red tiny">{t({ sw: 'Imepita', en: 'Overdue' })}</span>}
                </li>
              ))}
            </ul>
          )}
          <p className="muted small">{t({ sw: 'Thibitisha tarehe za kampeni na Afisa Mifugo wa Wilaya.', en: 'Confirm campaign dates with the District Veterinary Officer.' })}</p>
        </section>
      </div>

      <section>
        <h2 className="h2">{t({ sw: 'Mifugo yako', en: 'Your animals' })} ({list.length})</h2>
        {list.length === 0 ? (
          <div className="glass panel empty"><p>{t({ sw: 'Bado hujaongeza mnyama. Anza kwa fomu iliyo juu.', en: "You haven't added an animal yet. Start with the form above." })}</p></div>
        ) : (
          <div className="dgrid">
            {list.map((r) => {
              const next = upcoming(r, 52)[0]
              return (
                <article key={r.id} className="glass panel rec">
                  <div className="row between">
                    <h3>{r.name}</h3>
                    <span className="pill green">{t(animalById(r.species))}{r.count > 1 ? ` ×${r.count}` : ''}</span>
                  </div>
                  <p className="muted small">{t({ sw: 'Umri', en: 'Age' })}: {ageText(r.birth, t)}</p>
                  {next && <p className="small">{t({ sw: 'Ijayo', en: 'Next' })}: <b>{t(next.name)}</b> · {fmt(next.date, lang)}</p>}
                  <div className="row gap">
                    <Link className="btn glass-btn sm" to={`/kagua?mnyama=${r.species}`}><Icon name="search" size={16} /> {t(S.check)}</Link>
                    {confirmId === r.id ? (
                      <>
                        <button type="button" className="btn danger sm" onClick={() => { persist(list.filter((x) => x.id !== r.id)); setConfirmId(null) }}>{t({ sw: 'Ndiyo, futa', en: 'Yes, delete' })}</button>
                        <button type="button" className="btn glass-btn sm" onClick={() => setConfirmId(null)}>{t({ sw: 'Hapana', en: 'No' })}</button>
                      </>
                    ) : (
                      <button type="button" className="btn glass-btn sm" onClick={() => setConfirmId(r.id)} aria-label={t({ sw: 'Futa', en: 'Delete' })}><Icon name="trash" size={16} /></button>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>

      {history.length > 0 && (
        <section>
          <h2 className="h2">{t({ sw: 'Ukaguzi uliopita', en: 'Past checks' })}</h2>
          <ul className="glass panel events">
            {history.slice(0, 8).map((h) => (
              <li key={h.id}>
                <span className="date num">{fmt(new Date(h.at), lang)}</span>
                <span>
                  <b>{t(animalById(h.animal))}</b> · {h.top ? t(diseaseById(h.top)?.names) : t({ sw: 'hakuna', en: 'none' })}
                </span>
                {h.danger && <span className="pill red tiny">{t(S.levels.red)}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}
