import { Link } from 'react-router-dom'
import { CONTACTS } from '../data/care.js'
import { DISEASES } from '../data/diseases.js'
import { useLang } from '../lib/i18n.jsx'
import { IconAlert } from '../components/Icons.jsx'

export default function Help() {
  const { t, tx } = useLang()
  const notifiable = DISEASES.filter((d) => d.notifiable)
  const zoonotic = DISEASES.filter((d) => d.zoonotic)
  return (
    <div className="stack" style={{ gap: 24, paddingTop: 16 }}>
      <header className="stack" style={{ gap: 8 }}>
        <span className="eyebrow">{t('Msaada', 'Help')}</span>
        <h2>{t('Nani wa kumpigia na wakati gani', 'Who to call, and when')}</h2>
      </header>

      <div className="alert red">
        <IconAlert />
        <div className="stack" style={{ gap: 6 }}>
          <b>{t('Mwite daktari mara moja ukiona:', 'Call a vet at once if you see:')}</b>
          <ul className="clean">
            <li>{t('Vifo vya ghafla au wanyama wengi kuumwa kwa pamoja', 'Sudden deaths or many animals sick at once')}</li>
            <li>{t('Damu nyeusi puani au mdomoni baada ya kifo (USIFUNGUE mzoga)', 'Dark blood from nose or mouth after death (do NOT open the carcass)')}</li>
            <li>{t('Kupumua kwa shida sana, kifafa, au kupooza', 'Severe breathing trouble, fits, or paralysis')}</li>
            <li>{t('Mbwa au mnyama mwenye ukali usio wa kawaida au anayeshindwa kumeza', 'A dog or animal unusually aggressive or unable to swallow')}</li>
            <li>{t('Nguruwe wenye ngozi ya zambarau na homa', 'Pigs with purple skin and fever')}</li>
          </ul>
        </div>
      </div>

      <section className="stack" style={{ gap: 12 }}>
        <h3>{t('Mawasiliano', 'Contacts')}</h3>
        <div className="grid">
          {CONTACTS.map((c) => (
            <div key={c.en} className="card glass solid"><b style={{ fontFamily: 'var(--display)', fontSize: '1.1rem' }}>{tx(c)}</b><p className="muted small">{tx(c.detail)}</p></div>
          ))}
        </div>
        <p className="small muted">{t('Namba za simu za ofisi za wilaya zitaongezwa baada ya kuthibitishwa.', 'District office phone numbers will be added once verified.')}</p>
      </section>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))' }}>
        <section className="card glass solid">
          <h3>{t('Magonjwa ya kuripotiwa (saa 24)', 'Reportable diseases (24 hours)')}</h3>
          <p className="small muted">{t('Kwa mujibu wa Sheria ya Magonjwa ya Wanyama.', 'Under the Animal Diseases Act.')}</p>
          <div className="chips">{notifiable.map((d) => <Link key={d.id} to={`/magonjwa/${d.id}`} className="pill neutral" style={{ fontSize: '0.88rem', padding: '6px 12px', textDecoration: 'none' }}>{tx(d.name)}</Link>)}</div>
        </section>
        <section className="card glass solid">
          <h3>{t('Yanayoambukiza binadamu', 'Spread to people')}</h3>
          <p className="small muted">{t('Chemsha maziwa, pika nyama vizuri, vaa glavu.', 'Boil milk, cook meat well, wear gloves.')}</p>
          <div className="chips">{zoonotic.map((d) => <Link key={d.id} to={`/magonjwa/${d.id}`} className="pill gold" style={{ fontSize: '0.88rem', padding: '6px 12px', textDecoration: 'none' }}>{tx(d.name)}</Link>)}</div>
        </section>
      </div>
    </div>
  )
}
