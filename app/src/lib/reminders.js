import { VACCINES } from '../data/care.js'

const DAY = 86400000

/** Next due date for each vaccine/care task, from the animal's birth (or arrival) date. */
export function remindersFor(animal, today = new Date()) {
  const plan = VACCINES[animal.type] || []
  const born = new Date(animal.born)
  if (isNaN(born)) return []
  const ageDays = Math.floor((today - born) / DAY)
  return plan
    .map((v) => {
      let due = v.firstDay
      if (ageDays > v.firstDay) {
        if (!v.everyDays) return null // one-off dose already past
        due = v.firstDay + Math.ceil((ageDays - v.firstDay) / v.everyDays) * v.everyDays
      }
      const date = new Date(born.getTime() + due * DAY)
      const inDays = Math.round((date - today) / DAY)
      return { vaccine: v, date, inDays, animal }
    })
    .filter(Boolean)
    .sort((a, b) => a.date - b.date)
}

export const formatDate = (d, lang) =>
  d.toLocaleDateString(lang === 'en' ? 'en-GB' : 'sw-TZ', { day: 'numeric', month: 'short', year: 'numeric' })
