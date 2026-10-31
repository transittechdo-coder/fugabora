import { Link } from 'react-router-dom'
import { useLang, S } from '../lib/i18n.jsx'
import { ANIMALS, GROUPS } from '../data/animals.js'
import { DISEASES } from '../data/diseases.js'
import Icon from '../components/Icon.jsx'

const FEATURES = [
  { to: '/kagua', icon: 'search', t: S.check, d: { sw: 'Chagua mnyama, gusa dalili, pata magonjwa 3 yanayowezekana na nini cha kufanya.', en: 'Pick an animal, tap signs, get the 3 most likely diseases and what to do.' } },
  { to: '/magonjwa', icon: 'book', t: S.diseases, d: { sw: 'Maktaba ya magonjwa kwa Kiswahili, pamoja na majina ya kienyeji.', en: 'A Swahili disease library, including local names.' } },
  { to: '/lishe', icon: 'leaf', t: S.feeding, d: { sw: 'Chakula sahihi kwa kila hatua ya ukuaji na kikokotoo cha kiasi.', en: 'The right feed for each growth stage, with an amount calculator.' } },
  { to: '/mifugo-yangu', icon: 'cal', t: S.myAnimals, d: { sw: 'Andika mifugo yako upate kumbukumbu za chanjo na kuogesha.', en: 'Record your animals and get vaccine and dipping reminders.' } },
]

export default function Home() {
  const { t } = useLang()
  const ready = ANIMALS.filter((a) => a.phase <= 2)
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">{t(S.appTag)}</span>
          <h1>
            {t({ sw: 'Fuga bora.', en: 'Keep animals well.' })}
            <br />
            <em>{t({ sw: 'Gundua ugonjwa mapema.', en: 'Catch sickness early.' })}</em>
          </h1>
          <p className="lede">
            {t({
              sw: 'FugaBora inamsaidia mfugaji kutambua magonjwa yanayowezekana, kutoa huduma ya kwanza salama, kulisha vizuri na kukumbuka chanjo. Kwa Kiswahili, hata bila intaneti.',
              en: 'FugaBora helps keepers spot possible diseases, give safe first aid, feed well and remember vaccines. In Swahili, even without internet.',
            })}
          </p>
          <div className="row gap wrap">
            <Link to="/kagua" className="btn primary lg">
              <Icon name="search" /> {t({ sw: 'Kagua dalili sasa', en: 'Check symptoms now' })}
            </Link>
            <Link to="/magonjwa" className="btn glass-btn lg">{t({ sw: 'Soma magonjwa', en: 'Browse diseases' })}</Link>
          </div>
        </div>
        <div className="hero-stats glass">
          <div><strong>{ANIMALS.length}</strong><span>{t({ sw: 'aina za wanyama', en: 'kinds of animals' })}</span></div>
          <div><strong>{DISEASES.length}</strong><span>{t({ sw: 'magonjwa kwenye maktaba', en: 'diseases in the library' })}</span></div>
          <div><strong>24/7</strong><span>{t({ sw: 'inafanya kazi bila mtandao', en: 'works offline' })}</span></div>
          <div><strong>0 TZS</strong><span>{t({ sw: 'bure kwa mfugaji', en: 'free for keepers' })}</span></div>
        </div>
      </section>

      <section className="emergency glass">
        <Icon name="alert" size={26} />
        <div>
          <h2>{t({ sw: 'Dalili hizi? Mwite daktari sasa', en: 'See these? Call a vet now' })}</h2>
          <p>
            {t({
              sw: 'Vifo vya ghafla · Wanyama wengi kuumwa pamoja · Damu kutoka puani au mdomoni baada ya kifo · Tumbo kuvimba upande wa kushoto · Mbwa mkali asiye wa kawaida',
              en: 'Sudden deaths · Many animals sick at once · Blood from nose or mouth after death · Swollen left belly · A dog suddenly aggressive',
            })}
          </p>
        </div>
      </section>

      <section>
        <h2 className="h2">{t({ sw: 'FugaBora inafanya nini', en: 'What FugaBora does' })}</h2>
        <div className="grid4">
          {FEATURES.map((f) => (
            <Link key={f.to} to={f.to} className="feature glass">
              <span className="ico"><Icon name={f.icon} /></span>
              <h3>{t(f.t)}</h3>
              <p>{t(f.d)}</p>
              <span className="link">{t({ sw: 'Fungua', en: 'Open' })} <Icon name="arrowR" size={16} /></span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="h2">{t({ sw: 'Wanyama tunaowahudumia', en: 'Animals we cover' })}</h2>
        <p className="sub">
          {t({
            sw: 'Kikagua dalili kinafanya kazi kwa wanyama hawa sasa. Wengine wanaongezwa baada ya kukaguliwa na daktari wa mifugo.',
            en: 'The checker works for these animals now. Others are added after vet review.',
          })}
        </p>
        <div className="animals">
          {ANIMALS.map((a) => {
            const on = a.phase <= 2
            return on ? (
              <Link key={a.id} to={`/kagua?mnyama=${a.id}`} className="animal glass">
                <b>{t(a)}</b>
                <span>{t(a.use)}</span>
                <span className="pill green">{t(GROUPS[a.group])}</span>
              </Link>
            ) : (
              <div key={a.id} className="animal glass dim">
                <b>{t(a)}</b>
                <span>{t(a.use)}</span>
                <span className="pill slate">{t(S.comingSoon)}</span>
              </div>
            )
          })}
        </div>
        <p className="muted small">{t({ sw: `Tayari: ${ready.length} kati ya ${ANIMALS.length}`, en: `Ready: ${ready.length} of ${ANIMALS.length}` })}</p>
      </section>
    </>
  )
}
