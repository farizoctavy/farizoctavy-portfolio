import type { FocusEvent, PointerEvent } from 'react'
import { motion } from 'motion/react'

import { Button } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import { Icon } from '@/components/atoms/Icon'
import { RollingText } from '@/components/atoms/RollingText'
import { ProjectCard } from '@/components/molecules/ProjectCard'
import type { Project } from '@/data/projects'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useRollingText } from '@/hooks/useRollingText'
import { useSplashComplete } from '@/hooks/useSplashComplete'
import {
  revealContainerVariants,
  revealItemVariants,
} from '@/lib/motion'

export interface SelectedWorkProps {
  projects: Project[]
}

export function SelectedWork({ projects }: SelectedWorkProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const splashComplete = useSplashComplete()
  const seeAllRoll = useRollingText()

  const handleSeeAllPointerEnter = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'touch') {
      seeAllRoll.play()
    }
  }

  const handleSeeAllFocus = (event: FocusEvent<HTMLElement>) => {
    if (event.currentTarget.matches(':focus-visible')) {
      seeAllRoll.play()
    }
  }

  return (
    <motion.section
      aria-labelledby="selected-work-title"
      className="content-container pb-20 pt-12 md:pb-24 md:pt-16 lg:pb-32 lg:pt-20"
      id="work"
      key={splashComplete ? 'splash-complete' : 'splash-pending'}
      animate={prefersReducedMotion ? 'visible' : undefined}
      initial={prefersReducedMotion ? false : 'hidden'}
      variants={revealContainerVariants}
      viewport={{ amount: 0.12, once: false }}
      whileInView={
        splashComplete && !prefersReducedMotion ? 'visible' : undefined
      }
    >
      <motion.div
        className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        variants={revealItemVariants}
      >
        <div>
          <p className="text-body-m-regular text-body-70">
            01 - Turning complexity into experiences that feel clear and useful.
          </p>
          <Heading
            className="mt-2 text-h1-bold tracking-tight text-title-100 lg:text-[4rem] lg:leading-tight"
            id="selected-work-title"
          >
            Selected work.
          </Heading>
        </div>
        <Button
          className="self-start md:self-auto"
          fillOnHover
          href="/work"
          onFocus={handleSeeAllFocus}
          onPointerEnter={handleSeeAllPointerEnter}
          rightIcon={<Icon className="size-4" name="arrow-up-right" />}
        >
          <RollingText
            isPlaying={seeAllRoll.isPlaying}
            onAnimationComplete={seeAllRoll.complete}
          >
            See all
          </RollingText>
        </Button>
      </motion.div>

      <motion.ul
        aria-label="Selected projects"
        className="mt-10"
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.title} index={index} project={project} />
        ))}
      </motion.ul>
    </motion.section>
  )
}
