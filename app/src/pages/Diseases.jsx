import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLang, S } from '../lib/i18n.jsx'
import { DISEASES, diseaseById } from '../data/diseases.js'
import { ANIMALS, animalById } from '../data/animals.js'
import { symptomById } from '../data/symptoms.js'
import DiseaseCard, { LevelPill, Flags } from '../components/DiseaseCard.jsx'
import Icon from '../components/Icon.jsx'

const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, '')

export function DiseaseList() {
  const { t } = useLang()
  const [q, setQ] = useState('')
  const [animal, setAnimal] = useState('all')
  const [level, setLevel] = useState('all')

  const withDiseases = ANIMALS.filter((a) => DISEASES.some((d) => d.animals.includes(a.id)))
  const list = useMemo(() => {
    const nq = norm(q.trim())
    return DISEASES.filter((d) => (animal === 'all' || d.animals.includes(animal)) && (level === 'all' || d.level === level))
      .filter((d) => !nq || [d.names.sw, d.names.en, ...d.local].some((n) => norm(n).includes(nq)))
      .sort((a, b) => 'red amber green'.indexOf(a.level) - 'red amber green'.indexOf(b.level))
  }, [q, animal, level])

  return (
    <>
      <div className="page-head">
        <h1 className="h1">{t(S.diseases)}</h1>
        <p className="sub">{t({ sw: 'Magonjwa muhimu ya mifugo na wanyama wa nyumbani Tanzania, kwa Kiswahili na majina ya kienyeji.', en: 'Key diseases of livestock and pets in Tanzania, in Swahili with local names.' })}</p>
      </div>
      <div className="filters glass">
        <label className="search">
          <Icon name="search" size={18} />
          <input id="disease-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t(S.search)} />
        </label>
        <select id="disease-animal" value={animal} onChange={(e) => setAnimal(e.target.value)} aria-label={t({ sw: 'Mnyama', en: 'Animal' })}>
          <option value="all">{t({ sw: 'Wanyama wote', en: 'All animals' })}</option>
          {withDiseases.map((a) => (
            <option key={a.id} value={a.id}>{t(a)}</option>
          ))}
        </select>
        <div className="seg small" role="group" aria-label={t({ sw: 'Kiwango', en: 'Level' })}>
          {['all', 'red', 'amber', 'green'].map((l) => (
            <button key={l} type="button" aria-pressed={level === l} onClick={() => setLevel(l)}>
              {l === 'all' ? t({ sw: 'Yote', en: 'All' }) : t(S.levels[l])}
            </button>
          ))}
        </div>
      </div>
      <p className="muted small">{t({ sw: `Magonjwa ${list.length}`, en: `${list.length} diseases` })} · {t(S.reviewNote)}</p>
      <div className="dgrid">
        {list.map((d) => (
          <DiseaseCard key={d.id} d={d} compact={false} />
        ))}
      </div>
      {!list.length && <div className="glass panel empty"><p>{t({ sw: 'Hakuna ugonjwa unaolingana. Jaribu neno lingine.', en: 'No match. Try another word.' })}</p></div>}
    </>
  )
}

export function DiseaseDetail() {
  const { id } = useParams()
  const { t } = useLang()
  const d = diseaseById(id)
  if (!d)
    return (
      <div className="glass panel empty">
        <p>{t({ sw: 'Ugonjwa huu haupo.', en: 'Disease not found.' })}</p>
        <Link to="/magonjwa" className="btn primary">{t(S.diseases)}</Link>
      </div>
    )
  const signs = Object.entries(d.signs).sort((a, b) => b[1] - a[1])
  return (
    <article className="detail">
      <Link to="/magonjwa" className="link back"><Icon name="arrowL" size={16} /> {t(S.diseases)}</Link>
      <header className={`glass panel lvl-${d.level}`}>
        <div className="row between wrap gap">
          <h1 className="h1">{t(d.names)}</h1>
          <LevelPill level={d.level} />
        </div>
        <p className="lede">{t(d.about)}</p>
        <p className="muted small">{t({ sw: 'Majina mengine', en: 'Other names' })}: {d.local.join(', ')}</p>
        <p className="muted small">{t({ sw: 'Wanyama', en: 'Animals' })}: {d.animals.map((a) => t(animalById(a))).join(', ')}</p>
        <Flags d={d} />
      </header>
      {d.level === 'red' && (
        <div className="alarm"><Icon name="alert" size={26} /><div><h2>{t(S.callVet)}</h2></div></div>
      )}
      <div className="cols">
        <section className="glass panel">
          <h2>{t({ sw: 'Dalili', en: 'Signs' })}</h2>
          <ul className="signs">
            {signs.map(([s, w]) => (
              <li key={s}>
                <span className={`dot w${w}`} aria-hidden="true" />
                {t(symptomById(s))}
                {w === 3 && <span className="pill green tiny">{t({ sw: 'kuu', en: 'key' })}</span>}
              </li>
            ))}
          </ul>
        </section>
        <section className="glass panel">
          <h2>{t(S.firstAid)}</h2>
          <ol className="aidlist">
            {d.aid.map((x, i) => (
              <li key={i}>{t(x)}</li>
            ))}
          </ol>
          <h2>{t(S.prevention)}</h2>
          <p>{t(d.prevent)}</p>
        </section>
      </div>
      <p className="disclaimer-note"><Icon name="shield" size={16} /> {t(S.reviewNote)} {t({ sw: 'Dawa na vipimo vyake hutolewa na daktari pekee.', en: 'Medicines and doses come from a vet only.' })}</p>
      <Link to={`/kagua?mnyama=${d.animals[0]}`} className="btn primary">
        <Icon name="search" /> {t({ sw: 'Kagua dalili za mnyama wako', en: "Check your animal's signs" })}
      </Link>
    </article>
  )
}
