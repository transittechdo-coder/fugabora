import { useLang } from '../lib/i18n.jsx'
import { cloudEnabled } from '../lib/supabase.js'

const WEEKS = [
  ['Mahojiano na maandalizi', 'Interviews and setup'],
  ['Hazina ya maarifa na ukaguzi wa daktari', 'Knowledge base and vet review'],
  ['Muundo na tovuti', 'Design and website'],
  ['Kikagua dalili na maktaba', 'Symptom checker and library'],
  ['Lishe, mifugo yangu, kumbukumbu', 'Feeding, my animals, reminders'],
  ['Supabase na majaribio', 'Supabase and testing'],
  ['Majaribio na wafugaji', 'Farmer pilot'],
  ['Ripoti na wasilisho', 'Report and presentation'],
]

const SOURCES = [
  'Ministry of Livestock and Fisheries: Animal Health Surveillance Strategy 2020–2024',
  'Tanzania Veterinary Laboratory Agency (TVLA): tvla.go.tz',
  'Standard Treatment Guidelines for Animal Diseases in Tanzania',
  'Animal Diseases (Vaccines and Vaccination) Regulations, 2020',
  'Animal Diseases Act (notifiable diseases)',
  'Merck Veterinary Manual; FAO animal health manuals; GALVmed; SUA repository',
]

export default function About() {
  const { t } = useLang()
  return (
    <div className="stack" style={{ gap: 24, paddingTop: 16, maxWidth: 920, margin: '0 auto' }}>
      <header className="stack" style={{ gap: 8 }}>
        <span className="eyebrow">{t('Kuhusu', 'About')}</span>
        <h2>{t('FugaBora ni nini', 'What FugaBora is')}</h2>
        <p className="lede">{t('Programu ya Kiswahili inayowasaidia wafugaji wa Tanzania kugundua magonjwa mapema, kutoa huduma ya kwanza salama, kulisha vizuri, na kukumbuka chanjo. Imejengwa na kikundi cha Mikocheni B, Kidato cha Tano (PMCs).', 'A Swahili-first app helping Tanzanian livestock keepers spot disease early, give safe first aid, feed well, and remember vaccinations. Built by the Mikocheni B group, Form Five (PMCs).')}</p>
      </header>

      <section className="card glass solid" style={{ padding: 24 }}>
        <h3>{t('Kanuni za usalama', 'Safety rules')}</h3>
        <ul className="clean">
          <li>{t('Tunasema "magonjwa yanayowezekana", si uchunguzi rasmi.', 'We say "possible diseases", never a final diagnosis.')}</li>
          <li>{t('Hatutoi majina ya dawa wala vipimo. Dawa ni kwa daktari au agrovet.', 'No drug names or doses. Medicines go through a vet or agro-vet.')}</li>
          <li>{t('Magonjwa ya kuripotiwa yanaonyeshwa wazi.', 'Reportable diseases are clearly marked.')}</li>
          <li>{t('Maudhui yatakaguliwa na Baraza la Veterinari Tanzania (VCT) kabla ya majaribio.', 'Content will be reviewed by the Veterinary Council of Tanzania (VCT) before the pilot.')}</li>
          <li>{t('Ripoti za dalili hutumwa bila jina wala namba ya simu.', 'Symptom reports are sent without names or phone numbers.')}</li>
        </ul>
      </section>

      <section className="stack" style={{ gap: 12 }}>
        <h3>{t('Mpango wa wiki 8', '8-week plan')}</h3>
        <div className="grid tight" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))' }}>
          {WEEKS.map(([sw, en], i) => (
            <div key={en} className="card glass" style={{ outline: i === 1 ? '2px solid var(--accent)' : 'none' }}>
              <span className="eyebrow">{t('Wiki', 'Week')} {i + 1}{i === 1 ? t(' · sasa', ' · now') : ''}</span>
              <b>{t(sw, en)}</b>
            </div>
          ))}
        </div>
      </section>

      <section className="card glass solid" style={{ padding: 24 }}>
        <h3>{t('Vyanzo', 'Sources')}</h3>
        <ul className="clean small">{SOURCES.map((s) => <li key={s}>{s}</li>)}</ul>
      </section>

      <section className="card glass" style={{ padding: 24 }}>
        <h3>{t('Hali ya mfumo', 'System status')}</h3>
        <div className="list small">
          <div className="spread"><span>{t('Inafanya kazi bila intaneti', 'Works offline')}</span><span className="pill green">{t('Ndiyo', 'Yes')}</span></div>
          <div className="spread"><span>{t('Muunganisho wa wingu (Supabase)', 'Cloud sync (Supabase)')}</span><span className={`pill ${cloudEnabled ? 'green' : 'neutral'}`}>{cloudEnabled ? t('Umeunganishwa', 'Connected') : t('Haujawekwa', 'Not set up')}</span></div>
          <div className="spread"><span>{t('Toleo', 'Version')}</span><span className="pill neutral">0.1.0</span></div>
        </div>
      </section>
    </div>
  )
}
