import type { Variants } from 'motion/react'

export const ROLL_TOTAL_DURATION = 0.5
export const ROLL_LETTER_DURATION = 0.24
export const ROLL_EXIT_OFFSET = 0.1
export const REVEAL_DURATION = 0.9
export const REVEAL_DISTANCE = 32
export const REVEAL_STAGGER = 0.18
export const REVEAL_DELAY = 0.08

export const revealContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: REVEAL_DELAY,
      staggerChildren: REVEAL_STAGGER,
    },
  },
}

export const revealItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: REVEAL_DISTANCE,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: REVEAL_DURATION,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export function getRollStagger(characterCount: number) {
  if (characterCount <= 1) {
    return 0
  }

  return Math.min(
    0.05,
    (ROLL_TOTAL_DURATION - ROLL_LETTER_DURATION - ROLL_EXIT_OFFSET) /
      (characterCount - 1),
  )
}
