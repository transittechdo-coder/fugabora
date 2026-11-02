// Offline-first storage on the phone. Every access is wrapped because storage can be
// blocked (private mode, full disk). The app keeps working in memory if it fails.
const PREFIX = 'fugabora:'
const memory = {}

export function load(key, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw == null ? fallback : JSON.parse(raw)
  } catch {
    return key in memory ? memory[key] : fallback
  }
}

export function save(key, value) {
  memory[key] = value
  try { localStorage.setItem(PREFIX + key, JSON.stringify(value)) } catch { /* memory only */ }
}

export const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
