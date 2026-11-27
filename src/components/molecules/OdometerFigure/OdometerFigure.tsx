import { motion } from 'motion/react'

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/utils'

export interface OdometerFigureProps {
  className?: string
  unit?: string
  value: string
}

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

export function OdometerFigure({
  className,
  unit,
  value,
}: OdometerFigureProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const characters = value.split('')

  return (
    <div
      aria-label={`${value}${unit ? ` ${unit}` : ''}`}
      className={cn('inline-flex items-start gap-2 md:gap-3', className)}
    >
      <span
        aria-hidden="true"
        className="inline-flex text-[clamp(3.25rem,11vw,9.5rem)] font-normal leading-[0.82] tracking-[-0.04em]"
      >
        {characters.map((char, index) => {
          const digitIndex = DIGITS.indexOf(char)

          if (digitIndex === -1 || prefersReducedMotion) {
            return (
              <span className="inline-block" key={`${char}-${index}`}>
                {char}
              </span>
            )
          }

          return (
            <span
              className="relative inline-block h-[1em] overflow-y-clip align-top"
              key={`${char}-${index}`}
            >
              <motion.span
                animate={{ y: `${-digitIndex * 10}%` }}
                className="flex flex-col will-change-transform"
                initial={{ y: '0%' }}
                transition={{
                  delay: 0.15 + index * 0.12,
                  duration: 1.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {DIGITS.map((digit) => (
                  <span
                    className="block h-[1em] leading-[1em]"
                    key={digit}
                  >
                    {digit}
                  </span>
                ))}
              </motion.span>
            </span>
          )
        })}
      </span>

      {unit && (
        <sup className="mt-1 text-body-s-regular tracking-tight opacity-85 md:mt-2 md:text-body-l-regular">
          {unit}
        </sup>
      )}
    </div>
  )
}
