import { Link } from 'react-router-dom'
import { LEVELS } from '../data/diseases.js'
import { useLang } from '../lib/i18n.jsx'

export const levelClass = (lvl) => ({ red: 'red', amber: 'amber', green: 'green' }[lvl])

export function Badges({ d }) {
  const { t, tx } = useLang()
  return (
    <span className="row" style={{ gap: 6 }}>
      <span className={`pill ${levelClass(d.level)}`}>{tx(LEVELS[d.level])}</span>
      {d.zoonotic && <span className="pill gold">{t('Huambukiza binadamu', 'Spreads to people')}</span>}
      {d.notifiable && <span className="pill neutral">{t('Ripoti saa 24', 'Report in 24h')}</span>}
    </span>
  )
}

export default function DiseaseCard({ d, score, children }) {
  const { t, tx } = useLang()
  return (
    <article className="card glass solid">
      <div className="spread">
        <h3>{tx(d.name)}</h3>
        <Badges d={d} />
      </div>
      <p className="muted">{tx(d.desc)}</p>
      {score != null && (
        <div className="stack" style={{ gap: 4 }}>
          <div className="spread small muted"><span>{t('Ulinganifu', 'Match')}</span><span>{Math.round(score * 100)}%</span></div>
          <div className="meter" role="img" aria-label={`${Math.round(score * 100)}%`}><i style={{ width: `${Math.round(score * 100)}%` }} /></div>
        </div>
      )}
      {children}
      <Link to={`/magonjwa/${d.id}`} className="small">{t('Soma zaidi', 'Read more')}</Link>
    </article>
  )
}
