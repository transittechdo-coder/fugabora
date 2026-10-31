// Offline-first storage on the phone. Every access is wrapped because storage can be blocked.
const KEY = 'fugabora:'

export function load(name, fallback) {
  try {
    const raw = localStorage.getItem(KEY + name)
    return raw == null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function save(name, value) {
  try {
    localStorage.setItem(KEY + name, JSON.stringify(value))
  } catch {
    /* storage full or blocked: app keeps working in memory */
  }
}

export const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
