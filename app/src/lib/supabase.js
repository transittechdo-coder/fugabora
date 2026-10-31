import { createClient } from '@supabase/supabase-js'

// Values come from app/.env.local (never commit real keys). See app/.env.example.
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = url && key ? createClient(url, key) : null
export const online = () => typeof navigator === 'undefined' || navigator.onLine

/** Send an anonymous symptom report for outbreak tracking. Never blocks the app. */
export async function sendReport({ animal, symptoms, topDisease, region }) {
  if (!supabase || !online()) return false
  try {
    const { error } = await supabase.from('symptom_reports').insert({
      animal,
      symptoms,
      top_disease: topDisease ?? null,
      region: region || null,
    })
    return !error
  } catch {
    return false
  }
}
