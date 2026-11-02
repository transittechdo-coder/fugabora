import { useState } from 'react'
import { FEEDING } from '../data/care.js'
import { animalById } from '../data/animals.js'
import { useLang } from '../lib/i18n.jsx'

export default function Feeding() {
  const { t, tx } = useLang()
  const [guideId, setGuideId] = useState('broiler')
  const guide = FEEDING.find((g) => g.id === guideId)
  const usesWeeks = ['broiler', 'layer', 'kienyeji'].includes(guideId)
  const [age, setAge] = useState(3)
  const [count, setCount] = useState(100)
  const stage = guide.stages.find((s) => age >= s.from && age <= s.to) || guide.stages[guide.stages.length - 1]
  const isGrams = guide.unit.en.startsWith('g') || guide.unit.en.startsWith('extra g')
  const isMeals = guide.unit.en.startsWith('meals')
  const daily = stage.perDay * (Number(count) || 0)
  const fmt = (n) => (isGrams ? (n >= 1000 ? `${(n / 1000).toFixed(1)} kg` : `${Math.round(n)} g`) : `${n.toFixed(1)} kg`)

  return (
    <div className="stack" style={{ gap: 24, paddingTop: 16 }}>
      <header className="stack" style={{ gap: 8 }}>
        <span className="eyebrow">{t('Lishe', 'Feeding')}</span>
        <h2>{t('Mwongozo wa lishe kwa hatua za ukuaji', 'Feeding guide by growth stage')}</h2>
        <p className="muted">{t('Kiasi ni makadirio ya kawaida. Fuata maelekezo ya mfuko wa chakula na ushauri wa afisa ugani.', 'Amounts are typical guides. Follow the feed bag label and your extension officer.')}</p>
      </header>

      <div className="chips" role="group" aria-label={t('Aina', 'Type')}>
        {FEEDING.map((g) => (
          <button key={g.id} id={`feed-${g.id}`} type="button" className="chip" aria-pressed={g.id === guideId} onClick={() => { setGuideId(g.id); setAge(g.stages[0].from + 1) }}>
            <span aria-hidden="true">{animalById(g.animal)?.icon}</span>{tx(g)}
          </button>
        ))}
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))' }}>
        <section className="card glass solid" style={{ gap: 16, padding: 24 }}>
          <h3>{t('Kikokotoo', 'Calculator')}</h3>
          <label className="field">{usesWeeks ? t('Umri (wiki)', 'Age (weeks)') : t('Umri (miezi)', 'Age (months)')}
            <input type="number" id="feed-age" min="0" max="300" value={age} onChange={(e) => setAge(Math.max(0, Number(e.target.value)))} />
          </label>
          {!isMeals && (
            <label className="field">{t('Idadi ya wanyama', 'Number of animals')}
              <input type="number" id="feed-count" min="1" max="100000" value={count} onChange={(e) => setCount(e.target.value)} />
            </label>
          )}
          <div className="card glass" style={{ background: 'var(--accent-soft)', borderColor: 'transparent' }}>
            <span className="small muted">{t('Hatua ya sasa', 'Current stage')}</span>
            <b style={{ fontFamily: 'var(--display)', fontSize: '1.2rem' }}>{tx(stage)}</b>
            {isMeals ? (
              <p><b style={{ fontSize: '1.8rem', fontFamily: 'var(--display)' }}>{stage.perDay}</b> {tx(guide.unit)}</p>
            ) : (
              <div className="row" style={{ gap: 28 }}>
                <div><span className="small muted">{t('Kwa siku', 'Per day')}</span><b style={{ display: 'block', fontSize: '1.8rem', fontFamily: 'var(--display)', fontVariantNumeric: 'tabular-nums' }}>{fmt(daily)}</b></div>
                <div><span className="small muted">{t('Kwa wiki', 'Per week')}</span><b style={{ display: 'block', fontSize: '1.8rem', fontFamily: 'var(--display)', fontVariantNumeric: 'tabular-nums' }}>{fmt(daily * 7)}</b></div>
              </div>
            )}
            {!isMeals && <span className="small muted">{stage.perDay} {tx(guide.unit)}</span>}
          </div>
        </section>

        <section className="card glass solid" style={{ gap: 14, padding: 24 }}>
          <h3>{t('Hatua zote', 'All stages')}</h3>
          <div className="list">
            {guide.stages.map((s) => (
              <div key={s.en} className="spread">
                <span style={{ fontWeight: s === stage ? 700 : 400 }}>{tx(s)}</span>
                <span className="pill neutral">{s.perDay} {isMeals ? '' : isGrams ? 'g' : 'kg'}</span>
              </div>
            ))}
          </div>
          <h3 style={{ marginTop: 8 }}>{t('Vidokezo', 'Tips')}</h3>
          <ul className="clean">{tx(guide.tips).map((x) => <li key={x}>{x}</li>)}</ul>
        </section>
      </div>
    </div>
  )
}
