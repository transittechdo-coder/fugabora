import { BrowserRouter, HashRouter, MemoryRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Checker from './pages/Checker.jsx'
import { DiseaseDetail, DiseaseList } from './pages/Diseases.jsx'
import Feeding from './pages/Feeding.jsx'
import MyAnimals from './pages/MyAnimals.jsx'
import Help from './pages/Help.jsx'
import About from './pages/About.jsx'
import { LangProvider } from './lib/i18n.jsx'

// VITE_ROUTER: "browser" for a real host (Netlify), "hash" for GitHub Pages, "memory" for the single-file preview.
const mode = import.meta.env.VITE_ROUTER || 'browser'
const Router = mode === 'memory' ? MemoryRouter : mode === 'hash' ? HashRouter : BrowserRouter

export default function App() {
  return (
    <LangProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="angalia" element={<Checker />} />
            <Route path="magonjwa" element={<DiseaseList />} />
            <Route path="magonjwa/:id" element={<DiseaseDetail />} />
            <Route path="lishe" element={<Feeding />} />
            <Route path="mifugo-yangu" element={<MyAnimals />} />
            <Route path="msaada" element={<Help />} />
            <Route path="kuhusu" element={<About />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </LangProvider>
  )
}
