const APP_STORAGE_KEY = 'pokevault-state-v1'

export function loadPersistedState() {
  if (typeof window === 'undefined') {
    return undefined
  }

  try {
    const rawState = window.localStorage.getItem(APP_STORAGE_KEY)
    return rawState ? JSON.parse(rawState) : undefined
  } catch {
    return undefined
  }
}

export function savePersistedState(state) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Ignore localStorage write failures.
  }
}
