import { useSyncExternalStore } from 'react'

import { getAppPath } from '@/lib/navigation'

function subscribe(callback: () => void) {
  window.addEventListener('popstate', callback)

  return () => window.removeEventListener('popstate', callback)
}

function getSnapshot() {
  return getAppPath()
}

function getServerSnapshot() {
  return '/'
}

export function useCurrentPath() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
