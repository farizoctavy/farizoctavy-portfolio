import { useRef, useState, type MouseEvent } from 'react'
import { ArrowDownIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline'
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'

import type { AboutContent, AboutMetricItem } from '@/data/about'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { revealContainerVariants, revealItemVariants } from '@/lib/motion'
import { getAppHref, navigateTo } from '@/lib/navigation'
import { cn } from '@/lib/utils'

export interface AboutShowcaseProps {
  content: AboutContent
}

function ScrollLitMetric({
  metric,
  prefersReducedMotion,
}: {
  metric: AboutMetricItem
  prefersReducedMotion: boolean
}) {
  return (
    <motion.div
      className="border-t border-title-80/50 py-10 md:py-14 lg:py-16"
      initial={prefersReducedMotion ? false : { opacity: 0.25, y: 24 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ amount: 0.55, once: false }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <span className="block text-[clamp(3.75rem,9vw,7.25rem)] font-normal leading-[0.9] tracking-[-0.04em] text-border-10">
        {metric.value}
      </span>
      <p className="mt-3 text-[clamp(1.625rem,3.6vw,3rem)] font-normal leading-[1.08] tracking-[-0.03em] text-border-10">
        <span className="block pl-10 md:pl-20">{metric.labelLines[0]}</span>
        <span className="block">{metric.labelLines[1]}</span>
      </p>
    </motion.div>
  )
}

export function AboutShowcase({ content }: AboutShowcaseProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [expandedExperienceId, setExpandedExperienceId] = useState<
    string | null
  >(content.experience.rows[0]?.id ?? null)

  // Scroll-scrubbed light-to-dark radial dial section (.nmc homage)
  const dialTrackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: dialProgress } = useScroll({
    target: dialTrackRef,
    offset: ['start start', 'end end'],
  })
  const smoothDialProgress = useSpring(dialProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  })

  const dialRotation = useTransform(smoothDialProgress, [0, 1], [0, 120])
  const darkLayerOpacity = useTransform(smoothDialProgress, [0.34, 0.64], [0, 1])
  const lightCopyOpacity = useTransform(smoothDialProgress, [0.22, 0.48], [1, 0])
  const lightCopyY = useTransform(smoothDialProgress, [0.22, 0.48], [0, -28])
  const darkCopyOpacity = useTransform(smoothDialProgress, [0.5, 0.78], [0, 1])
  const darkCopyY = useTransform(smoothDialProgress, [0.5, 0.78], [28, 0])

  const handleInternalLink = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      !href.startsWith('/')
    ) {
      return
    }
    event.preventDefault()
    navigateTo(href)
  }

  const scrollToThesis = () => {
    const element = document.getElementById('about-thesis')
    element?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <article aria-label="About Fariz Oktavian" className="relative w-full">
      {/* 1. STATIONARY FULL-BLEED HERO BEHIND RISING WHITE CURTAIN (.ean) */}
      <section
        aria-labelledby="about-hero-title"
        className="sticky top-0 z-0 flex h-dvh min-h-[34rem] w-full flex-col justify-end overflow-hidden bg-primary-main"
      >
        <motion.img
          alt={content.hero.imageAlt}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 h-full w-full object-cover object-center grayscale"
          initial={prefersReducedMotion ? false : { opacity: 0.4, scale: 1.05 }}
          src={content.hero.imageSrc}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-primary-main/80 via-primary-main/25 to-primary-main/15"
        />

        <motion.div
          animate="visible"
          className="content-container relative z-10 flex flex-col gap-6 pb-8 md:flex-row md:items-end md:justify-between md:pb-12"
          initial={prefersReducedMotion ? false : 'hidden'}
          variants={revealContainerVariants}
        >
          <motion.h1
            className="text-[clamp(2.5rem,7vw,5.75rem)] font-normal leading-[0.98] tracking-[-0.035em] text-border-10"
            id="about-hero-title"
            variants={revealItemVariants}
          >
            {content.hero.lines.map((line) => (
              <span className="block" key={line}>
                {line}
              </span>
            ))}
          </motion.h1>

          <motion.button
            className="touch-target inline-flex items-center gap-2 self-start text-body-m-regular text-border-10/90 transition-opacity hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-border-10 md:self-end"
            onClick={scrollToThesis}
            type="button"
            variants={revealItemVariants}
          >
            <span>{content.hero.scrollLabel}</span>
            <ArrowDownIcon aria-hidden="true" className="size-4" />
          </motion.button>
        </motion.div>
      </section>

      {/* 2A. RISING WHITE CURTAIN #1 — EDITORIAL POSITIONING THESIS (.phv) */}
      <section
        aria-labelledby="about-thesis-heading"
        className="relative z-10 w-full bg-border-10 py-20 text-title-100 md:py-32 lg:py-40"
        id="about-thesis"
      >
        <motion.div
          animate={prefersReducedMotion ? 'visible' : undefined}
          className="content-container"
          initial={prefersReducedMotion ? false : 'hidden'}
          variants={revealContainerVariants}
          viewport={{ amount: 0.2, once: false }}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
        >
          <motion.h2
            className="text-center text-[clamp(2.75rem,9vw,7.5rem)] font-normal leading-[0.92] tracking-[-0.04em] text-title-100"
            id="about-thesis-heading"
            variants={revealItemVariants}
          >
            <span className="block">{content.thesis.displayLines[0]}</span>
            <span className="block">{content.thesis.displayLines[1]}</span>
          </motion.h2>

          <motion.div
            className="mx-auto mt-10 grid max-w-4xl gap-6 md:mt-14 md:grid-cols-2 md:gap-16"
            variants={revealItemVariants}
          >
            <p className="text-body-m-regular leading-relaxed text-body-70 md:text-body-l-regular">
              {content.thesis.leftCaption}
            </p>
            <p className="text-body-m-regular leading-relaxed text-body-70 md:text-body-l-regular">
              {content.thesis.rightCaption}
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* 2B. SECOND STATIONARY FULL-BLEED BACKGROUND PHOTO (event.png) */}
      <section
        aria-label={content.thesis.editorialPhoto.caption}
        className="sticky top-0 z-10 flex h-[80dvh] min-h-[30rem] w-full flex-col justify-end overflow-hidden bg-primary-main md:h-dvh"
      >
        <img
          alt={content.thesis.editorialPhoto.imageAlt}
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="lazy"
          src={content.thesis.editorialPhoto.imageSrc}
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-primary-main/55 via-transparent to-transparent"
        />

        <div className="content-container relative z-10 flex items-center justify-between pb-6 text-body-xs-regular text-border-10/90 md:pb-8 md:text-body-s-regular">
          <span>{content.thesis.editorialPhoto.caption}</span>
          <span>01 / PRACTICE</span>
        </div>
      </section>

      {/* RISING WHITE CURTAIN #2 COVERING PHOTO #2 -> FLOWING INTO DARK CANVAS */}
      <div className="relative z-20 w-full bg-border-10 text-title-100">
        {/* 3. PROFILE MANIFESTO + CV METADATA + RECOGNITION & EDUCATION (.aie) */}
        <section
          aria-labelledby="about-profile-heading"
          className="py-20 md:py-28 lg:py-36"
        >
          <motion.div
            animate={prefersReducedMotion ? 'visible' : undefined}
            className="content-container"
            initial={prefersReducedMotion ? false : 'hidden'}
            variants={revealContainerVariants}
            viewport={{ amount: 0.15, once: false }}
            whileInView={prefersReducedMotion ? undefined : 'visible'}
          >
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
              <motion.dl
                className="border-t border-border-30 lg:col-span-4"
                variants={revealItemVariants}
              >
                {content.profile.metadata.map((row) => (
                  <div
                    className="flex flex-col gap-1 border-b border-border-30 py-4"
                    key={row.label}
                  >
                    <dt className="text-body-xs-regular uppercase tracking-wide text-body-60">
                      {row.label}
                    </dt>
                    <dd className="text-body-l-regular text-title-100">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </motion.dl>

              <motion.div
                className="lg:col-span-7 lg:col-start-6"
                variants={revealItemVariants}
              >
                <div className="relative">
                  <span className="mb-3 block text-body-s-regular text-body-60 md:absolute md:top-2 md:left-0 md:mb-0">
                    {content.profile.label}
                  </span>
                  <h2
                    className="text-[clamp(1.625rem,3.4vw,2.75rem)] font-normal leading-[1.18] tracking-[-0.03em] text-title-100 md:indent-32"
                    id="about-profile-heading"
                  >
                    {content.profile.manifesto}
                  </h2>
                </div>

                <p className="mt-8 max-w-2xl text-body-l-regular leading-relaxed text-body-70 md:mt-10 md:text-body-xl-regular">
                  {content.profile.supportingCopy}
                </p>
              </motion.div>
            </div>

            <div className="mt-20 grid gap-14 border-t border-border-30 pt-14 md:mt-28 md:pt-20 lg:grid-cols-12 lg:gap-10">
              <motion.div
                className="lg:col-span-7"
                variants={revealItemVariants}
              >
                <h3 className="text-body-s-regular uppercase tracking-wide text-body-60">
                  {content.profile.recognitionHeading}
                </h3>
                <ul className="mt-6 border-t border-border-30">
                  {content.profile.recognitions.map((item) => (
                    <li
                      className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 border-b border-border-30 py-4 md:py-5"
                      key={`${item.title}-${item.year}`}
                    >
                      <div>
                        <p className="text-body-l-regular text-title-100 md:text-body-xl-regular">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-body-s-regular text-body-60">
                          {item.organization}
                        </p>
                      </div>
                      <span className="text-body-m-regular text-body-70">
                        {item.year}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                className="lg:col-span-4 lg:col-start-9"
                variants={revealItemVariants}
              >
                <h3 className="text-body-s-regular uppercase tracking-wide text-body-60">
                  {content.profile.educationHeading}
                </h3>

                <div className="mt-6 border-t border-border-30 pt-5">
                  <p className="text-h7-bold font-normal tracking-tight text-title-100">
                    {content.profile.education.institution}
                  </p>
                  <p className="mt-1 text-body-l-regular text-title-90">
                    {content.profile.education.degree}
                  </p>
                  <p className="mt-1 text-body-s-regular text-body-60">
                    {content.profile.education.period}
                  </p>
                </div>

                <div className="mt-8 border-t border-border-30 pt-5">
                  <p className="text-body-xs-regular uppercase tracking-wide text-body-60">
                    {content.profile.education.gpaLabel}
                  </p>
                  <p className="mt-1 text-h4-bold font-normal tracking-tight text-title-100">
                    {content.profile.education.gpaValue}
                  </p>
                  <p className="mt-1 text-body-s-regular text-body-70">
                    {content.profile.education.gpaNote}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* 4. EXPERIENCE INTERACTIVE ARCHITECTURAL TABLE (.lmr) */}
        <section
          aria-labelledby="about-experience-heading"
          className="py-16 md:py-24 lg:py-32"
        >
          <div className="content-container">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <p className="text-body-s-regular uppercase tracking-wide text-body-60">
                  {content.experience.label}
                </p>
                <h2
                  className="mt-3 text-h6-bold font-normal leading-snug tracking-tight text-title-100"
                  id="about-experience-heading"
                >
                  {content.experience.heading}
                </h2>
              </div>

              <div className="border-t border-border-30 lg:col-span-9">
                {content.experience.rows.map((row) => {
                  const isExpanded = expandedExperienceId === row.id

                  return (
                    <div className="border-b border-border-30" key={row.id}>
                      <button
                        aria-expanded={isExpanded}
                        className={cn(
                          'group touch-target grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-3 py-5 text-left transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-main md:grid-cols-[1.2fr_1fr_0.9fr_auto] md:px-5 md:py-6',
                          isExpanded
                            ? 'bg-primary-main text-border-10'
                            : 'bg-transparent text-title-100 hover:bg-primary-main hover:text-border-10',
                        )}
                        onClick={() =>
                          setExpandedExperienceId((curr) =>
                            curr === row.id ? null : row.id,
                          )
                        }
                        type="button"
                      >
                        <span className="text-body-l-regular md:text-body-xl-regular">
                          {row.organization}
                        </span>
                        <span
                          className={cn(
                            'hidden text-body-m-regular transition-colors md:block',
                            isExpanded
                              ? 'text-disable-40'
                              : 'text-body-70 group-hover:text-disable-40',
                          )}
                        >
                          {row.role}
                        </span>
                        <span
                          className={cn(
                            'hidden text-body-m-regular transition-colors md:block',
                            isExpanded
                              ? 'text-disable-40'
                              : 'text-body-60 group-hover:text-disable-40',
                          )}
                        >
                          {row.period}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <span
                            className={cn(
                              'text-body-xs-regular md:hidden',
                              isExpanded
                                ? 'text-disable-40'
                                : 'text-body-60 group-hover:text-disable-40',
                            )}
                          >
                            {row.period}
                          </span>
                          <ArrowUpRightIcon
                            aria-hidden="true"
                            className={cn(
                              'size-4 transition-transform duration-200',
                              isExpanded && 'rotate-90',
                            )}
                          />
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            animate={{ height: 'auto', opacity: 1 }}
                            className="overflow-hidden bg-border-20/70"
                            exit={{ height: 0, opacity: 0 }}
                            initial={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: prefersReducedMotion ? 0 : 0.3,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                          >
                            <div className="grid gap-6 px-4 py-6 md:grid-cols-12 md:px-6 md:py-8">
                              <div className="md:col-span-7">
                                <p className="text-body-s-regular text-body-60 md:hidden">
                                  {row.role} · {row.location}
                                </p>
                                <p className="mt-1 text-body-l-regular leading-relaxed text-title-90 md:mt-0">
                                  {row.summary}
                                </p>
                              </div>
                              <ul className="flex flex-col gap-2 md:col-span-5">
                                {row.highlights.map((highlight) => (
                                  <li
                                    className="flex items-start gap-2.5 text-body-m-regular text-body-70"
                                    key={highlight}
                                  >
                                    <span
                                      aria-hidden="true"
                                      className="mt-2 size-1 shrink-0 rounded-full bg-primary-main"
                                    />
                                    <span>{highlight}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 5. STICKY RADIAL DIAL (01–06) & LIGHT-TO-DARK INVERSION (.nmc) */}
        <section
          aria-label="Capabilities and transition into personal interests"
          className="relative w-full"
          ref={dialTrackRef}
          style={prefersReducedMotion ? undefined : { height: '190dvh' }}
        >
          <div className="sticky top-0 flex h-dvh min-h-[36rem] w-full items-center justify-center overflow-hidden bg-border-10">
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-primary-main"
              style={{
                opacity: prefersReducedMotion ? 1 : darkLayerOpacity,
              }}
            />

            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute flex items-center justify-center"
              style={{
                rotate: prefersReducedMotion ? 0 : dialRotation,
              }}
            >
              <svg
                className="size-[min(86vw,34rem)] md:size-[min(78vh,42rem)]"
                fill="none"
                viewBox="0 0 600 600"
              >
                <circle
                  className="text-body-60"
                  cx="300"
                  cy="300"
                  r="260"
                  stroke="currentColor"
                  strokeOpacity="0.16"
                  strokeWidth="1"
                />
                <circle
                  className="text-body-60"
                  cx="300"
                  cy="300"
                  r="175"
                  stroke="currentColor"
                  strokeDasharray="3 6"
                  strokeOpacity="0.18"
                  strokeWidth="1"
                />
                {content.dialPivot.spokes.map((spoke, index) => {
                  const angleDeg = index * 60 - 90
                  const angleRad = (angleDeg * Math.PI) / 180
                  const x1 = 300 + Math.cos(angleRad) * 175
                  const y1 = 300 + Math.sin(angleRad) * 175
                  const x2 = 300 + Math.cos(angleRad) * 260
                  const y2 = 300 + Math.sin(angleRad) * 260
                  const tx = 300 + Math.cos(angleRad) * 280
                  const ty = 300 + Math.sin(angleRad) * 280

                  return (
                    <g key={spoke.number}>
                      <line
                        className="text-body-60"
                        stroke="currentColor"
                        strokeOpacity="0.22"
                        strokeWidth="1"
                        x1={x1}
                        x2={x2}
                        y1={y1}
                        y2={y2}
                      />
                      <text
                        className="fill-body-60 text-[11px]"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        x={tx}
                        y={ty}
                      >
                        {spoke.number}
                      </text>
                    </g>
                  )
                })}
              </svg>
            </motion.div>

            {!prefersReducedMotion && (
              <motion.div
                className="content-container relative z-10 flex max-w-2xl flex-col items-center text-center"
                style={{ opacity: lightCopyOpacity, y: lightCopyY }}
              >
                <p className="text-body-xs-regular uppercase tracking-widest text-body-60">
                  01 — 06 CAPABILITIES
                </p>
                <h2 className="mt-4 text-[clamp(2rem,5.5vw,4.5rem)] font-normal leading-[1.04] tracking-[-0.035em] text-title-100">
                  <span className="block">
                    {content.dialPivot.lightPhrase[0]}
                  </span>
                  <span className="block">
                    {content.dialPivot.lightPhrase[1]}
                  </span>
                </h2>
                <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-1 text-body-xs-regular text-body-70">
                  {content.dialPivot.spokes.map((spoke) => (
                    <span key={spoke.number}>
                      {spoke.number} {spoke.label}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div
              className="content-container absolute inset-0 z-10 flex flex-col items-center justify-center text-center"
              style={{
                opacity: prefersReducedMotion ? 1 : darkCopyOpacity,
                y: prefersReducedMotion ? 0 : darkCopyY,
              }}
            >
              <p className="text-body-xs-regular uppercase tracking-widest text-disable-50">
                MY INTERESTS
              </p>
              <h2 className="mt-4 text-[clamp(2rem,5.5vw,4.5rem)] font-normal leading-[1.04] tracking-[-0.035em] text-border-10">
                <span className="block">{content.dialPivot.darkPhrase[0]}</span>
                <span className="block">{content.dialPivot.darkPhrase[1]}</span>
              </h2>
              <p className="mt-5 max-w-md text-body-m-regular text-disable-50">
                {content.dialPivot.caption}
              </p>
            </motion.div>
          </div>
        </section>

        {/* 6. DARK CANVAS: STICKY RUNNING PORTRAIT + GIANT SCROLL-LIT METRICS */}
        <section
          aria-labelledby="about-running-heading"
          className="bg-primary-main py-20 text-border-10 md:py-28 lg:py-36"
        >
          <div className="content-container">
            <div className="relative max-w-4xl">
              <span className="mb-3 block text-body-s-regular text-disable-50 md:absolute md:top-2 md:left-0 md:mb-0">
                {content.runningSection.label}
              </span>
              <h2
                className="text-[clamp(1.75rem,4vw,3.25rem)] font-normal leading-[1.14] tracking-[-0.03em] text-border-10 md:indent-40"
                id="about-running-heading"
              >
                {content.runningSection.statement}
              </h2>
            </div>

            <div className="mt-14 grid items-start gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-12">
              <figure className="lg:sticky lg:top-28 lg:col-span-5">
                <div className="aspect-[2/3] w-full overflow-hidden bg-title-90">
                  <img
                    alt={content.runningSection.photoAlt}
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                    src={content.runningSection.photoSrc}
                  />
                </div>
                <figcaption className="mt-3 text-body-xs-regular text-disable-50">
                  {content.runningSection.photoCaption}
                </figcaption>
              </figure>

              <div className="lg:col-span-6 lg:col-start-7">
                {content.runningSection.metrics.map((metric) => (
                  <ScrollLitMetric
                    key={metric.value}
                    metric={metric}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. DARK CANVAS: STAGGERED ASYMMETRIC GALLERY (.lxo) + AI SECTION */}
        <section
          aria-labelledby="about-gallery-heading"
          className="border-t border-title-80/40 bg-primary-main py-20 text-border-10 md:py-28 lg:py-36"
        >
          <div className="content-container">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h2
                className="text-[clamp(2rem,4.5vw,3.75rem)] font-normal leading-tight tracking-[-0.03em] text-border-10"
                id="about-gallery-heading"
              >
                {content.gallery.heading}{' '}
                <span className="text-disable-50">
                  {content.gallery.countLabel}
                </span>
              </h2>

              <a
                className="touch-target inline-flex items-center gap-2 self-start border-b border-border-10 pb-1 text-body-m-regular text-border-10 transition-opacity hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-border-10 md:self-auto"
                href={getAppHref(content.gallery.seeAllHref)}
                onClick={(event) =>
                  handleInternalLink(event, content.gallery.seeAllHref)
                }
              >
                <span>{content.gallery.seeAllLabel}</span>
                <ArrowUpRightIcon aria-hidden="true" className="size-4" />
              </a>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-12 md:gap-8">
              {content.gallery.frames.map((frame) => (
                <motion.a
                  className={cn(
                    'group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-border-10',
                    frame.gridClass,
                  )}
                  href={getAppHref(frame.href)}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
                  key={frame.id}
                  onClick={(event) => handleInternalLink(event, frame.href)}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ amount: 0.15, once: false }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div
                    className={cn(
                      'w-full overflow-hidden bg-title-90',
                      frame.aspectClass,
                    )}
                  >
                    <img
                      alt={frame.imageAlt}
                      className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                      loading="lazy"
                      src={frame.imageSrc}
                    />
                  </div>

                  <div className="mt-3 flex items-baseline justify-between gap-4 border-b border-title-80/40 pb-3">
                    <span className="text-body-m-regular text-border-10">
                      {frame.title}
                    </span>
                    <span className="relative h-5 overflow-hidden text-right text-body-s-regular text-disable-50">
                      <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                        {frame.meta}
                      </span>
                      <span className="block text-border-10 transition-transform duration-300 ease-out group-hover:-translate-y-full">
                        Explore ↗
                      </span>
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* 8. CLOSING AI & DESK CRAFT SPLIT */}
            <div className="mt-24 grid items-start gap-12 border-t border-title-80/40 pt-16 md:mt-32 md:pt-24 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5">
                <p className="text-body-s-regular uppercase tracking-wide text-disable-50">
                  {content.aiSection.label}
                </p>
                <h3 className="mt-4 text-[clamp(1.5rem,3vw,2.25rem)] font-normal leading-snug tracking-[-0.025em] text-border-10">
                  {content.aiSection.statement}
                </h3>
                <p className="mt-6 text-body-l-regular leading-relaxed text-disable-50">
                  {content.aiSection.body}
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
                <figure>
                  <div className="aspect-[4/3] w-full overflow-hidden bg-title-90">
                    <img
                      alt={content.aiSection.primaryPhoto.imageAlt}
                      className="h-full w-full object-cover object-center"
                      loading="lazy"
                      src={content.aiSection.primaryPhoto.imageSrc}
                    />
                  </div>
                  <figcaption className="mt-2.5 text-body-xs-regular text-disable-50">
                    {content.aiSection.primaryPhoto.caption}
                  </figcaption>
                </figure>

                <figure className="sm:mt-12">
                  <div className="aspect-[3/4] w-full overflow-hidden bg-title-90">
                    <img
                      alt={content.aiSection.secondaryPhoto.imageAlt}
                      className="h-full w-full object-cover object-center"
                      loading="lazy"
                      src={content.aiSection.secondaryPhoto.imageSrc}
                    />
                  </div>
                  <figcaption className="mt-2.5 text-body-xs-regular text-disable-50">
                    {content.aiSection.secondaryPhoto.caption}
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
  )
}
