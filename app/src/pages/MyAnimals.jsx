import { useState } from 'react'
import { ANIMALS, animalById } from '../data/animals.js'
import { VACCINES } from '../data/care.js'
import { useLang } from '../lib/i18n.jsx'
import { formatDate, remindersFor } from '../lib/reminders.js'
import { load, save, uid } from '../lib/storage.js'
import { IconPlus, IconTrash } from '../components/Icons.jsx'

const today = () => new Date().toISOString().slice(0, 10)

export default function MyAnimals() {
  const { t, tx, lang } = useLang()
  const [herd, setHerd] = useState(() => load('herd', []))
  const [form, setForm] = useState({ name: '', type: 'chicken', born: today(), count: 1 })
  const [error, setError] = useState('')
  const [confirmId, setConfirmId] = useState(null)
  const types = ANIMALS.filter((a) => VACCINES[a.id])

  const persist = (next) => { setHerd(next); save('herd', next) }
  const add = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return setError(t('Andika jina au namba ya kundi.', 'Enter a name or group number.'))
    if (new Date(form.born) > new Date()) return setError(t('Tarehe haiwezi kuwa ya baadaye.', 'The date can’t be in the future.'))
    persist([{ ...form, id: uid(), name: form.name.trim(), count: Math.max(1, Number(form.count) || 1) }, ...herd])
    setForm({ ...form, name: '', count: 1 }); setError('')
  }

  const upcoming = herd.flatMap((a) => remindersFor(a)).filter((r) => r.inDays <= 60).sort((a, b) => a.date - b.date)

  return (
    <div className="stack" style={{ gap: 24, paddingTop: 16 }}>
      <header className="stack" style={{ gap: 8 }}>
        <span className="eyebrow">{t('Mifugo yangu', 'My animals')}</span>
        <h2>{t('Rekodi na kumbukumbu za chanjo', 'Records and vaccine reminders')}</h2>
        <p className="muted">{t('Taarifa hizi zinahifadhiwa kwenye simu yako tu. Thibitisha tarehe za chanjo na Afisa Mifugo wa Wilaya.', 'These records are kept on your phone only. Confirm vaccine dates with your District Veterinary Officer.')}</p>
      </header>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', alignItems: 'start' }}>
        <form className="card glass solid" style={{ gap: 14, padding: 24 }} onSubmit={add} noValidate>
          <h3>{t('Ongeza mnyama au kundi', 'Add an animal or group')}</h3>
          <label className="field">{t('Jina / namba', 'Name / number')}
            <input type="text" id="herd-name" placeholder={t('Mfano: Kuku banda A', 'For example: Chicken house A')} value={form.name} onChange={(e) => { setForm({ ...form, name: e.target.value }); setError('') }} />
          </label>
          <label className="field">{t('Aina', 'Type')}
            <select id="herd-type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              {types.map((a) => <option key={a.id} value={a.id}>{a.icon} {tx(a)}</option>)}
            </select>
          </label>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))' }}>
            <label className="field">{t('Tarehe ya kuzaliwa / kufika', 'Born / arrived')}
              <input type="date" id="herd-born" max={today()} value={form.born} onChange={(e) => setForm({ ...form, born: e.target.value })} />
            </label>
            <label className="field">{t('Idadi', 'Count')}
              <input type="number" id="herd-count" min="1" value={form.count} onChange={(e) => setForm({ ...form, count: e.target.value })} />
            </label>
          </div>
          {error && <p style={{ color: 'var(--red)', fontWeight: 700 }} role="alert">{error}</p>}
          <button type="submit" id="herd-add" className="btn primary"><IconPlus />{t('Ongeza', 'Add')}</button>
        </form>

        <section className="card glass solid" style={{ gap: 12, padding: 24 }}>
          <div className="spread"><h3>{t('Zinazokuja (siku 60)', 'Coming up (60 days)')}</h3><span className="pill neutral">{upcoming.length}</span></div>
          {upcoming.length === 0 ? (
            <div className="empty">{herd.length ? t('Hakuna chanjo ndani ya siku 60.', 'No vaccines due in the next 60 days.') : t('Ongeza mnyama wako wa kwanza ili kuona ratiba ya chanjo.', 'Add your first animal to see its vaccine schedule.')}</div>
          ) : (
            <div className="list">
              {upcoming.map((r, i) => (
                <div key={i} className="spread">
                  <div style={{ minWidth: 0 }}>
                    <b>{tx(r.vaccine)}</b>
                    <div className="small muted">{animalById(r.animal.type)?.icon} {r.animal.name} · {formatDate(r.date, lang)}</div>
                  </div>
                  <span className={`pill ${r.inDays <= 0 ? 'red' : r.inDays <= 7 ? 'amber' : 'green'}`}>
                    {r.inDays <= 0 ? t('Leo', 'Today') : t(`Siku ${r.inDays}`, `${r.inDays} days`)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <section className="stack" style={{ gap: 12 }}>
        <h3>{t('Mifugo yangu', 'My animals')} ({herd.length})</h3>
        {herd.length === 0 ? null : (
          <div className="grid">
            {herd.map((a) => {
              const next = remindersFor(a)[0]
              return (
                <div key={a.id} className="card glass">
                  <div className="spread">
                    <span className="row"><span style={{ fontSize: '1.8rem' }} aria-hidden="true">{animalById(a.type)?.icon}</span><b>{a.name}</b></span>
                    {confirmId === a.id ? (
                      <span className="row">
                        <button type="button" className="btn danger sm" onClick={() => { persist(herd.filter((h) => h.id !== a.id)); setConfirmId(null) }}>{t('Futa', 'Delete')}</button>
                        <button type="button" className="btn ghost sm" onClick={() => setConfirmId(null)}>{t('Acha', 'Cancel')}</button>
                      </span>
                    ) : (
                      <button type="button" className="btn ghost sm" aria-label={t('Futa', 'Delete')} onClick={() => setConfirmId(a.id)}><IconTrash /></button>
                    )}
                  </div>
                  <span className="small muted">{tx(animalById(a.type))} · {a.count} · {formatDate(new Date(a.born), lang)}</span>
                  {next && <span className="small">{t('Inayofuata', 'Next')}: <b>{tx(next.vaccine)}</b> ({formatDate(next.date, lang)})</span>}
                </div>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
