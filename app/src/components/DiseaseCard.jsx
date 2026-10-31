import { Link } from 'react-router-dom'
import { useLang, S } from '../lib/i18n.jsx'
import Icon from './Icon.jsx'

export function LevelPill({ level }) {
  const { t } = useLang()
  return <span className={`pill ${level}`}>{t(S.levels[level])}</span>
}

export function Flags({ d }) {
  const { t } = useLang()
  if (!d.zoonotic && !d.notifiable) return null
  return (
    <div className="flags">
      {d.zoonotic && <span className="pill violet"><Icon name="people" size={14} /> {t(S.zoonotic)}</span>}
      {d.notifiable && <span className="pill slate"><Icon name="bell" size={14} /> {t(S.notifiable)}</span>}
    </div>
  )
}

export default function DiseaseCard({ d, score, children, compact }) {
  const { t } = useLang()
  return (
    <article className={`dcard glass lvl-${d.level}`}>
      <header>
        <div>
          <h3>{t(d.names)}</h3>
          {!compact && <p className="muted small">{d.local.slice(0, 3).join(' · ')}</p>}
        </div>
        <LevelPill level={d.level} />
      </header>
      {score != null && (
        <div className="meter" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(score * 100)}>
          <i style={{ width: `${Math.round(score * 100)}%` }} />
        </div>
      )}
      <p>{t(d.about)}</p>
      <Flags d={d} />
      {children}
      <Link className="link" to={`/magonjwa/${d.id}`}>
        {t({ sw: 'Soma zaidi', en: 'Read more' })} <Icon name="arrowR" size={16} />
      </Link>
    </article>
  )
}
