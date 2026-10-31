import { useLang } from '../lib/i18n.jsx'
import Icon from '../components/Icon.jsx'

const WEEKS = [
  { sw: 'Mahojiano na maandalizi', en: 'Interviews and setup' },
  { sw: 'Hazina ya maarifa + ukaguzi wa daktari', en: 'Knowledge base + vet review' },
  { sw: 'Muundo na tovuti', en: 'Design and website' },
  { sw: 'Kikagua dalili na maktaba', en: 'Symptom checker and library' },
  { sw: 'Lishe, mifugo yangu, kumbukumbu', en: 'Feeding, my animals, reminders' },
  { sw: 'Supabase na majaribio', en: 'Supabase and testing' },
  { sw: 'Majaribio na wafugaji', en: 'Farmer pilot' },
  { sw: 'Ripoti na wasilisho', en: 'Report and presentation' },
]

const SOURCES = [
  ['Wizara ya Mifugo na Uvuvi: Animal Health Surveillance Strategy 2020–2024', 'https://www.mifugouvuvi.go.tz/'],
  ['Tanzania Veterinary Laboratory Agency (TVLA)', 'https://www.tvla.go.tz/'],
  ['Standard Treatment Guidelines for Animal Diseases in Tanzania (VCT)', 'https://www.vct.go.tz/'],
  ['FAO Animal Production and Health', 'https://www.fao.org/animal-health/en/'],
  ['Merck Veterinary Manual', 'https://www.merckvetmanual.com/'],
  ['GALVmed', 'https://www.galvmed.org/'],
  ['Sokoine University of Agriculture (SUA) repository', 'https://www.suaire.sua.ac.tz/'],
]

export default function About() {
  const { t } = useLang()
  return (
    <>
      <div className="page-head">
        <h1 className="h1">{t({ sw: 'Kuhusu FugaBora', en: 'About FugaBora' })}</h1>
        <p className="lede">
          {t({
            sw: 'Wafugaji wengi Tanzania wanaishi mbali na daktari wa mifugo na hupoteza wanyama kwa magonjwa ambayo yangeweza kugunduliwa mapema. FugaBora ni "daktari mfukoni" wa Kiswahili anayemsaidia mfugaji kujua hatua ya kwanza.',
            en: 'Many Tanzanian keepers live far from a vet and lose animals to diseases that could have been caught early. FugaBora is a Swahili "vet in your pocket" that helps keepers know the first step.',
          })}
        </p>
      </div>

      <div className="cols">
        <section className="glass panel">
          <h2><Icon name="people" /> {t({ sw: 'Timu', en: 'Team' })}</h2>
          <p>{t({ sw: 'Kikundi cha Mikocheni B, Kidato cha Tano, mchepuo wa PMCs (Fizikia, Hisabati, Sayansi ya Kompyuta).', en: 'The Mikocheni B group, Form Five, PMCs stream (Physics, Mathematics, Computer Science).' })}</p>
          <h2><Icon name="shield" /> {t({ sw: 'Usalama', en: 'Safety' })}</h2>
          <ul>
            <li>{t({ sw: 'Tunasema "magonjwa yanayowezekana", si uchunguzi rasmi.', en: 'We say "possible diseases", never a diagnosis.' })}</li>
            <li>{t({ sw: 'Hatutoi majina ya dawa wala vipimo.', en: 'We never give drug names or doses.' })}</li>
            <li>{t({ sw: 'Taarifa zitakaguliwa na Baraza la Veterinari Tanzania (VCT) kabla ya majaribio.', en: 'Content will be reviewed with the Veterinary Council of Tanzania (VCT) before the pilot.' })}</li>
            <li>{t({ sw: 'Ripoti za dalili hutumwa bila jina lako, kusaidia kugundua milipuko.', en: 'Symptom reports are sent without your name, to help detect outbreaks.' })}</li>
          </ul>
        </section>
        <section className="glass panel">
          <h2><Icon name="cal" /> {t({ sw: 'Mpango wa wiki 8', en: '8-week plan' })}</h2>
          <ol className="timeline">
            {WEEKS.map((w, i) => (
              <li key={i} className={i === 0 ? 'on' : ''}>
                <span className="when">{t({ sw: `Wiki ${i + 1}`, en: `Week ${i + 1}` })}</span>
                <b>{t(w)}</b>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section className="glass panel">
        <h2><Icon name="book" /> {t({ sw: 'Vyanzo tunavyotumia', en: 'Sources we use' })}</h2>
        <ul className="sources">
          {SOURCES.map(([n, u]) => (
            <li key={u}><a href={u} target="_blank" rel="noreferrer">{n} <Icon name="globe" size={14} /></a></li>
          ))}
        </ul>
      </section>

      <section className="glass panel">
        <h2><Icon name="phone" /> {t({ sw: 'Wasiliana nasi', en: 'Contact' })}</h2>
        <p>{t({ sw: 'Madaktari wa mifugo, maafisa ugani na washirika mnakaribishwa kukagua na kuboresha FugaBora.', en: 'Vets, extension officers and partners are welcome to review and improve FugaBora.' })}</p>
        <p className="mono selectable">transittech.do@gmail.com</p>
      </section>
    </>
  )
}
