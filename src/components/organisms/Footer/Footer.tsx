import { Divider } from '@/components/atoms/Divider'
import { ContactCallout } from '@/components/molecules/ContactCallout'
import { FooterBar } from '@/components/molecules/FooterBar'
import { PressureWordmark } from '@/components/molecules/PressureWordmark'
import type { FooterContent } from '@/data/footer'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useSplashComplete } from '@/hooks/useSplashComplete'
import {
  revealContainerVariants,
  revealItemVariants,
} from '@/lib/motion'
import { motion } from 'motion/react'
import { lazy, Suspense, useEffect, useState } from 'react'

const TextCursor = lazy(() => import('@/components/vendor/reactbits/TextCursor'))

export interface FooterProps {
  content: FooterContent
}

export function Footer({ content }: FooterProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const splashComplete = useSplashComplete()
  const [hasFinePointer, setHasFinePointer] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(
      '(min-width: 48rem) and (hover: hover) and (pointer: fine)',
    )
    const updatePointer = () => setHasFinePointer(media.matches)

    updatePointer()
    media.addEventListener('change', updatePointer)

    return () => media.removeEventListener('change', updatePointer)
  }, [])

  return (
    <footer className="relative z-10 bg-primary-main text-border-10" id="contact">
      {hasFinePointer && !prefersReducedMotion && (
        <Suspense fallback={null}>
          <TextCursor
            className="absolute inset-0 z-0 hidden md:block"
            color="currentColor"
            exitDuration={0.6}
            fade={0.65}
            fontFamily="var(--font-primary)"
            fontSize={14}
            fontWeight={600}
            followMouseDirection
            keepUpright
            maxPoints={5}
            mode="stamp"
            popIn
            randomFloat
            removalInterval={34}
            shrink={0.45}
            smoothing={0.28}
            spacing={72}
            style={{
              height: 'auto',
              inset: 0,
              position: 'absolute',
              width: 'auto',
            }}
            text="farizoctavy"
          />
        </Suspense>
      )}
      <motion.div
        className="content-container relative z-10 pb-12 pt-12 md:pb-16 md:pt-16 lg:pb-18 lg:pt-18"
        key={splashComplete ? 'splash-complete' : 'splash-pending'}
        animate={prefersReducedMotion ? 'visible' : undefined}
        initial={prefersReducedMotion ? false : 'hidden'}
        variants={revealContainerVariants}
        viewport={{ amount: 0.2, once: false }}
        whileInView={
          splashComplete && !prefersReducedMotion ? 'visible' : undefined
        }
      >
        <motion.div variants={revealItemVariants}>
          <ContactCallout content={content} />
        </motion.div>
        <motion.div className="mt-10 md:mt-12" variants={revealItemVariants}>
          <PressureWordmark text={content.wordmark} />
        </motion.div>
        <motion.div className="mt-4" variants={revealItemVariants}>
          <Divider orientation="horizontal" />
        </motion.div>
        <motion.div variants={revealItemVariants}>
          <FooterBar content={content} />
        </motion.div>
      </motion.div>
    </footer>
  )
}
