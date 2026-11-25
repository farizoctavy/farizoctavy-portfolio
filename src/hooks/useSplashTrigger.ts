import { useCallback, useEffect, useRef, useState } from 'react'

export const SPLASH_INACTIVITY_THRESHOLD = 5 * 60 * 1000

const SPLASH_INITIALIZED_KEY = 'farizoctavy:splash-initialized'
const SPLASH_HIDDEN_AT_KEY = 'farizoctavy:splash-hidden-at'
const SPLASH_ELIGIBLE_KEY = 'farizoctavy:splash-eligible'

function getSessionStorage() {
  try {
    return window.sessionStorage
  } catch {
    return null
  }
}

function consumeSplashTrigger() {
  const storage = getSessionStorage()

  if (!storage) {
    return true
  }

  const shouldPlay =
    storage.getItem(SPLASH_INITIALIZED_KEY) !== 'true' ||
    storage.getItem(SPLASH_ELIGIBLE_KEY) === 'true'

  if (shouldPlay) {
    storage.setItem(SPLASH_INITIALIZED_KEY, 'true')
    storage.removeItem(SPLASH_ELIGIBLE_KEY)
  }

  return shouldPlay
}

function initializeSplashSession() {
  getSessionStorage()?.setItem(SPLASH_INITIALIZED_KEY, 'true')
}

export function useSplashTrigger(
  isHome: boolean,
  threshold = SPLASH_INACTIVITY_THRESHOLD,
) {
  const [shouldPlay, setShouldPlay] = useState(() => {
    if (!isHome) {
      initializeSplashSession()
      return false
    }

    return consumeSplashTrigger()
  })
  const hasMounted = useRef(false)

  const complete = useCallback(() => {
    setShouldPlay(false)
  }, [])

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true
      return
    }

    setShouldPlay(isHome ? consumeSplashTrigger() : false)
  }, [isHome])

  useEffect(() => {
    const handleVisibilityChange = () => {
      const storage = getSessionStorage()

      if (!storage) {
        return
      }

      if (document.visibilityState === 'hidden') {
        if (!storage.getItem(SPLASH_HIDDEN_AT_KEY)) {
          storage.setItem(SPLASH_HIDDEN_AT_KEY, String(Date.now()))
        }
        return
      }

      const hiddenAt = Number(storage.getItem(SPLASH_HIDDEN_AT_KEY))
      storage.removeItem(SPLASH_HIDDEN_AT_KEY)

      if (!hiddenAt || Date.now() - hiddenAt < threshold) {
        return
      }

      storage.setItem(SPLASH_ELIGIBLE_KEY, 'true')

      if (isHome) {
        storage.removeItem(SPLASH_ELIGIBLE_KEY)
        storage.setItem(SPLASH_INITIALIZED_KEY, 'true')
        setShouldPlay(true)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [isHome, threshold])

  return { complete, shouldPlay }
}
