import { lazy, Suspense, useEffect, useState } from 'react'

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/utils'
import interTightFontUrl from '@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2?url'

const TechText = lazy(() => import('@/components/vendor/reactbits/TechText'))
const TextPressure = lazy(() => import('@/components/vendor/reactbits/TextPressure'))

export interface PressureWordmarkProps {
  className?: string
  text: string
}

export function PressureWordmark({ className, text }: PressureWordmarkProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [isReady, setIsReady] = useState(false)
  const [supportsPressure, setSupportsPressure] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => {
      setSupportsPressure(media.matches)
      setIsReady(true)
    }

    update()
    media.addEventListener('change', update)

    return () => media.removeEventListener('change', update)
  }, [])

  const interactive = isReady && supportsPressure && !prefersReducedMotion

  const fallback = (
    <span className="footer-wordmark-fallback absolute inset-0 flex items-center whitespace-nowrap text-border-10">
      {text}
    </span>
  )

  return (
    <div
      aria-hidden="true"
      className={cn('footer-wordmark-shell relative w-full overflow-visible', className)}
    >
      {interactive ? (
        <Suspense fallback={fallback}>
          <TextPressure
            alpha={false}
            clickRipple={false}
            className="footer-wordmark-title"
            flex
            fontFamily="Inter Tight"
            fontUrl={interTightFontUrl}
            idle="none"
            idleSpeed={1}
            italic={false}
            minFontSize={24}
            radius={0.5}
            scale={false}
            smoothing={0.5}
            stroke={false}
            text={text}
            textColor="var(--color-border-10)"
            weight
            width={false}
          />
          <div className="pointer-events-auto absolute inset-0 text-body-60">
            <TechText
              accentColor="currentColor"
              align="center"
              bounce={0}
              className="size-full"
              clickKick={false}
              color="transparent"
              draggable={false}
              fontFamily="Inter Tight"
              fontSize={256}
              fontWeight={700}
              labels={false}
              letterSpacing={-0.08}
              reveal="letter"
              selection={false}
              speed={1}
              sweep={false}
              text={text}
            />
          </div>
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  )
}
