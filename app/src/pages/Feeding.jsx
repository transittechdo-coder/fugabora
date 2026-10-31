import { useState } from 'react'
import { useLang, S } from '../lib/i18n.jsx'
import { FEEDING } from '../data/care.js'
import { animalById } from '../data/animals.js'
import Icon from '../components/Icon.jsx'

const IDS = Object.keys(FEEDING)

export default function Feeding() {
  const { t } = useLang()
  const [animal, setAnimal] = useState('chicken')
  const info = FEEDING[animal]
  const [typeId, setTypeId] = useState(info.types[0].id)
  const type = info.types.find((x) => x.id === typeId) || info.types[0]

  const [count, setCount] = useState(100)
  const [age, setAge] = useState(3)
  const unit = type.stages[0].unit
  const stage = type.stages.find((s) => age >= s.from && age <= s.to) || type.stages[type.stages.length - 1]
  const gram = stage.gPerDay ? Math.round(((stage.gPerDay[0] + stage.gPerDay[1]) / 2) * Math.max(0, count)) : null

  const pickAnimal = (id) => {
    setAnimal(id)
    setTypeId(FEEDING[id].types[0].id)
    setAge(FEEDING[id].types[0].stages[0].unit === 'week' ? 3 : 6)
    setCount(id === 'chicken' ? 100 : id === 'pig' ? 10 : 5)
  }

  return (
    <>
      <div className="page-head">
        <h1 className="h1">{t(S.feeding)}</h1>
        <p className="sub">{t({ sw: 'Chakula sahihi kwa kila hatua ya ukuaji. Fuata pia maelekezo yaliyo kwenye mfuko wa chakula.', en: 'The right feed for each growth stage. Always follow the feed bag label too.' })}</p>
      </div>

      <div className="seg wide" role="group" aria-label={t({ sw: 'Mnyama', en: 'Animal' })}>
        {IDS.map((id) => (
          <button key={id} type="button" aria-pressed={animal === id} onClick={() => pickAnimal(id)}>
            {t(animalById(id))}
          </button>
        ))}
      </div>

      {info.types.length > 1 && (
        <div className="seg" role="group" aria-label={t({ sw: 'Aina', en: 'Type' })}>
          {info.types.map((x) => (
            <button key={x.id} type="button" aria-pressed={typeId === x.id} onClick={() => setTypeId(x.id)}>
              {t(x)}
            </button>
          ))}
        </div>
      )}

      <div className="cols">
        <section className="glass panel">
          <h2>{t({ sw: 'Hatua za ukuaji', en: 'Growth stages' })}: {t(type)}</h2>
          <ol className="timeline">
            {type.stages.map((s, i) => (
              <li key={i} className={s === stage ? 'on' : ''}>
                <span className="when">
                  {s.unit === 'week'
                    ? t({ sw: `Wiki ${s.from}–${s.to}`, en: `Weeks ${s.from}–${s.to}` })
                    : t({ sw: `Miezi ${s.from}–${s.to}`, en: `Months ${s.from}–${s.to}` })}
                </span>
                <b>{t(s.feed)}</b>
                {s.gPerDay && (
                  <span className="muted small">
                    {s.gPerDay[0]}{'–'}{s.gPerDay[1]} g {t({ sw: 'kwa mmoja kwa siku', en: 'per animal per day' })}
                  </span>
                )}
              </li>
            ))}
          </ol>
          <p className="notice green"><Icon name="info" /> <span>{t(info.note)}</span></p>
        </section>

        <section className="glass panel">
          <h2><Icon name="scale" /> {t({ sw: 'Kikokotoo cha chakula', en: 'Feed calculator' })}</h2>
          <label className="field">
            <span>{t({ sw: 'Idadi ya wanyama', en: 'Number of animals' })}</span>
            <input id="feed-count" type="number" min="1" max="100000" inputMode="numeric" value={count} onChange={(e) => setCount(Number(e.target.value) || 0)} />
          </label>
          <label className="field">
            <span>{unit === 'week' ? t({ sw: 'Umri (wiki)', en: 'Age (weeks)' }) : t({ sw: 'Umri (miezi)', en: 'Age (months)' })}</span>
            <input id="feed-age" type="range" min={type.stages[0].from} max={type.stages[type.stages.length - 1].to} value={age} onChange={(e) => setAge(Number(e.target.value))} />
            <output htmlFor="feed-age" className="out">{age}</output>
          </label>
          <div className="result-box">
            <span className="muted small">{t({ sw: 'Chakula sahihi sasa', en: 'Right feed now' })}</span>
            <b className="big">{t(stage.feed)}</b>
            {gram != null ? (
              <>
                <span className="muted small">{t({ sw: 'Kiasi kwa siku (wastani)', en: 'Amount per day (average)' })}</span>
                <b className="big num">{gram >= 1000 ? `${(gram / 1000).toFixed(1)} kg` : `${gram} g`}</b>
                <span className="muted small">{t({ sw: `Kwa wiki: ${((gram * 7) / 1000).toFixed(1)} kg · mifuko ya kg 50: ${Math.ceil((gram * 7) / 50000)}`, en: `Per week: ${((gram * 7) / 1000).toFixed(1)} kg · 50 kg bags: ${Math.ceil((gram * 7) / 50000)}` })}</span>
              </>
            ) : (
              <span className="muted small">{t({ sw: 'Kiasi kinategemea uzito na malisho. Uliza afisa ugani.', en: 'Amount depends on weight and grazing. Ask an extension officer.' })}</span>
            )}
          </div>
        </section>
      </div>
      <p className="disclaimer-note"><Icon name="shield" size={16} /> {t(S.reviewNote)}</p>
    </>
  )
}
