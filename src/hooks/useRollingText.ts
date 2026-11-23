import { useCallback, useRef, useState } from 'react'

import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export function useRollingText() {
  const [isPlaying, setIsPlaying] = useState(false)
  const isPlayingRef = useRef(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  const play = useCallback(() => {
    if (prefersReducedMotion || isPlayingRef.current) {
      return
    }

    isPlayingRef.current = true
    setIsPlaying(true)
  }, [prefersReducedMotion])

  const complete = useCallback(() => {
    isPlayingRef.current = false
    setIsPlaying(false)
  }, [])

  return { complete, isPlaying, play, prefersReducedMotion }
}
