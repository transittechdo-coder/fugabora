import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ANIMALS, animalById } from '../data/animals.js'
import { DISEASES, diseaseById } from '../data/diseases.js'
import { SYMPTOMS } from '../data/symptoms.js'
import { useLang } from '../lib/i18n.jsx'
import DiseaseCard, { Badges } from '../components/DiseaseCard.jsx'
import { IconAlert, IconBack } from '../components/Icons.jsx'

export function DiseaseList() {
  const { t, tx } = useLang()
  const [animal, setAnimal] = useState('all')
  const [q, setQ] = useState('')
  const [level, setLevel] = useState('all')
  const term = q.trim().toLowerCase()
  const list = DISEASES.filter((d) =>
    (animal === 'all' || d.animals.includes(animal)) &&
    (level === 'all' || d.level === level) &&
    (!term || [d.name.sw, d.name.en, ...(d.local || [])].join(' ').toLowerCase().includes(term)))
  const withDiseases = ANIMALS.filter((a) => DISEASES.some((d) => d.animals.includes(a.id)))

  return (
    <div className="stack" style={{ gap: 20, paddingTop: 16 }}>
      <header className="stack" style={{ gap: 8 }}>
        <span className="eyebrow">{t('Maktaba', 'Library')}</span>
        <h2>{t('Magonjwa ya mifugo na wanyama wa nyumbani', 'Livestock and pet diseases')}</h2>
        <p className="muted">{t('Tafuta kwa jina la Kiswahili, Kiingereza au jina la kienyeji (mfano: mdondo, sotoka, ndigana).', 'Search by Swahili, English or local name (for example: mdondo, sotoka, ndigana).')}</p>
      </header>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))' }}>
        <input type="search" id="disease-search" placeholder={t('Tafuta ugonjwa', 'Search diseases')} value={q} onChange={(e) => setQ(e.target.value)} />
        <select id="disease-animal" value={animal} onChange={(e) => setAnimal(e.target.value)} aria-label={t('Mnyama', 'Animal')}>
          <option value="all">{t('Wanyama wote', 'All animals')}</option>
          {withDiseases.map((a) => <option key={a.id} value={a.id}>{tx(a)}</option>)}
        </select>
        <select id="disease-level" value={level} onChange={(e) => setLevel(e.target.value)} aria-label={t('Kiwango', 'Level')}>
          <option value="all">{t('Viwango vyote', 'All levels')}</option>
          <option value="red">{t('Hatari', 'Emergency')}</option>
          <option value="amber">{t('Juu', 'High')}</option>
          <option value="green">{t('Wastani', 'Medium')}</option>
        </select>
      </div>
      <p className="small muted">{t(`Magonjwa ${list.length} yamepatikana`, `${list.length} diseases found`)}</p>
      {list.length ? <div className="grid">{list.map((d) => <DiseaseCard key={d.id} d={d} />)}</div>
        : <div className="empty">{t('Hakuna ugonjwa unaolingana. Jaribu neno lingine.', 'No disease matches. Try another word.')}</div>}
    </div>
  )
}

export function DiseaseDetail() {
  const { id } = useParams()
  const { t, tx } = useLang()
  const d = diseaseById(id)
  if (!d) return <div className="empty" style={{ marginTop: 32 }}>{t('Ugonjwa haukupatikana.', 'Disease not found.')} <Link to="/magonjwa">{t('Rudi kwenye maktaba', 'Back to library')}</Link></div>
  const signs = Object.entries(d.signs).sort((a, b) => b[1] - a[1])

  return (
    <article className="stack" style={{ gap: 20, paddingTop: 16, maxWidth: 860, margin: '0 auto' }}>
      <Link to="/magonjwa" className="row small"><IconBack />{t('Maktaba ya magonjwa', 'Disease library')}</Link>
      <header className="stack" style={{ gap: 10 }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}>{tx(d.name)}</h1>
        <Badges d={d} />
        <p className="lede">{tx(d.desc)}</p>
      </header>

      {d.zoonotic && <div className="alert gold"><IconAlert /><span><b>{t('Linda familia yako', 'Protect your family')}</b>{t('Ugonjwa huu unaweza kuambukiza binadamu. Vaa glavu, usile nyama au maziwa ya mnyama mgonjwa, na nenda hospitali ukipata dalili.', 'This disease can infect people. Wear gloves, don’t eat meat or milk from sick animals, and go to hospital if you feel unwell.')}</span></div>}
      {d.notifiable && <div className="alert red"><IconAlert /><span><b>{t('Lazima kuripotiwa', 'Must be reported')}</b>{t('Sheria ya Magonjwa ya Wanyama inataka ugonjwa huu uripotiwe kwa Afisa Mifugo wa Wilaya ndani ya saa 24.', 'The Animal Diseases Act requires this disease to be reported to the District Veterinary Officer within 24 hours.')}</span></div>}

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))' }}>
        <section className="card glass solid">
          <h3>{t('Dalili', 'Signs')}</h3>
          <ul className="clean">{signs.map(([s, w]) => <li key={s}>{tx(SYMPTOMS[s])} {w === 3 && <span className="pill neutral">{t('kuu', 'key')}</span>}</li>)}</ul>
        </section>
        <section className="card glass solid">
          <h3>{t('Huduma ya kwanza', 'First aid')}</h3>
          <ul className="clean">{tx(d.aid).map((a) => <li key={a}>{a}</li>)}</ul>
        </section>
        <section className="card glass solid">
          <h3>{t('Kinga', 'Prevention')}</h3>
          <p>{tx(d.prevent)}</p>
        </section>
        <section className="card glass solid">
          <h3>{t('Wanyama wanaoathirika', 'Animals affected')}</h3>
          <div className="chips">{d.animals.map((a) => <span key={a} className="pill neutral" style={{ fontSize: '0.9rem', padding: '6px 12px' }}>{animalById(a)?.icon} {tx(animalById(a))}</span>)}</div>
          {d.local?.length > 0 && <p className="small muted" style={{ marginTop: 8 }}>{t('Majina mengine', 'Other names')}: {d.local.join(', ')}</p>}
        </section>
      </div>
      <p className="small muted">{t('Matibabu na dawa hutolewa na daktari wa mifugo tu. Maudhui haya ni toleo la majaribio yanayosubiri ukaguzi wa daktari.', 'Treatment and medicines come from a vet only. This content is a test version awaiting vet review.')}</p>
      <Link className="btn primary" to="/angalia" style={{ justifySelf: 'start' }}>{t('Angalia dalili za mnyama wako', 'Check your animal’s signs')}</Link>
    </article>
  )
}
