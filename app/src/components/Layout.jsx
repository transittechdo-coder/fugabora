import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Icon from './Icon.jsx'
import Logo from './Logo.jsx'
import Disclaimer from './Disclaimer.jsx'
import { useLang, S } from '../lib/i18n.jsx'

const NAV = [
  { to: '/', icon: 'home', label: S.home, end: true },
  { to: '/kagua', icon: 'search', label: S.check },
  { to: '/magonjwa', icon: 'book', label: S.diseases },
  { to: '/lishe', icon: 'leaf', label: S.feeding },
  { to: '/mifugo-yangu', icon: 'paw', label: S.myAnimals },
]

export default function Layout() {
  const { lang, setLang, t } = useLang()
  const { pathname } = useLocation()
  const [offline, setOffline] = useState(typeof navigator !== 'undefined' && !navigator.onLine)

  useEffect(() => {
    // braces matter: newer browsers return a Promise from scrollTo, which React would treat as a cleanup
    window.scrollTo(0, 0)
  }, [pathname])
  useEffect(() => {
    const on = () => setOffline(false)
    const off = () => setOffline(true)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => {
      window.removeEventListener('online', on)
      window.removeEventListener('offline', off)
    }
  }, [])

  return (
    <>
      <div className="backdrop" aria-hidden="true">
        <span className="b1" />
        <span className="b2" />
        <span className="b3" />
      </div>

      <header className="topbar glass">
        <NavLink to="/" className="brand" aria-label="FugaBora">
          <Logo />
          <span>
            FugaBora
            <small>{t(S.appTag)}</small>
          </span>
        </NavLink>
        <nav className="topnav" aria-label="Main">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end}>
              {t(n.label)}
            </NavLink>
          ))}
          <NavLink to="/kuhusu">{t(S.about)}</NavLink>
        </nav>
        <div className="lang" role="group" aria-label="Language">
          <button type="button" aria-pressed={lang === 'sw'} onClick={() => setLang('sw')}>SW</button>
          <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
        </div>
      </header>

      {offline && (
        <div className="offline glass" role="status">
          <Icon name="wifiOff" size={18} />
          {t({ sw: 'Huna intaneti. FugaBora bado inafanya kazi.', en: "You're offline. FugaBora still works." })}
        </div>
      )}

      <main className="page">
        <Outlet />
      </main>

      <footer className="footer">
        <p>
          <Icon name="shield" size={16} />{' '}
          {t({
            sw: 'FugaBora ni chombo cha ushauri tu. Haitoi uchunguzi rasmi na haichukui nafasi ya daktari wa mifugo aliyesajiliwa.',
            en: 'FugaBora is an advisory tool only. It does not give a formal diagnosis and does not replace a registered veterinarian.',
          })}
        </p>
        <p className="muted">
          FugaBora · Mikocheni B · {t({ sw: 'Kidato cha Tano PMCs', en: 'Form Five PMCs' })} ·{' '}
          <NavLink to="/kuhusu">{t(S.about)}</NavLink>
        </p>
      </footer>

      <nav className="tabbar glass" aria-label="Main">
        {NAV.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.end}>
            <Icon name={n.icon} />
            <span>{t(n.label)}</span>
          </NavLink>
        ))}
      </nav>

      <Disclaimer />
    </>
  )
}
