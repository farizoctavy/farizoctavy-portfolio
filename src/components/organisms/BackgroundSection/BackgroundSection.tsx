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
      className="content-container py-14 text-left md:py-20 lg:py-28"
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

      <div className="mt-10 grid gap-12 md:mt-20 md:gap-16 lg:mt-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
        <motion.div variants={revealItemVariants}>
          <BackgroundLabel>{content.recognitionLabel}</BackgroundLabel>
          <ul aria-label={content.recognitionLabel} className="mt-4 md:mt-6">
            <Divider orientation="horizontal" />
            {content.recognitions.map((recognition, index) => (
              <li key={`${recognition.title}-${recognition.year}`}>
                <div className="grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-2 py-4 md:grid-cols-[3.75rem_minmax(0,1fr)_auto] md:py-6 lg:grid-cols-[2.75rem_minmax(0,1fr)_auto] lg:gap-4">
                  <span className="text-body-m-regular text-body-60 md:text-body-xl-regular lg:text-body-l-regular">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="min-w-0 text-body-l-regular leading-snug text-title-90 md:text-body-xl-regular lg:text-body-l-regular">
                    {recognition.title}
                  </p>
                  <span className="text-body-m-regular text-body-60 md:text-body-xl-regular lg:text-body-l-regular">
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
            <p className="mobile-background-copy text-title-90">
              {content.education.description}
            </p>
            <p className="mobile-background-value mt-2 tracking-tight text-title-100">
              {content.education.institution}
            </p>
            <p className="mobile-background-copy mt-2 text-title-90">
              {content.education.period}
            </p>
          </div>
          <Divider className="my-6 md:my-8" orientation="horizontal" />
          <div>
            <p className="mobile-background-copy text-title-90">
              {content.education.academicPerformance.label}
            </p>
            <p className="mobile-background-value mt-2 tracking-tight text-title-100">
              {content.education.academicPerformance.value}
            </p>
            <p className="mobile-background-copy mt-2 text-title-90">
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
    <h2 className="mobile-background-label tracking-tight text-body-60">
      {children}
    </h2>
  )
}
