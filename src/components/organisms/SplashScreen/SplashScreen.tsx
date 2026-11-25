import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

import { Logo } from '@/components/atoms/Logo'
import { navContent } from '@/data/nav'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import {
  revealContainerVariants,
  revealItemVariants,
} from '@/lib/motion'
import { SPLASH_COMPLETE_EVENT } from '@/hooks/useSplashComplete'

type SplashPhase = 'branding' | 'exiting'

export interface SplashScreenProps {
  onComplete?: () => void
}

const BRANDING_HOLD_DURATION = 0.65
const EXIT_DURATION = 1.1

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [phase, setPhase] = useState<SplashPhase>('branding')
  const [brandingRevealed, setBrandingRevealed] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (!isVisible) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isVisible])

  useEffect(() => {
    if (!brandingRevealed) {
      return
    }

    const holdTimer = window.setTimeout(() => {
      setPhase('exiting')
    }, prefersReducedMotion ? 0 : BRANDING_HOLD_DURATION * 1000)

    return () => window.clearTimeout(holdTimer)
  }, [brandingRevealed, prefersReducedMotion])

  useEffect(() => {
    if (isVisible) {
      return
    }

    document.documentElement.dataset.splashComplete = 'true'
    window.dispatchEvent(new Event(SPLASH_COMPLETE_EVENT))
    onComplete?.()
  }, [isVisible, onComplete])

  if (!isVisible) {
    return null
  }

  return (
    <motion.div
      aria-label="FarizOctavy Portfolio introduction"
      className="fixed inset-0 z-[100] isolate overflow-hidden bg-border-10"
      initial={{ y: 0 }}
      animate={{ y: phase === 'exiting' ? '-100%' : 0 }}
      onAnimationComplete={() => {
        if (phase === 'exiting') {
          setIsVisible(false)
        }
      }}
      role="status"
      transition={{
        duration: prefersReducedMotion ? 0.01 : EXIT_DURATION,
        ease: [0.76, 0, 0.24, 1],
      }}
    >
      <motion.div
        className="relative z-10 flex min-h-full items-center justify-center"
        animate="visible"
        initial={prefersReducedMotion ? false : 'hidden'}
        variants={revealContainerVariants}
      >
        <motion.div
          onAnimationComplete={() => setBrandingRevealed(true)}
          variants={revealItemVariants}
        >
          <Logo {...navContent.logo} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
