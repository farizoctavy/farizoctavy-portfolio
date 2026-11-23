import { useEffect } from 'react'

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/utils'
import {
  getRollStagger,
  ROLL_EXIT_OFFSET,
  ROLL_LETTER_DURATION,
} from '@/lib/motion'
import { TextRoll, type TextRollProps } from '@/components/vendor/motion-primitives/TextRoll'

export interface RollingTextProps
  extends Omit<TextRollProps, 'children' | 'className'> {
  children: string
  className?: string
  isPlaying?: boolean
}

export function RollingText({
  children,
  className,
  isPlaying = false,
  onAnimationComplete,
  ...textRollProps
}: RollingTextProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const shouldPlay = isPlaying && !prefersReducedMotion
  const stagger = getRollStagger(children.length)

  useEffect(() => {
    if (isPlaying && prefersReducedMotion) {
      onAnimationComplete?.()
    }
  }, [isPlaying, onAnimationComplete, prefersReducedMotion])

  return (
    <span className={cn('relative inline-block whitespace-nowrap align-baseline', className)}>
      <span aria-hidden="true" className="invisible inline-block whitespace-nowrap">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 inline-block whitespace-nowrap"
      >
        {shouldPlay ? (
          <TextRoll
            {...textRollProps}
            duration={ROLL_LETTER_DURATION}
            getEnterDelay={(index) => index * stagger}
            getExitDelay={(index) => index * stagger + ROLL_EXIT_OFFSET}
            className="inline-block whitespace-nowrap"
            onAnimationComplete={onAnimationComplete}
          >
            {children}
          </TextRoll>
        ) : (
          children
        )}
      </span>
      <span className="sr-only">{children}</span>
    </span>
  )
}
