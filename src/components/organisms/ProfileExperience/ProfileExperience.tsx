import { motion } from 'motion/react'

import { Divider } from '@/components/atoms/Divider'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import type { ProfileContent } from '@/data/profile'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useSplashComplete } from '@/hooks/useSplashComplete'
import {
  revealContainerVariants,
  revealItemVariants,
} from '@/lib/motion'

export interface ProfileExperienceProps {
  content: ProfileContent
}

export function ProfileExperience({ content }: ProfileExperienceProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const splashComplete = useSplashComplete()

  return (
    <motion.section
      aria-labelledby="profile-experience-title"
      className="content-container py-14 text-left md:py-20 lg:py-28"
      animate={prefersReducedMotion ? 'visible' : undefined}
      id="about"
      initial={prefersReducedMotion ? false : 'hidden'}
      key={splashComplete ? 'splash-complete' : 'splash-pending'}
      variants={revealContainerVariants}
      viewport={{ amount: 0.14, once: false }}
      whileInView={
        splashComplete && !prefersReducedMotion ? 'visible' : undefined
      }
    >
      <SectionHeader
        eyebrow={content.eyebrow}
        heading={content.heading}
        headingId="profile-experience-title"
        seeAllHref={content.seeAll.href}
        seeAllLabel={content.seeAll.label}
      />

      <div className="mt-10 grid gap-12 md:mt-20 md:gap-20 lg:mt-24 lg:grid-cols-2 lg:gap-16">
        <motion.div
          className="mx-0 w-full max-w-none lg:max-w-prose"
          variants={revealItemVariants}
        >
          <p className="mobile-introduction tracking-tight text-title-90">
            {content.introduction}
          </p>
          <p className="mobile-profile-copy mt-6 text-body-70 md:mt-10 lg:mt-6">
            {content.description}
          </p>
        </motion.div>

        <motion.div
          aria-label="Professional experience"
          className="mx-0 w-full max-w-none lg:max-w-3xl"
          variants={revealItemVariants}
        >
          {content.experiences.map((experience, index) => (
            <article
              className="py-6 first:pt-0 last:pb-0"
              key={`${experience.company}-${experience.title}`}
            >
              <div className="flex flex-col items-start gap-4 md:gap-8 lg:flex-row lg:items-baseline lg:justify-between lg:gap-6">
                <div>
                  <h3 className="mobile-experience-title tracking-tight text-title-100">
                    {experience.title}
                  </h3>
                  <p className="mobile-experience-company mt-1 text-title-90 md:mt-2 lg:mt-1">
                    {experience.company}
                  </p>
                </div>
                <p className="text-body-l-regular text-body-70">
                  {experience.period}
                </p>
              </div>
              <p className="mt-6 text-body-l-regular leading-snug text-body-70 md:mt-10 lg:mt-6">
                {experience.description}
              </p>
              {index < content.experiences.length - 1 && (
                <Divider className="mt-6 lg:mt-6" orientation="horizontal" />
              )}
            </article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
