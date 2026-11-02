import { createClient } from '@supabase/supabase-js'

// Keys come from .env.local (never commit real keys). See .env.example.
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = url && key ? createClient(url, key) : null
export const cloudEnabled = Boolean(supabase)

/**
 * Sends an anonymous symptom report (animal, symptoms, region, top result) for outbreak
 * tracking. No names or phone numbers. Silently skipped when offline or not configured.
 */
export async function sendReport(report) {
  if (!supabase || !navigator.onLine) return { queued: true }
  const { error } = await supabase.from('symptom_reports').insert(report)
  return { error }
}
