import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useLang } from '../lib/i18n.jsx'
import { load, save } from '../lib/storage.js'
import { IconAlert, IconBook, IconCalendar, IconHome, IconLeaf, IconSearch, IconWifiOff, Logo } from './Icons.jsx'

export default function Layout() {
  const { lang, setLang, t } = useLang()
  const { pathname } = useLocation()
  const [agreed, setAgreed] = useState(() => load('agreed', false))
  const [online, setOnline] = useState(typeof navigator === 'undefined' ? true : navigator.onLine)

  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  useEffect(() => {
    const on = () => setOnline(true), off = () => setOnline(false)
    window.addEventListener('online', on); window.addEventListener('offline', off)
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off) }
  }, [])

  const links = [
    { to: '/', end: true, sw: 'Mwanzo', en: 'Home', icon: <IconHome /> },
    { to: '/angalia', sw: 'Angalia', en: 'Check', icon: <IconSearch /> },
    { to: '/magonjwa', sw: 'Magonjwa', en: 'Diseases', icon: <IconBook /> },
    { to: '/lishe', sw: 'Lishe', en: 'Feeding', icon: <IconLeaf /> },
    { to: '/mifugo-yangu', sw: 'Mifugo yangu', en: 'My animals', icon: <IconCalendar /> },
  ]

  return (
    <div className="shell">
      <div className="backdrop" aria-hidden="true"><span className="b1" /><span className="b2" /><span className="b3" /></div>

      <div className="container">
        <header className="topbar glass">
          <Link to="/" className="brand" aria-label="FugaBora"><Logo />FugaBora</Link>
          <nav className="topnav" aria-label={t('Menyu kuu', 'Main menu')}>
            {links.map((l) => <NavLink key={l.to} to={l.to} end={l.end}>{t(l.sw, l.en)}</NavLink>)}
            <NavLink to="/msaada">{t('Msaada', 'Help')}</NavLink>
          </nav>
          <div className="seg" role="group" aria-label={t('Lugha', 'Language')}>
            <button type="button" id="lang-sw" aria-pressed={lang === 'sw'} onClick={() => setLang('sw')}>SW</button>
            <button type="button" id="lang-en" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
          </div>
        </header>
        {!online && (
          <div className="alert gold" style={{ marginTop: 12 }} role="status">
            <IconWifiOff />
            <span>{t('Huna intaneti. FugaBora bado inafanya kazi; ripoti zitatumwa ukirudi mtandaoni.', 'You are offline. FugaBora still works; reports will be sent when you are back online.')}</span>
          </div>
        )}
      </div>

      <main className="container"><Outlet /></main>

      <div className="tabbar">
        <nav className="glass" aria-label={t('Menyu kuu', 'Main menu')}>
          {links.map((l) => <NavLink key={l.to} to={l.to} end={l.end}>{l.icon}<span>{t(l.sw, l.en)}</span></NavLink>)}
        </nav>
      </div>

      {!agreed && (
        <div className="modal-scrim" role="dialog" aria-modal="true" aria-labelledby="disc-title">
          <div className="modal glass solid">
            <div className="row" style={{ color: 'var(--gold)' }}><IconAlert /><h2 id="disc-title" style={{ fontSize: '1.6rem', color: 'var(--ink)' }}>{t('Karibu FugaBora', 'Welcome to FugaBora')}</h2></div>
            <p>{t('FugaBora ni chombo cha ushauri tu. Haitoi uchunguzi rasmi na haichukui nafasi ya daktari wa mifugo aliyesajiliwa.', 'FugaBora is an advisory decision-support tool. It does not give a formal diagnosis and does not replace a licensed veterinarian.')}</p>
            <ul className="clean muted">
              <li>{t('Matokeo ni magonjwa yanayowezekana tu.', 'Results are possible diseases only.')}</li>
              <li>{t('Hatutoi vipimo vya dawa. Dawa ni kwa ushauri wa daktari au agrovet.', 'We never give drug doses. Medicines need a vet or agro-vet.')}</li>
              <li>{t('Taarifa za mifugo yako zinabaki kwenye simu yako.', 'Your animal records stay on your phone.')}</li>
            </ul>
            <p className="small muted">{t('Toleo la majaribio: maudhui bado yanakaguliwa na madaktari.', 'Test version: content is still being reviewed by vets.')}</p>
            <button type="button" id="agree" className="btn primary" onClick={() => { save('agreed', true); setAgreed(true) }}>{t('Nimeelewa, endelea', 'I understand, continue')}</button>
          </div>
        </div>
      )}

      <div className="container">
        <footer className="footer glass">
          <div className="stack" style={{ gap: 6 }}>
            <Link to="/" className="brand"><Logo />FugaBora</Link>
            <p className="muted small">{t('Fuga bora, gundua ugonjwa mapema.', 'Keep animals well. Catch sickness early.')}</p>
          </div>
          <div className="stack" style={{ gap: 6 }}>
            <b>{t('Kurasa', 'Pages')}</b>
            <Link to="/msaada">{t('Msaada na mawasiliano', 'Help and contacts')}</Link>
            <Link to="/kuhusu">{t('Kuhusu mradi', 'About the project')}</Link>
          </div>
          <div className="stack" style={{ gap: 6 }}>
            <b>{t('Timu', 'Team')}</b>
            <p className="muted small">Mikocheni B · PMCs · Tanzania</p>
            <p className="muted small" style={{ userSelect: 'all' }}>transittech.do@gmail.com</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
