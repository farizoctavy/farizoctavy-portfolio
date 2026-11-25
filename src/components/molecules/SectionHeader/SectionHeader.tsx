import type { FocusEvent, MouseEvent, PointerEvent } from 'react'
import { motion } from 'motion/react'

import { Button } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import { Icon } from '@/components/atoms/Icon'
import { RollingText } from '@/components/atoms/RollingText'
import { useRollingText } from '@/hooks/useRollingText'
import { revealItemVariants } from '@/lib/motion'
import { getAppHref, navigateTo } from '@/lib/navigation'

export interface SectionHeaderProps {
  eyebrow: string
  heading: string
  headingAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  headingId: string
  seeAllHref: string
  seeAllLabel?: string
}

export function SectionHeader({
  eyebrow,
  heading,
  headingAs = 'h2',
  headingId,
  seeAllHref,
  seeAllLabel = 'See all',
}: SectionHeaderProps) {
  const seeAllRoll = useRollingText()

  const handlePointerEnter = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'touch') {
      seeAllRoll.play()
    }
  }

  const handleFocus = (event: FocusEvent<HTMLElement>) => {
    if (event.currentTarget.matches(':focus-visible')) {
      seeAllRoll.play()
    }
  }

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      !seeAllHref.startsWith('/')
    ) {
      return
    }

    event.preventDefault()
    navigateTo(seeAllHref)
  }

  return (
    <motion.div
      className="flex flex-col items-start gap-6 text-left lg:flex-row lg:items-center lg:justify-between"
      variants={revealItemVariants}
    >
      <div>
        <p className="text-body-m-regular text-body-60">{eyebrow}</p>
        <Heading
          as={headingAs}
          className="mt-2 text-[length:var(--text-h1)] font-medium tracking-tight text-title-100"
          id={headingId}
        >
          {heading}
        </Heading>
      </div>

      <Button
        className="section-header-action"
        fillOnHover
        href={
          seeAllHref.startsWith('/') ? getAppHref(seeAllHref) : seeAllHref
        }
        onClick={handleClick}
        onFocus={handleFocus}
        onPointerEnter={handlePointerEnter}
        rightIcon={<Icon className="size-4" name="arrow-up-right" />}
      >
        <RollingText
          isPlaying={seeAllRoll.isPlaying}
          onAnimationComplete={seeAllRoll.complete}
        >
          {seeAllLabel}
        </RollingText>
      </Button>
    </motion.div>
  )
}
