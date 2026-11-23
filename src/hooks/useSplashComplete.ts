import { useSyncExternalStore } from 'react'

export const SPLASH_COMPLETE_EVENT = 'farizoctavy:splash-complete'

function subscribe(callback: () => void) {
  window.addEventListener(SPLASH_COMPLETE_EVENT, callback)

  return () => window.removeEventListener(SPLASH_COMPLETE_EVENT, callback)
}

function getSnapshot() {
  return document.documentElement.dataset.splashComplete === 'true'
}

function getServerSnapshot() {
  return false
}

export function useSplashComplete() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
