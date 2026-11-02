import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ANIMALS, animalById } from '../data/animals.js'
import { SYMPTOM_CATS, symptomsFor } from '../data/symptoms.js'
import { confidenceLabel, needsVetNow, rankDiseases } from '../lib/engine.js'
import { useLang } from '../lib/i18n.jsx'
import { load, save, uid } from '../lib/storage.js'
import { sendReport } from '../lib/supabase.js'
import DiseaseCard from '../components/DiseaseCard.jsx'
import { IconAlert, IconArrow, IconBack, IconPhone } from '../components/Icons.jsx'

const STEPS = 4

export default function Checker() {
  const { t, tx } = useLang()
  const [step, setStep] = useState(1)
  const [animal, setAnimal] = useState(null)
  const [picked, setPicked] = useState([])
  const [query, setQuery] = useState('')
  const [ctx, setCtx] = useState({ many: false, deaths: false, young: false, since: 'days' })

  const symptoms = useMemo(() => (animal ? symptomsFor(animal) : []), [animal])
  const filtered = symptoms.filter((s) => !query || (s.sw + ' ' + s.en).toLowerCase().includes(query.toLowerCase()))
  const results = useMemo(() => (animal ? rankDiseases(animal, picked, ctx) : []), [animal, picked, ctx])
  const urgent = needsVetNow(picked, ctx, results)
  const toggle = (id) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
  const restart = () => { setStep(1); setAnimal(null); setPicked([]); setQuery(''); setCtx({ many: false, deaths: false, young: false, since: 'days' }) }

  const finish = () => {
    setStep(4)
    const record = { id: uid(), at: new Date().toISOString(), animal, symptoms: picked, ctx, top: results.map((r) => r.disease.id), urgent }
    save('checks', [record, ...load('checks', [])].slice(0, 50))
    sendReport({ animal, symptoms: picked, top_disease: results[0]?.disease.id ?? null, urgent, many_sick: ctx.many }).catch(() => {})
  }

  return (
    <div className="stack" style={{ gap: 24, maxWidth: 920, margin: '0 auto' }}>
      <header className="stack" style={{ gap: 10, paddingTop: 16 }}>
        <span className="eyebrow">{t(`Hatua ${step} kati ya ${STEPS}`, `Step ${step} of ${STEPS}`)}</span>
        <h2>{[null, t('Mnyama gani anaumwa?', 'Which animal is sick?'), t('Unaona dalili gani?', 'What signs do you see?'), t('Maswali machache', 'A few questions'), t('Magonjwa yanayowezekana', 'Possible diseases')][step]}</h2>
        <div className="steps" aria-hidden="true">{Array.from({ length: STEPS }, (_, i) => <span key={i} className={i < step ? 'on' : ''} />)}</div>
      </header>

      {step === 1 && (
        <div className="grid tight">
          {ANIMALS.map((a) => (
            <button key={a.id} id={`animal-${a.id}`} type="button" className="animal-tile glass" aria-pressed={animal === a.id} disabled={!a.checker}
              onClick={() => { setAnimal(a.id); setPicked([]); setStep(2) }}>
              <span className="emoji" aria-hidden="true">{a.icon}</span>
              <b>{tx(a)}</b>
              <span className="muted small">{a.checker ? tx(a.use) : t(`Inakuja toleo ${a.v}`, `Coming in version ${a.v}`)}</span>
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="stack" style={{ gap: 20 }}>
          <div className="spread">
            <span className="row"><span style={{ fontSize: '1.8rem' }} aria-hidden="true">{animalById(animal).icon}</span><b>{tx(animalById(animal))}</b></span>
            <span className="pill neutral">{t(`Umechagua ${picked.length}`, `${picked.length} selected`)}</span>
          </div>
          <input type="search" id="symptom-search" placeholder={t('Tafuta dalili, mfano: kuharisha', 'Search signs, for example: diarrhoea')} value={query} onChange={(e) => setQuery(e.target.value)} />
          {Object.entries(SYMPTOM_CATS).map(([cat, label]) => {
            const items = filtered.filter((s) => s.cat === cat)
            if (!items.length) return null
            return (
              <div key={cat} className="stack" style={{ gap: 10 }}>
                <b className="small muted" style={{ textTransform: 'uppercase', letterSpacing: '0.07em' }}>{tx(label)}</b>
                <div className="chips">
                  {items.map((s) => (
                    <button key={s.id} id={`sym-${s.id}`} type="button" className="chip" aria-pressed={picked.includes(s.id)} onClick={() => toggle(s.id)}>
                      {s.danger && <span className="dot" title={t('Dalili ya hatari', 'Danger sign')} />}{tx(s)}
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
          <p className="small muted"><span className="chip" style={{ padding: '2px 8px', minHeight: 0, pointerEvents: 'none' }}><span className="dot" /></span> {t('= dalili ya hatari', '= danger sign')}</p>
          <div className="spread">
            <button type="button" className="btn ghost" onClick={() => setStep(1)}><IconBack />{t('Rudi', 'Back')}</button>
            <button type="button" id="to-questions" className="btn primary" disabled={!picked.length} onClick={() => setStep(3)}>{t('Endelea', 'Continue')}<IconArrow /></button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="card glass solid" style={{ gap: 20, padding: 24 }}>
          {[
            { key: 'many', q: t('Wanyama wengi wanaumwa kwa pamoja?', 'Are many animals sick at the same time?') },
            { key: 'deaths', q: t('Kuna aliyekufa tayari?', 'Has any animal died already?') },
            { key: 'young', q: t('Anayeumwa ni mchanga (ndama, kitoto, kifaranga)?', 'Is the sick one young (calf, kid, chick)?') },
          ].map(({ key, q }) => (
            <fieldset key={key} style={{ border: 0, padding: 0, margin: 0, display: 'grid', gap: 8 }}>
              <legend style={{ fontWeight: 700, marginBottom: 8 }}>{q}</legend>
              <div className="seg" style={{ justifySelf: 'start' }}>
                <button type="button" id={`${key}-yes`} aria-pressed={ctx[key]} onClick={() => setCtx({ ...ctx, [key]: true })}>{t('Ndiyo', 'Yes')}</button>
                <button type="button" id={`${key}-no`} aria-pressed={!ctx[key]} onClick={() => setCtx({ ...ctx, [key]: false })}>{t('Hapana', 'No')}</button>
              </div>
            </fieldset>
          ))}
          <label className="field">{t('Ugonjwa ulianza lini?', 'When did it start?')}
            <select id="since" value={ctx.since} onChange={(e) => setCtx({ ...ctx, since: e.target.value })}>
              <option value="hours">{t('Leo (saa chache zilizopita)', 'Today (a few hours ago)')}</option>
              <option value="days">{t('Siku 1–3 zilizopita', '1–3 days ago')}</option>
              <option value="week">{t('Wiki moja au zaidi', 'A week or more')}</option>
            </select>
          </label>
          <div className="spread">
            <button type="button" className="btn ghost" onClick={() => setStep(2)}><IconBack />{t('Rudi', 'Back')}</button>
            <button type="button" id="see-results" className="btn primary" onClick={finish}>{t('Ona matokeo', 'See results')}<IconArrow /></button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="stack" style={{ gap: 16 }} aria-live="polite">
          {urgent && (
            <div className="alert red" role="alert">
              <IconAlert />
              <div className="stack" style={{ gap: 4 }}>
                <b>{t('Mwite daktari wa mifugo sasa', 'Call a vet now')}</b>
                <span>{t('Dalili hizi zinaweza kuwa za ugonjwa hatari au unaoenea haraka. Usisubiri.', 'These signs may mean a dangerous or fast-spreading disease. Do not wait.')}</span>
                <Link to="/msaada" className="row" style={{ color: 'inherit', fontWeight: 700, marginTop: 4 }}><IconPhone />{t('Nani wa kumpigia', 'Who to call')}</Link>
              </div>
            </div>
          )}
          {results.some((r) => r.disease.notifiable) && (
            <div className="alert gold">
              <IconAlert />
              <span>{t('Mojawapo ya magonjwa haya lazima liripotiwe kwa Afisa Mifugo wa Wilaya ndani ya saa 24 kwa mujibu wa sheria.', 'One of these diseases must by law be reported to the District Veterinary Officer within 24 hours.')}</span>
            </div>
          )}
          {results.length === 0 && <div className="empty">{t('Hakuna ugonjwa unaolingana na dalili hizi kwenye hazina yetu. Mwone daktari wa mifugo.', 'No disease in our list matches these signs. Please see a vet.')}</div>}
          {results.map((r, i) => (
            <DiseaseCard key={r.disease.id} d={r.disease} score={r.score}>
              <div className="spread small"><span className="muted">{t(`Nafasi ya ${i + 1}`, `Rank ${i + 1}`)}</span><span>{t('Uhakika', 'Confidence')}: <b>{confidenceLabel(r.score, t)}</b></span></div>
              <div className="stack" style={{ gap: 6 }}>
                <b>{t('Fanya sasa', 'Do this now')}</b>
                <ul className="clean">{tx(r.disease.aid).map((a) => <li key={a}>{a}</li>)}</ul>
              </div>
            </DiseaseCard>
          ))}
          <p className="small muted">{t('Haya ni magonjwa yanayowezekana, si uchunguzi rasmi. Usitumie dawa bila ushauri wa daktari au agrovet.', 'These are possible diseases, not a diagnosis. Do not use medicine without a vet or agro-vet.')}</p>
          <div className="row">
            <button type="button" className="btn ghost" onClick={() => setStep(2)}><IconBack />{t('Badilisha dalili', 'Change signs')}</button>
            <button type="button" id="restart" className="btn primary" onClick={restart}>{t('Angalia mnyama mwingine', 'Check another animal')}</button>
          </div>
          <History />
        </div>
      )}
    </div>
  )
}

function History() {
  const { t, tx } = useLang()
  const checks = load('checks', []).slice(0, 5)
  if (checks.length < 2) return null
  return (
    <div className="card glass" style={{ marginTop: 16 }}>
      <h3>{t('Ukaguzi wa karibuni', 'Recent checks')}</h3>
      <div className="list">
        {checks.map((c) => (
          <div key={c.id} className="spread small">
            <span>{animalById(c.animal)?.icon} {tx(animalById(c.animal))} · {new Date(c.at).toLocaleDateString()}</span>
            <span className={`pill ${c.urgent ? 'red' : 'neutral'}`}>{c.urgent ? t('Hatari', 'Urgent') : t('Kawaida', 'Routine')}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
