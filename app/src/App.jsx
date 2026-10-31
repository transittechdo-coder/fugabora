import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import { LangProvider, useLang } from './lib/i18n.jsx'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Check from './pages/Check.jsx'
import { DiseaseList, DiseaseDetail } from './pages/Diseases.jsx'
import Feeding from './pages/Feeding.jsx'
import MyAnimals from './pages/MyAnimals.jsx'
import About from './pages/About.jsx'

function NotFound() {
  const { t } = useLang()
  return (
    <div className="glass panel empty">
      <h1 className="h1">404</h1>
      <p>{t({ sw: 'Ukurasa huu haupo.', en: 'This page does not exist.' })}</p>
      <Link className="btn primary" to="/">{t({ sw: 'Rudi mwanzo', en: 'Go home' })}</Link>
    </div>
  )
}

export default function App() {
  return (
    <LangProvider>
      {/* HashRouter: works on any static host (GitHub Pages, Netlify) and offline without server config */}
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="kagua" element={<Check />} />
            <Route path="magonjwa" element={<DiseaseList />} />
            <Route path="magonjwa/:id" element={<DiseaseDetail />} />
            <Route path="lishe" element={<Feeding />} />
            <Route path="mifugo-yangu" element={<MyAnimals />} />
            <Route path="kuhusu" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </LangProvider>
  )
}
