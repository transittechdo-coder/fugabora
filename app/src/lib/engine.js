// FugaBora rule-based scoring engine. Runs fully offline.
import { diseasesFor } from '../data/diseases.js'
import { symptomById } from '../data/symptoms.js'

/**
 * @param {string} animalId
 * @param {string[]} picked  symptom ids
 * @param {{many:boolean, young:boolean, days:number}} ctx
 * @returns {{results:{disease:object, score:number, matched:string[]}[], danger:boolean, reasons:string[]}}
 */
export function check(animalId, picked, ctx = {}) {
  const set = new Set(picked)
  const reasons = []

  const results = diseasesFor(animalId)
    .map((d) => {
      const entries = Object.entries(d.signs)
      const total = entries.reduce((s, [, w]) => s + w, 0)
      const matched = entries.filter(([id]) => set.has(id))
      if (!matched.length) return null
      const hit = matched.reduce((s, [, w]) => s + w, 0)
      const keyHit = matched.some(([, w]) => w === 3)
      // coverage of the disease's signs, and how much of what the farmer saw it explains
      let score = (hit / total) * 0.55 + (matched.length / set.size) * 0.35 + (keyHit ? 0.1 : 0)
      if (d.young && ctx.young) score += 0.08
      if (d.young && ctx.young === false) score -= 0.08
      if (ctx.many && (d.notifiable || d.signs.many_sick)) score += 0.05
      return { disease: d, score: Math.max(0, Math.min(1, score)), matched: matched.map(([id]) => id) }
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  const dangerSigns = picked.filter((id) => symptomById(id)?.danger)
  if (dangerSigns.length) reasons.push('danger_sign')
  if (ctx.many) reasons.push('many')
  if (results[0] && results[0].disease.level === 'red' && results[0].score >= 0.35) reasons.push('red_disease')
  if (results.some((r) => r.disease.notifiable && r.score >= 0.35)) reasons.push('notifiable')
  if (results.some((r) => r.disease.zoonotic && r.score >= 0.35)) reasons.push('zoonotic')

  const danger = reasons.some((r) => ['danger_sign', 'many', 'red_disease'].includes(r))
  return { results, danger, reasons }
}

export const confidence = (score) => (score >= 0.6 ? 'high' : score >= 0.35 ? 'medium' : 'low')
