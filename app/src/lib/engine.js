import { diseasesFor } from '../data/diseases.js'
import { SYMPTOMS } from '../data/symptoms.js'

/**
 * Rule-based scoring. Works fully offline and every result can be checked by a vet.
 * score = 60% coverage of the disease's weighted signs + 40% share of the farmer's
 * symptoms explained by that disease, plus small context bonuses.
 */
export function rankDiseases(animalId, picked, ctx = {}) {
  const ids = picked.filter(Boolean)
  if (!ids.length) return []
  return diseasesFor(animalId)
    .map((d) => {
      let total = 0, hit = 0, matched = 0
      for (const [sym, w] of Object.entries(d.signs)) {
        total += w
        if (ids.includes(sym)) { hit += w; matched++ }
      }
      if (!matched) return null
      let score = (hit / total) * 0.6 + (matched / ids.length) * 0.4
      if (d.young && ctx.young) score += 0.08
      if (ctx.many && (d.notifiable || d.level === 'red')) score += 0.05
      return { disease: d, score: Math.min(score, 0.99), matched }
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
}

/** Red-flag rule: any danger symptom, many animals sick, deaths, or a red top result. */
export function needsVetNow(picked, ctx, results) {
  if (picked.some((id) => SYMPTOMS[id]?.danger)) return true
  if (ctx.many || ctx.deaths) return true
  return results[0]?.disease.level === 'red' && results[0].score >= 0.35
}

export const confidenceLabel = (score, t) =>
  score >= 0.6 ? t('Juu', 'High') : score >= 0.35 ? t('Wastani', 'Medium') : t('Chini', 'Low')
