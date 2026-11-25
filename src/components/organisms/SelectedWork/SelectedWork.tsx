import { motion } from 'motion/react'

import { ProjectCard } from '@/components/molecules/ProjectCard'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import type { Project } from '@/data/projects'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useSplashComplete } from '@/hooks/useSplashComplete'
import { revealContainerVariants } from '@/lib/motion'

export interface SelectedWorkProps {
  projects: Project[]
}

export function SelectedWork({ projects }: SelectedWorkProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const splashComplete = useSplashComplete()

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
      <SectionHeader
        eyebrow="02 - Turning complexity into experiences that feel clear and useful."
        heading="Selected work."
        headingAs="h1"
        headingId="selected-work-title"
        seeAllHref="/work"
      />

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
