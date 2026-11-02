import { Link } from 'react-router-dom'
import { ANIMALS } from '../data/animals.js'
import { DISEASES } from '../data/diseases.js'
import { useLang } from '../lib/i18n.jsx'
import { IconAlert, IconArrow, IconBook, IconCalendar, IconLeaf, IconSearch, IconWifiOff } from '../components/Icons.jsx'

export default function Home() {
  const { t, tx } = useLang()
  const features = [
    { to: '/angalia', icon: <IconSearch />, sw: 'Kikagua dalili', en: 'Symptom checker', dsw: 'Gusa dalili, jibu maswali machache, pata magonjwa matatu yanayowezekana zaidi.', den: 'Tap symptoms, answer a few questions, see the three most likely diseases.' },
    { to: '/msaada', icon: <IconAlert />, sw: 'Tahadhari ya hatari', en: 'Danger alerts', dsw: 'Dalili hatari zikionekana, FugaBora inakuambia wazi: mwite daktari sasa.', den: 'When danger signs appear, FugaBora says it plainly: call a vet now.' },
    { to: '/magonjwa', icon: <IconBook />, sw: 'Maktaba ya magonjwa', en: 'Disease library', dsw: `Magonjwa ${DISEASES.length} kwa Kiswahili, pamoja na majina ya kienyeji.`, den: `${DISEASES.length} diseases in Swahili, with local names.` },
    { to: '/lishe', icon: <IconLeaf />, sw: 'Mwongozo wa lishe', en: 'Feeding guide', dsw: 'Chakula sahihi kwa kila hatua na kikokotoo cha kiasi.', den: 'The right feed for each stage, with an amount calculator.' },
    { to: '/mifugo-yangu', icon: <IconCalendar />, sw: 'Kumbukumbu za chanjo', en: 'Vaccine reminders', dsw: 'Andika mifugo yako na uone tarehe za chanjo zinazofuata.', den: 'Record your animals and see upcoming vaccine dates.' },
    { to: '/kuhusu', icon: <IconWifiOff />, sw: 'Bila intaneti', en: 'Works offline', dsw: 'Kila kitu kinafanya kazi vijijini bila mtandao.', den: 'Everything works in villages with no network.' },
  ]

  return (
    <>
      <section className="hero">
        <div className="stack" style={{ gap: 20 }}>
          <span className="eyebrow">{t('Msaidizi wa afya ya mifugo', 'Animal health helper')}</span>
          <h1>{t('Fuga ', 'Keep animals ')}<em>{t('bora', 'well')}</em>{t(', gundua ugonjwa mapema.', '. Catch sickness early.')}</h1>
          <p className="lede">{t('Chagua mnyama, gusa dalili unazoziona, na FugaBora itakuonyesha magonjwa yanayowezekana, huduma ya kwanza, na lini umwite daktari. Kwa Kiswahili, hata bila intaneti.', 'Pick an animal, tap the signs you see, and FugaBora shows possible diseases, first aid, and when to call a vet. In Swahili, even without internet.')}</p>
          <div className="row">
            <Link className="btn primary" to="/angalia">{t('Anza kuangalia dalili', 'Start a symptom check')}<IconArrow /></Link>
            <Link className="btn ghost" to="/magonjwa">{t('Maktaba ya magonjwa', 'Disease library')}</Link>
          </div>
          <div className="stats">
            <div><strong>{ANIMALS.filter((a) => a.checker).length}</strong><span>{t('wanyama kwenye kikagua', 'animals in the checker')}</span></div>
            <div><strong>{DISEASES.length}</strong><span>{t('magonjwa', 'diseases')}</span></div>
            <div><strong>0 TZS</strong><span>{t('bure kwa mfugaji', 'free for farmers')}</span></div>
          </div>
        </div>

        <div className="phone-preview glass" aria-label={t('Mfano wa matokeo', 'Example result')}>
          <div className="spread"><b style={{ fontFamily: 'var(--display)', fontSize: '1.15rem' }}>{t('Matokeo: Kuku', 'Results: Chickens')}</b><span className="pill neutral">{t('Mfano', 'Example')}</span></div>
          <div className="alert red" style={{ padding: '12px 14px' }}><IconAlert /><b style={{ fontSize: '1rem' }}>{t('Mwite daktari wa mifugo sasa', 'Call a vet now')}</b></div>
          {[
            { n: t('Kideri', 'Newcastle disease'), p: 86, c: 'red', l: t('Hatari', 'Emergency') },
            { n: t('Homa ya matumbo', 'Fowl typhoid'), p: 48, c: 'amber', l: t('Juu', 'High') },
            { n: t('Mafua ya kuku', 'CRD / Coryza'), p: 22, c: 'green', l: t('Wastani', 'Medium') },
          ].map((r) => (
            <div key={r.n} className="card glass solid" style={{ padding: 14, gap: 8 }}>
              <div className="spread"><b>{r.n}</b><span className={`pill ${r.c}`}>{r.l}</span></div>
              <div className="meter"><i style={{ width: `${r.p}%` }} /></div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <header><span className="eyebrow">{t('Huduma', 'Features')}</span><h2>{t('Kila kitu mfugaji anahitaji', 'What every keeper needs')}</h2></header>
        <div className="grid">
          {features.map((f) => (
            <Link key={f.to + f.en} to={f.to} className="card glass link">
              <span style={{ width: 46, height: 46, borderRadius: 14, background: 'var(--accent)', color: 'var(--on-accent)', display: 'grid', placeItems: 'center' }}>{f.icon}</span>
              <h3>{t(f.sw, f.en)}</h3>
              <p className="muted">{t(f.dsw, f.den)}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <header>
          <span className="eyebrow">{t('Wanyama', 'Animals')}</span>
          <h2>{t('Mifugo na wanyama wa nyumbani', 'Livestock and pets')}</h2>
          <p className="muted">{t('Wanyama wenye alama ya kijani wako kwenye kikagua dalili sasa. Wengine wanaongezwa hatua kwa hatua baada ya kukaguliwa na daktari.', 'Animals marked green are in the symptom checker now. Others are added step by step after vet review.')}</p>
        </header>
        <div className="grid tight">
          {ANIMALS.map((a) => (
            <div key={a.id} className="card glass" style={{ gap: 4 }}>
              <span style={{ fontSize: '2.2rem', lineHeight: 1 }} aria-hidden="true">{a.icon}</span>
              <b style={{ fontFamily: 'var(--display)', fontSize: '1.15rem' }}>{tx(a)}</b>
              <span className="muted small">{tx(a.use)}</span>
              <span className={`pill ${a.checker ? 'green' : 'neutral'}`} style={{ justifySelf: 'start', marginTop: 6 }}>{a.checker ? t('Inapatikana', 'Available') : t(`Toleo ${a.v}`, `Version ${a.v}`)}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
