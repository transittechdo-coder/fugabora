import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useLang, S } from '../lib/i18n.jsx'
import { ANIMALS, animalById } from '../data/animals.js'
import { symptomsFor, SYMPTOM_GROUPS, symptomById } from '../data/symptoms.js'
import { check, confidence } from '../lib/engine.js'
import { sendReport } from '../lib/supabase.js'
import { load, save, uid } from '../lib/storage.js'
import DiseaseCard from '../components/DiseaseCard.jsx'
import Icon from '../components/Icon.jsx'

const READY = ANIMALS.filter((a) => a.phase <= 2)
const STEPS = [
  { sw: 'Mnyama', en: 'Animal' },
  { sw: 'Dalili', en: 'Signs' },
  { sw: 'Maswali', en: 'Questions' },
  { sw: 'Matokeo', en: 'Results' },
]

export default function Check() {
  const { t } = useLang()
  const [params, setParams] = useSearchParams()
  const initial = params.get('mnyama')
  const [animal, setAnimal] = useState(initial && animalById(initial)?.phase <= 2 ? initial : null)
  const [step, setStep] = useState(animal ? 1 : 0)
  const [picked, setPicked] = useState([])
  const [ctx, setCtx] = useState({ many: null, young: null, days: null })
  const [err, setErr] = useState('')

  useEffect(() => {
    if (animal) setParams({ mnyama: animal }, { replace: true })
  }, [animal, setParams])

  const syms = useMemo(() => (animal ? symptomsFor(animal) : []), [animal])
  const grouped = useMemo(() => {
    const g = {}
    syms.forEach((s) => (g[s.g] ||= []).push(s))
    return g
  }, [syms])

  const result = useMemo(
    () => (step === 3 ? check(animal, picked, { many: ctx.many === true, young: ctx.young, days: ctx.days }) : null),
    [step, animal, picked, ctx],
  )

  useEffect(() => {
    if (!result) return
    const entry = { id: uid(), at: new Date().toISOString(), animal, picked, top: result.results[0]?.disease.id ?? null, danger: result.danger }
    save('history', [entry, ...load('history', [])].slice(0, 30))
    sendReport({ animal, symptoms: picked, topDisease: entry.top })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result])

  const toggle = (id) => {
    setErr('')
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
  }
  const reset = () => {
    setAnimal(null)
    setPicked([])
    setCtx({ many: null, young: null, days: null })
    setStep(0)
    setParams({}, { replace: true })
  }

  const isBird = ['chicken', 'duck', 'turkey', 'guineafowl', 'pigeon'].includes(animal)
  const a = animal && animalById(animal)

  return (
    <div className="checker">
      <div className="page-head">
        <h1 className="h1">{t(S.check)}</h1>
        <ol className="steps" aria-label={t({ sw: 'Hatua', en: 'Steps' })}>
          {STEPS.map((s, i) => (
            <li key={i} className={i === step ? 'on' : i < step ? 'done' : ''} aria-current={i === step ? 'step' : undefined}>
              <span>{i < step ? <Icon name="check" size={14} /> : i + 1}</span>
              {t(s)}
            </li>
          ))}
        </ol>
      </div>

      {step === 0 && (
        <section className="glass panel">
          <h2>{t({ sw: 'Mnyama gani anaumwa?', en: 'Which animal is sick?' })}</h2>
          <div className="pick-grid">
            {READY.map((x) => (
              <button
                key={x.id}
                type="button"
                className="pick glass"
                onClick={() => {
                  setAnimal(x.id)
                  setPicked([])
                  setStep(1)
                }}
              >
                <b>{t(x)}</b>
                <span>{t(x.use)}</span>
              </button>
            ))}
          </div>
          <p className="muted small">{t({ sw: 'Bata, sungura, punda na wengine wanakuja hivi karibuni.', en: 'Ducks, rabbits, donkeys and more are coming soon.' })}</p>
        </section>
      )}

      {step === 1 && a && (
        <section className="glass panel">
          <div className="row between wrap gap">
            <h2>{t({ sw: `${a.sw}: unaona dalili gani?`, en: `${a.en}: what signs do you see?` })}</h2>
            <span className="pill green">{picked.length} {t({ sw: 'zimechaguliwa', en: 'selected' })}</span>
          </div>
          {Object.entries(grouped).map(([g, list]) => (
            <fieldset key={g} className="symgroup">
              <legend>{t(SYMPTOM_GROUPS[g])}</legend>
              <div className="chips">
                {list.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`chip ${s.danger ? 'danger' : ''}`}
                    aria-pressed={picked.includes(s.id)}
                    onClick={() => toggle(s.id)}
                  >
                    {picked.includes(s.id) && <Icon name="check" size={16} />}
                    {t(s)}
                  </button>
                ))}
              </div>
            </fieldset>
          ))}
          {err && <p className="error" role="alert">{err}</p>}
          <div className="row between gap sticky-actions">
            <button type="button" className="btn glass-btn" onClick={() => setStep(0)}>
              <Icon name="arrowL" size={18} /> {t(S.back)}
            </button>
            <button
              type="button"
              className="btn primary"
              onClick={() => (picked.length ? setStep(2) : setErr(t({ sw: 'Chagua angalau dalili moja.', en: 'Pick at least one sign.' })))}
            >
              {t(S.next)} <Icon name="arrowR" size={18} />
            </button>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="glass panel">
          <h2>{t({ sw: 'Maswali machache', en: 'A few questions' })}</h2>
          <Question
            label={t({ sw: 'Wangapi wanaumwa?', en: 'How many are sick?' })}
            value={ctx.many}
            onChange={(v) => setCtx({ ...ctx, many: v })}
            options={[
              [false, t({ sw: 'Mmoja au wachache', en: 'One or a few' })],
              [true, t({ sw: 'Wengi', en: 'Many' })],
            ]}
          />
          <Question
            label={isBird ? t({ sw: 'Umri wa ndege?', en: 'Age of the birds?' }) : t({ sw: 'Umri wa mnyama?', en: 'Age of the animal?' })}
            value={ctx.young}
            onChange={(v) => setCtx({ ...ctx, young: v })}
            options={[
              [true, isBird ? t({ sw: 'Vifaranga (chini ya wiki 8)', en: 'Chicks (under 8 weeks)' }) : t({ sw: 'Mdogo', en: 'Young' })],
              [false, t({ sw: 'Mkubwa', en: 'Adult' })],
            ]}
          />
          <Question
            label={t({ sw: 'Dalili zilianza lini?', en: 'When did it start?' })}
            value={ctx.days}
            onChange={(v) => setCtx({ ...ctx, days: v })}
            options={[
              [1, t({ sw: 'Leo au jana', en: 'Today or yesterday' })],
              [7, t({ sw: 'Wiki hii', en: 'This week' })],
              [30, t({ sw: 'Zaidi ya wiki', en: 'Over a week' })],
            ]}
          />
          <div className="row between gap">
            <button type="button" className="btn glass-btn" onClick={() => setStep(1)}>
              <Icon name="arrowL" size={18} /> {t(S.back)}
            </button>
            <button type="button" className="btn primary" onClick={() => setStep(3)}>
              {t({ sw: 'Ona matokeo', en: 'See results' })} <Icon name="arrowR" size={18} />
            </button>
          </div>
        </section>
      )}

      {step === 3 && result && (
        <section className="results" aria-live="polite">
          {result.danger && (
            <div className="alarm" role="alert">
              <Icon name="alert" size={30} />
              <div>
                <h2>{t(S.callVet)}</h2>
                <p>
                  {t({
                    sw: 'Dalili ulizochagua zinaonyesha hali ya hatari. Tenga wanyama wagonjwa na wasiliana na daktari wa mifugo au Afisa Mifugo wa Wilaya leo.',
                    en: 'The signs you chose point to an emergency. Separate sick animals and contact a vet or the District Veterinary Officer today.',
                  })}
                </p>
              </div>
            </div>
          )}
          {result.reasons.includes('zoonotic') && (
            <div className="notice violet">
              <Icon name="people" />
              <p>{t({ sw: 'Mojawapo ya magonjwa haya linaweza kuambukiza binadamu. Vaa glavu, nawa mikono, chemsha maziwa.', en: 'One of these diseases can spread to people. Wear gloves, wash hands, boil milk.' })}</p>
            </div>
          )}
          {result.reasons.includes('notifiable') && (
            <div className="notice slate">
              <Icon name="bell" />
              <p>{t({ sw: 'Ugonjwa unaowezekana ni wa kuripotiwa kisheria. Mjulishe Afisa Mifugo wa Wilaya ndani ya saa 24.', en: 'A possible disease is legally notifiable. Inform the District Veterinary Officer within 24 hours.' })}</p>
            </div>
          )}

          <div className="glass panel">
            <div className="row between wrap gap">
              <h2>{t(S.possible)}: {t(a)}</h2>
              <button type="button" className="btn glass-btn" onClick={reset}>{t(S.startOver)}</button>
            </div>
            <p className="muted">
              {t({ sw: 'Dalili:', en: 'Signs:' })} {picked.map((id) => t(symptomById(id))).join(', ')}
            </p>
          </div>

          {result.results.length === 0 ? (
            <div className="glass panel empty">
              <p>{t({ sw: 'Hatukupata ugonjwa unaolingana na dalili hizi. Mwone daktari wa mifugo.', en: 'No disease matched these signs. Please see a vet.' })}</p>
            </div>
          ) : (
            result.results.map((r, i) => (
              <DiseaseCard key={r.disease.id} d={r.disease} score={r.score}>
                <p className="conf">
                  <b>{i + 1}.</b> {t(S.conf[confidence(r.score)])} · {t({ sw: 'dalili zinazolingana', en: 'matching signs' })}: {r.matched.length}
                </p>
                <div className="aid">
                  <h4>{t(S.firstAid)}</h4>
                  <ul>
                    {r.disease.aid.map((x, k) => (
                      <li key={k}>{t(x)}</li>
                    ))}
                  </ul>
                </div>
              </DiseaseCard>
            ))
          )}
          <p className="disclaimer-note"><Icon name="shield" size={16} /> {t(S.notDiagnosis)}</p>
        </section>
      )}
    </div>
  )
}

function Question({ label, value, onChange, options }) {
  return (
    <fieldset className="q">
      <legend>{label}</legend>
      <div className="seg">
        {options.map(([v, text]) => (
          <button key={String(v)} type="button" aria-pressed={value === v} onClick={() => onChange(value === v ? null : v)}>
            {text}
          </button>
        ))}
      </div>
    </fieldset>
  )
}
