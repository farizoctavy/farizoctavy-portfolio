import { motion } from 'motion/react'

import { Divider } from '@/components/atoms/Divider'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import type { BackgroundContent } from '@/data/background'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useSplashComplete } from '@/hooks/useSplashComplete'
import {
  revealContainerVariants,
  revealItemVariants,
} from '@/lib/motion'

export interface BackgroundSectionProps {
  content: BackgroundContent
}

export function BackgroundSection({ content }: BackgroundSectionProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const splashComplete = useSplashComplete()

  return (
    <motion.section
      aria-labelledby="background-title"
      className="content-container py-16 text-left md:py-20 lg:py-28"
      id="background"
      initial={prefersReducedMotion ? false : 'hidden'}
      animate={prefersReducedMotion ? 'visible' : undefined}
      key={splashComplete ? 'splash-complete' : 'splash-pending'}
      variants={revealContainerVariants}
      viewport={{ amount: 0.12, once: false }}
      whileInView={
        splashComplete && !prefersReducedMotion ? 'visible' : undefined
      }
    >
      <SectionHeader
        eyebrow={content.eyebrow}
        heading={content.heading}
        headingId="background-title"
        seeAllHref={content.seeAll.href}
        seeAllLabel={content.seeAll.label}
      />

      <div className="mt-16 grid gap-16 md:mt-20 lg:mt-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
        <motion.div variants={revealItemVariants}>
          <BackgroundLabel>{content.recognitionLabel}</BackgroundLabel>
          <ul aria-label={content.recognitionLabel} className="mt-6">
            <Divider orientation="horizontal" />
            {content.recognitions.map((recognition, index) => (
              <li key={`${recognition.title}-${recognition.year}`}>
                <div className="grid grid-cols-[3.75rem_minmax(0,1fr)_auto] items-center gap-2 py-6 lg:grid-cols-[2.75rem_minmax(0,1fr)_auto] lg:gap-4">
                  <span className="text-body-xl-regular text-body-60 lg:text-body-l-regular">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="min-w-0 text-body-xl-regular leading-snug text-title-90 lg:text-body-l-regular">
                    {recognition.title}
                  </p>
                  <span className="text-body-xl-regular text-body-60 lg:text-body-l-regular">
                    {recognition.year}
                  </span>
                </div>
                <Divider orientation="horizontal" />
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={revealItemVariants}>
          <BackgroundLabel>{content.educationLabel}</BackgroundLabel>
          <div className="mt-6">
            <p className="text-body-xl-regular text-title-90 lg:text-body-l-regular">
              {content.education.description}
            </p>
            <p className="mt-2 text-h5-bold leading-tight tracking-tight text-title-100 lg:text-h6-bold">
              {content.education.institution}
            </p>
            <p className="mt-2 text-body-xl-regular text-title-90 lg:text-body-l-regular">
              {content.education.period}
            </p>
          </div>
          <Divider className="my-8" orientation="horizontal" />
          <div>
            <p className="text-body-xl-regular text-title-90 lg:text-body-l-regular">
              {content.education.academicPerformance.label}
            </p>
            <p className="mt-2 text-h5-bold leading-tight tracking-tight text-title-100 lg:text-h6-bold">
              {content.education.academicPerformance.value}
            </p>
            <p className="mt-2 text-body-xl-regular text-title-90 lg:text-body-l-regular">
              {content.education.academicPerformance.supportingText}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

function BackgroundLabel({ children }: { children: string }) {
  return (
    <h2 className="text-h5-bold leading-tight tracking-tight text-body-60 lg:text-h7-bold">
      {children}
    </h2>
  )
}
