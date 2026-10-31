import { VACCINES } from '../data/care.js'

const WEEK = 7 * 24 * 3600 * 1000

/**
 * Upcoming care events for one animal record.
 * @param {{species:string, birth:string, done?:Record<string,string>}} rec
 * @param {number} horizonWeeks
 */
export function upcoming(rec, horizonWeeks = 26, now = Date.now()) {
  const plan = VACCINES[rec.species]
  if (!plan || !rec.birth) return []
  const born = new Date(rec.birth).getTime()
  if (Number.isNaN(born)) return []
  const ageW = (now - born) / WEEK
  const out = []
  for (const v of plan) {
    let due = v.at
    if (v.repeatEvery) {
      // next occurrence at or after (age - 2 weeks), so recently missed ones still show as overdue
      while (due < ageW - 2) due += v.repeatEvery
    } else if (due < ageW - 4) {
      continue // one-off already long past
    }
    if (due - ageW > horizonWeeks) continue
    const date = new Date(born + due * WEEK)
    out.push({ ...v, date, overdue: date.getTime() < now - 2 * 24 * 3600 * 1000 })
  }
  return out.sort((a, b) => a.date - b.date)
}

export function ageText(birth, t) {
  const born = new Date(birth).getTime()
  if (Number.isNaN(born)) return ''
  const days = Math.floor((Date.now() - born) / (24 * 3600 * 1000))
  if (days < 0) return ''
  if (days < 7 * 10) return t({ sw: `wiki ${Math.floor(days / 7)}`, en: `${Math.floor(days / 7)} weeks` })
  if (days < 365 * 2) return t({ sw: `miezi ${Math.floor(days / 30.4)}`, en: `${Math.floor(days / 30.4)} months` })
  return t({ sw: `miaka ${Math.floor(days / 365)}`, en: `${Math.floor(days / 365)} years` })
}
