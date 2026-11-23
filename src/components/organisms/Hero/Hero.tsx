import type { FocusEvent, PointerEvent } from 'react'
import { motion } from 'motion/react'

import { Badge } from '@/components/atoms/Badge'
import { Button } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import { Icon } from '@/components/atoms/Icon'
import { RollingText } from '@/components/atoms/RollingText'
import { ScrollFloatText } from '@/components/molecules/ScrollFloatText'
import RotatingText from '@/components/vendor/reactbits/RotatingText'
import { Text } from '@/components/atoms/Text'
import type { HeroContent } from '@/data/hero'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useRollingText } from '@/hooks/useRollingText'
import { useSplashComplete } from '@/hooks/useSplashComplete'
import { cn } from '@/lib/utils'
import {
  revealContainerVariants,
  revealItemVariants,
} from '@/lib/motion'

export interface HeroProps {
  content: HeroContent
}

export function Hero({ content }: HeroProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const splashComplete = useSplashComplete()
  const workRoll = useRollingText()
  const contactRoll = useRollingText()

  const handleWorkPointerEnter = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'touch') {
      workRoll.play()
    }
  }

  const handleWorkFocus = (event: FocusEvent<HTMLElement>) => {
    if (event.currentTarget.matches(':focus-visible')) {
      workRoll.play()
    }
  }

  const handleContactPointerEnter = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'touch') {
      contactRoll.play()
    }
  }

  const handleContactFocus = (event: FocusEvent<HTMLElement>) => {
    if (event.currentTarget.matches(':focus-visible')) {
      contactRoll.play()
    }
  }

  return (
    <motion.section
      aria-labelledby="hero-title"
      className={cn(
        'content-container flex min-h-[calc(100svh-var(--header-height))] flex-col items-center justify-center py-12 text-center md:py-16 lg:py-20',
        !splashComplete && 'invisible',
      )}
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
        <Badge dot>{content.badge}</Badge>
      </motion.div>

      <Heading
        ariaLabel={`${content.greeting} ${content.name} as a ${content.role}`}
        as="h1"
        className="sr-only"
        id="hero-title"
      >{`${content.greeting} ${content.name} as a ${content.role}`}
      </Heading>
      <motion.div
        aria-hidden="true"
        className="hero-heading mt-8 flex w-full flex-col items-center font-rounded text-title-100"
        variants={revealItemVariants}
      >
        <ScrollFloatText
          containerClassName="m-0 w-full lg:whitespace-nowrap"
          textClassName="hero-heading m-0 w-full"
        >
          {`${content.greeting} ${content.name}`}
        </ScrollFloatText>
        <ScrollFloatText
          containerClassName="m-0 mt-2 w-full"
          textClassName="hero-heading m-0 w-full"
        >
          <span className="hero-role-line flex max-w-full flex-wrap items-baseline justify-center">
            <span>as a</span>
            <span className="hero-role-box inline-flex max-w-[var(--hero-role-max-width)] shrink-0 rounded-none bg-primary-main text-border-10 font-bold whitespace-nowrap">
              <RotatingText
                auto={!prefersReducedMotion}
                direction="up"
                effect="slide"
                highlight
                highlightColor="transparent"
                mainClassName="whitespace-nowrap"
                rotationInterval={2800}
                splitBy="characters"
                texts={content.roles}
              />
            </span>
          </span>
        </ScrollFloatText>
      </motion.div>

      <motion.div className="hero-subtext mt-8" variants={revealItemVariants}>
        <Text className="text-body-2xl-regular text-body-60 md:text-[1.25rem]">
          {content.subtext}
        </Text>
      </motion.div>

      <motion.div
        className="mt-8 flex w-full flex-col items-center gap-3 min-[30rem]:flex-row min-[30rem]:justify-center min-[30rem]:gap-4"
        variants={revealItemVariants}
      >
        <Button
          className="hero-action hover:bg-primary-main focus-visible:bg-primary-main"
          href={content.actions.work.href}
          onFocus={handleWorkFocus}
          onPointerEnter={handleWorkPointerEnter}
          rightIcon={<Icon className="size-4" name="arrow-right" />}
          variant="solid"
        >
          <RollingText
            isPlaying={workRoll.isPlaying}
            onAnimationComplete={workRoll.complete}
          >
            {content.actions.work.label}
          </RollingText>
        </Button>
        <Button
          className="hero-action"
          fillOnHover
          href={content.actions.contact.href}
          onFocus={handleContactFocus}
          onPointerEnter={handleContactPointerEnter}
        >
          <RollingText
            isPlaying={contactRoll.isPlaying}
            onAnimationComplete={contactRoll.complete}
          >
            {content.actions.contact.label}
          </RollingText>
        </Button>
      </motion.div>
    </motion.section>
  )
}
