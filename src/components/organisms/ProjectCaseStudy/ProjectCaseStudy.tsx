import { useRef, useState, type MouseEvent } from 'react'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useInView,
  useScroll,
  useSpring,
} from 'motion/react'

import { DesignPlansViewer } from '@/components/molecules/DesignPlansViewer'
import { OdometerFigure } from '@/components/molecules/OdometerFigure'
import type { CaseStudyContent } from '@/data/caseStudies'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { revealContainerVariants, revealItemVariants } from '@/lib/motion'
import { getAppHref, navigateTo } from '@/lib/navigation'
import { cn } from '@/lib/utils'

export interface ProjectCaseStudyProps {
  content: CaseStudyContent
}

type GalleryMode = 'detail' | 'masonry' | 'slider'

export function ProjectCaseStudy({ content }: ProjectCaseStudyProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [galleryMode, setGalleryMode] = useState<GalleryMode>('detail')
  const [sliderIndex, setSliderIndex] = useState(0)

  const gallerySectionRef = useRef<HTMLElement>(null)
  const isGalleryInView = useInView(gallerySectionRef, {
    margin: '-18% 0px -18% 0px',
  })

  // Top 3px Vision Mansion scroll progress hairline (.yap)
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.3,
  })

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

  // Distribute flat images into 3 balanced columns for Masonry mode
  const masonryColumns = [0, 1, 2].map((colIdx) =>
    content.gallery.images.filter((_, idx) => idx % 3 === colIdx),
  )

  const activeSliderImage =
    content.gallery.images[sliderIndex] ?? content.gallery.images[0]

  return (
    <article
      aria-label={`${content.titleLines.join(' ')} Case Study`}
      className="relative w-full"
    >
      {/* Top 3px Scroll Progress Hairline (Vision Mansion .yap) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 right-0 left-0 z-[60] h-[3px] origin-left bg-primary-main"
        style={{ scaleX: prefersReducedMotion ? 0 : smoothProgress }}
      />

      {/* 1. STATIONARY EDITORIAL HERO (Uncropped Above-the-Fold + Rising Curtain) */}
      <section
        aria-labelledby="case-study-hero-title"
        className="sticky top-[var(--main-padding-top)] z-0 w-full bg-border-10 text-title-100 lg:top-[var(--main-padding-top-lg)]"
      >
        <motion.div
          animate="visible"
          className="content-container flex flex-col gap-6 pt-5 pb-6 md:gap-8 md:pt-8 md:pb-10"
          initial={prefersReducedMotion ? false : 'hidden'}
          variants={revealContainerVariants}
        >
          {/* Top Row: Stacked 2-Line Project Title + Giant Odometer Metric */}
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <motion.h1
              className="text-[clamp(2.25rem,5.5vw,4.5rem)] font-normal leading-[0.94] tracking-[-0.035em] text-title-100"
              id="case-study-hero-title"
              variants={revealItemVariants}
            >
              <span className="block">{content.titleLines[0]}</span>
              <span className="block">{content.titleLines[1]}</span>
            </motion.h1>

            <motion.div
              className="flex flex-col items-start md:items-end"
              variants={revealItemVariants}
            >
              <OdometerFigure
                className="text-title-100"
                unit={content.heroStat.unit}
                value={content.heroStat.value}
              />
              <span className="mt-1.5 text-body-xs-regular uppercase tracking-widest text-body-60">
                {content.heroStat.caption}
              </span>
            </motion.div>
          </div>

          {/* Uncropped Natural-Ratio Hero Visual Fitting Cleanly Within Initial Viewport */}
          <motion.div
            className="mx-auto w-fit max-w-full overflow-hidden border border-border-30 bg-border-10"
            variants={revealItemVariants}
          >
            <motion.img
              alt={content.heroImage.alt}
              animate={{ opacity: 1, scale: 1 }}
              className="block h-auto max-h-[calc(100dvh-15.5rem)] w-auto max-w-full md:max-h-[calc(100dvh-16.5rem)]"
              initial={prefersReducedMotion ? false : { opacity: 0.45, scale: 1.02 }}
              src={content.heroImage.src}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* RISING WHITE EDITORIAL CURTAIN */}
      <div className="relative z-10 w-full border-t border-border-30 bg-border-10 text-title-100">
        {/* 2. PROJECT METADATA + EDITORIAL LEAD SPREAD (.aie) */}
        <section
          aria-label="Project overview and metadata"
          className="content-container py-20 md:py-32 lg:py-40"
        >
          <motion.div
            animate={prefersReducedMotion ? 'visible' : undefined}
            className="grid gap-14 lg:grid-cols-12 lg:gap-12"
            initial={prefersReducedMotion ? false : 'hidden'}
            variants={revealContainerVariants}
            viewport={{ amount: 0.15, once: false }}
            whileInView={prefersReducedMotion ? undefined : 'visible'}
          >
            {/* Left Key-Value Metadata Table (.zgh) */}
            <motion.dl
              className="border-t border-border-30 lg:col-span-4"
              variants={revealItemVariants}
            >
              {content.metadata.map((row) => (
                <div
                  className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4 border-b border-border-30 py-4"
                  key={row.label}
                >
                  <dt className="text-body-s-regular text-body-60">
                    {row.label}
                  </dt>
                  <dd className="text-body-m-regular leading-snug text-title-100">
                    {row.value}
                  </dd>
                </div>
              ))}
            </motion.dl>

            {/* Right Unindented Editorial Lead (.nob) */}
            <motion.div
              className="lg:col-span-7 lg:col-start-6"
              variants={revealItemVariants}
            >
              <h2 className="text-[clamp(1.75rem,3.8vw,3rem)] font-normal leading-[1.12] tracking-[-0.03em] text-title-100">
                {content.leadHeading}
              </h2>
              <p className="mt-6 text-body-xl-regular leading-relaxed text-title-90 md:mt-8 md:text-[1.375rem] md:leading-[1.45]">
                {content.leadStatement}
              </p>

              {content.openingQuote && (
                <blockquote className="mt-8 border-l-2 border-primary-main pl-5 text-body-l-regular leading-relaxed text-title-100 md:mt-10 md:pl-6 md:text-body-xl-regular">
                  {content.openingQuote}
                </blockquote>
              )}
            </motion.div>
          </motion.div>
        </section>

        {/* 3. INTERACTIVE DESIGN PLANS / PROCESS BOARDS VIEWER (.uww) */}
        {content.plansViewer && (
          <div className="border-y border-border-30 bg-border-10">
            <DesignPlansViewer
              slides={content.plansViewer.slides}
              subtitle={content.plansViewer.subtitle}
              title={content.plansViewer.title}
            />
          </div>
        )}

        {/* 4. CHAPTER-BY-CHAPTER EDITORIAL STORYTELLING (.tid) */}
        <div className="divide-y divide-border-30">
          {content.chapters.map((chapter) => (
            <section
              aria-labelledby={`chapter-${chapter.id}`}
              className="content-container py-16 md:py-24 lg:py-32"
              id={chapter.id}
              key={chapter.id}
            >
              <motion.div
                animate={prefersReducedMotion ? 'visible' : undefined}
                initial={prefersReducedMotion ? false : 'hidden'}
                variants={revealContainerVariants}
                viewport={{ amount: 0.12, once: false }}
                whileInView={prefersReducedMotion ? undefined : 'visible'}
              >
                {/* Vision Mansion .tid Asymmetric Editorial Text Spread */}
                <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
                  <motion.div
                    className="lg:col-span-3"
                    variants={revealItemVariants}
                  >
                    <p className="text-body-s-regular uppercase tracking-wide text-body-60 lg:sticky lg:top-28">
                      {chapter.eyebrow}
                    </p>
                  </motion.div>

                  <motion.div
                    className="lg:col-span-8 lg:col-start-5"
                    variants={revealItemVariants}
                  >
                    <h2
                      className="text-[clamp(1.75rem,3.6vw,2.875rem)] font-normal leading-[1.12] tracking-[-0.03em] text-title-100"
                      id={`chapter-${chapter.id}`}
                    >
                      {chapter.heading}
                    </h2>

                    <div className="mt-7 flex flex-col gap-5 md:mt-9 md:gap-6">
                      {chapter.paragraphs.map((paragraph, pIdx) => (
                        <p
                          className={cn(
                            'text-body-l-regular leading-relaxed text-title-90 md:text-body-xl-regular md:leading-[1.55]',
                            pIdx === 0 && 'md:indent-24',
                          )}
                          key={paragraph}
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Optional Highlighted Quote / Reframed Problem Statement */}
                    {chapter.calloutQuote && (
                      <blockquote className="mt-8 border-y border-border-30 py-6 text-[clamp(1.25rem,2.4vw,1.875rem)] font-normal leading-snug tracking-[-0.02em] text-title-100 md:mt-10 md:py-8">
                        {chapter.calloutQuote}
                      </blockquote>
                    )}

                    {/* Optional Quantitative Metrics Strip */}
                    {chapter.stats && (
                      <div className="mt-10 grid gap-6 border-y border-border-30 py-8 sm:grid-cols-3 md:mt-12 md:gap-8">
                        {chapter.stats.map((stat) => (
                          <div key={stat.label}>
                            <p className="text-[clamp(2rem,4vw,3.25rem)] font-normal leading-none tracking-[-0.035em] text-title-100">
                              {stat.value}
                            </p>
                            <p className="mt-2.5 text-body-m-semibold text-title-100">
                              {stat.label}
                            </p>
                            {stat.detail && (
                              <p className="mt-1 text-body-s-regular leading-relaxed text-body-70">
                                {stat.detail}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Optional Key Capabilities List (Kononenko Hover Inversion Rows) */}
                    {chapter.capabilities && (
                      <ul className="mt-10 border-t border-border-30 md:mt-12">
                        {chapter.capabilities.map((cap, cIdx) => (
                          <li
                            className="group grid gap-2 border-b border-border-30 px-2 py-4 transition-colors duration-200 hover:bg-primary-main hover:text-border-10 sm:grid-cols-[2.25rem_14rem_minmax(0,1fr)] sm:items-baseline sm:gap-4 sm:px-4 sm:py-5"
                            key={cap.title}
                          >
                            <span className="text-body-xs-regular text-body-60 group-hover:text-disable-40">
                              0{cIdx + 1}
                            </span>
                            <span className="text-body-l-regular text-title-100 group-hover:text-border-10">
                              {cap.title}
                            </span>
                            <span className="text-body-m-regular text-body-70 group-hover:text-disable-40">
                              {cap.description}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                </div>

                {/* Chapter Visual Plates */}
                {chapter.media && chapter.media.length > 0 && (
                  <motion.div
                    className={cn(
                      'mt-12 md:mt-16',
                      chapter.mediaLayout === 'duo'
                        ? 'grid gap-8 md:grid-cols-2 lg:gap-10'
                        : 'w-full',
                    )}
                    variants={revealItemVariants}
                  >
                    {chapter.media.map((item, mIdx) => (
                      <figure
                        className={cn(
                          chapter.mediaLayout === 'duo' &&
                            mIdx === 1 &&
                            'md:mt-16',
                        )}
                        key={item.id}
                      >
                        <div className="group w-full overflow-hidden border border-border-30 bg-border-10">
                          <img
                            alt={item.alt}
                            className="block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                            loading="lazy"
                            src={item.src}
                          />
                        </div>
                        {item.caption && (
                          <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-body-xs-regular text-body-60 md:text-body-s-regular">
                            <span>{item.caption}</span>
                            <span className="shrink-0">
                              FIG. {chapter.number}
                              {chapter.media && chapter.media.length > 1
                                ? `.${mIdx + 1}`
                                : ''}
                            </span>
                          </figcaption>
                        )}
                      </figure>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </section>
          ))}
        </div>

        {/* 5. MULTI-MODE EDITORIAL ARCHIVE GALLERY (.ijt: Detail | Masonry | Slider) */}
        <section
          aria-labelledby="case-study-gallery-heading"
          className="border-t border-border-30 py-20 md:py-28 lg:py-36"
          ref={gallerySectionRef}
        >
          <div className="content-container">
            <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-body-xs-regular uppercase tracking-widest text-body-60">
                  {content.gallery.eyebrow}
                </p>
                <h2
                  className="mt-2 text-h4-bold font-normal tracking-tight text-title-100 md:text-h3-bold"
                  id="case-study-gallery-heading"
                >
                  {content.gallery.heading}
                </h2>
              </div>

              {/* Inline View Switcher Fallback (also mirrored in floating bottom pill) */}
              <div
                aria-label="Gallery view mode"
                className="inline-flex self-start rounded-[6px] bg-border-20 p-1 md:self-auto"
                role="tablist"
              >
                {(['detail', 'masonry', 'slider'] as GalleryMode[]).map(
                  (mode) => {
                    const isActive = galleryMode === mode
                    return (
                      <button
                        aria-selected={isActive}
                        className={cn(
                          'touch-target rounded-[4px] px-3.5 py-1.5 text-body-s-regular capitalize transition-all duration-200 focus-visible:outline-2 focus-visible:outline-primary-main',
                          isActive
                            ? 'bg-border-10 text-title-100 shadow-card'
                            : 'text-body-60 hover:text-title-100',
                        )}
                        key={mode}
                        onClick={() => setGalleryMode(mode)}
                        role="tab"
                        type="button"
                      >
                        {mode}
                      </button>
                    )
                  },
                )}
              </div>
            </div>

            <LayoutGroup id={`gallery-${content.slug}`}>
              {galleryMode === 'detail' && (
                <div className="flex flex-col gap-16 md:gap-24 lg:gap-32">
                  {content.gallery.slices.map((slice, sIdx) => {
                    if (slice.type === 'full') {
                      return (
                        <motion.div
                          className="w-full overflow-hidden border border-border-30 bg-border-10"
                          key={`slice-full-${sIdx}`}
                          layout={!prefersReducedMotion}
                          layoutId={`gal-${slice.image.id}`}
                        >
                          <img
                            alt={slice.image.alt}
                            className="block h-auto w-full"
                            loading="lazy"
                            src={slice.image.src}
                          />
                        </motion.div>
                      )
                    }

                    if (slice.type === 'trioAsymmetric') {
                      const [first, second, third] = slice.items
                      return (
                        <div
                          className="grid items-start gap-6 md:grid-cols-12 md:gap-8"
                          key={`slice-trio-${sIdx}`}
                        >
                          <motion.div
                            className="overflow-hidden border border-border-30 bg-border-10 md:col-span-4"
                            layout={!prefersReducedMotion}
                            layoutId={`gal-${first.id}`}
                          >
                            <img
                              alt={first.alt}
                              className="block h-auto w-full"
                              loading="lazy"
                              src={first.src}
                            />
                          </motion.div>

                          <motion.div
                            className="overflow-hidden border border-border-30 bg-border-10 md:col-span-4 md:mt-16"
                            layout={!prefersReducedMotion}
                            layoutId={`gal-${second.id}`}
                          >
                            <img
                              alt={second.alt}
                              className="block h-auto w-full"
                              loading="lazy"
                              src={second.src}
                            />
                          </motion.div>

                          <motion.div
                            className="overflow-hidden border border-border-30 bg-border-10 md:col-span-4 md:mt-32"
                            layout={!prefersReducedMotion}
                            layoutId={`gal-${third.id}`}
                          >
                            <img
                              alt={third.alt}
                              className="block h-auto w-full"
                              loading="lazy"
                              src={third.src}
                            />
                          </motion.div>
                        </div>
                      )
                    }

                    return (
                      <div
                        className="grid items-start gap-8 md:grid-cols-12"
                        key={`slice-duo-${sIdx}`}
                      >
                        <motion.div
                          className="overflow-hidden border border-border-30 bg-border-10 md:col-span-5 md:mt-24"
                          layout={!prefersReducedMotion}
                          layoutId={`gal-${slice.left.id}`}
                        >
                          <img
                            alt={slice.left.alt}
                            className="block h-auto w-full"
                            loading="lazy"
                            src={slice.left.src}
                          />
                        </motion.div>

                        <motion.div
                          className="overflow-hidden border border-border-30 bg-border-10 md:col-span-6 md:col-start-7"
                          layout={!prefersReducedMotion}
                          layoutId={`gal-${slice.right.id}`}
                        >
                          <img
                            alt={slice.right.alt}
                            className="block h-auto w-full"
                            loading="lazy"
                            src={slice.right.src}
                          />
                        </motion.div>
                      </div>
                    )
                  })}
                </div>
              )}

              {galleryMode === 'masonry' && (
                <div className="grid gap-5 md:grid-cols-3">
                  {masonryColumns.map((column, colIdx) => (
                    <div className="flex flex-col gap-5" key={`col-${colIdx}`}>
                      {column.map((img) => (
                        <motion.figure
                          className="overflow-hidden border border-border-30 bg-border-10"
                          key={img.id}
                          layout={!prefersReducedMotion}
                          layoutId={`gal-${img.id}`}
                        >
                          <img
                            alt={img.alt}
                            className="block h-auto w-full"
                            loading="lazy"
                            src={img.src}
                          />
                        </motion.figure>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {galleryMode === 'slider' && activeSliderImage && (
                <div className="grid items-start gap-6 lg:grid-cols-12">
                  {/* Left Vertical Thumbnail Rail (Vision Mansion .eze) */}
                  <div className="order-2 flex items-start gap-2 overflow-x-auto pb-2 lg:order-1 lg:col-span-2 lg:flex-col lg:overflow-visible lg:pb-0">
                    {content.gallery.images.map((img, idx) => {
                      const isCurrent = idx === sliderIndex
                      return (
                        <button
                          aria-current={isCurrent ? 'true' : undefined}
                          aria-label={`Select slide ${idx + 1}`}
                          className={cn(
                            'w-24 shrink-0 overflow-hidden border-2 bg-border-10 p-0.5 transition-all lg:w-full',
                            isCurrent
                              ? 'border-primary-main opacity-100'
                              : 'border-border-30 opacity-50 hover:opacity-100',
                          )}
                          key={img.id}
                          onClick={() => setSliderIndex(idx)}
                          type="button"
                        >
                          <img
                            alt=""
                            className="block h-auto w-full"
                            src={img.src}
                          />
                        </button>
                      )
                    })}
                  </div>

                  {/* Focused Slide Frame */}
                  <div className="order-1 lg:order-2 lg:col-span-10">
                    <motion.div
                      className="overflow-hidden border border-border-30 bg-border-10"
                      layout={!prefersReducedMotion}
                      layoutId={`gal-${activeSliderImage.id}`}
                    >
                      <img
                        alt={activeSliderImage.alt}
                        className="block h-auto w-full bg-border-10"
                        src={activeSliderImage.src}
                      />
                    </motion.div>
                    <div className="mt-4 flex items-center justify-between text-body-s-regular text-body-70">
                      <span>{activeSliderImage.caption ?? activeSliderImage.alt}</span>
                      <span>
                        0{sliderIndex + 1} / 0{content.gallery.images.length}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </LayoutGroup>
          </div>

          {/* Floating Bottom Pill Switcher (Vision Mansion .cew > .dam) */}
          <AnimatePresence>
            {isGalleryInView && (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                aria-label="Floating gallery view switcher"
                className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2 rounded-[6px] border border-border-30 bg-border-20/95 px-2.5 py-1.5 shadow-soft backdrop-blur-header"
                exit={{ opacity: 0, y: 20 }}
                initial={{ opacity: 0, y: 20 }}
                role="tablist"
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-2">
                  {(['detail', 'masonry', 'slider'] as GalleryMode[]).map(
                    (mode) => {
                      const isActive = galleryMode === mode
                      return (
                        <button
                          aria-selected={isActive}
                          className={cn(
                            'touch-target rounded-[4px] px-3 py-1 text-body-s-regular capitalize transition-opacity duration-200 focus-visible:outline-2 focus-visible:outline-primary-main',
                            isActive
                              ? 'text-title-100 opacity-100'
                              : 'text-title-100 opacity-40 hover:opacity-80',
                          )}
                          key={`float-${mode}`}
                          onClick={() => setGalleryMode(mode)}
                          role="tab"
                          type="button"
                        >
                          {mode}
                        </button>
                      )
                    },
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* 6. BOTTOM "NEXT WORK" TRANSITION BANNER (Vision Mansion .kma) */}
        <section
          aria-label="Next project"
          className="content-container border-t border-border-30 py-20 md:py-28 lg:py-36"
        >
          <a
            className="group inline-block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-main"
            href={getAppHref(content.nextProject.href)}
            onClick={(event) =>
              handleInternalLink(event, content.nextProject.href)
            }
          >
            <span className="block text-body-m-regular text-body-60">
              {content.nextProject.eyebrow}
            </span>

            <div className="mt-5 flex flex-col items-start gap-6 sm:flex-row sm:items-center md:gap-8">
              {/* Thumbnail with Vision Mansion scale(1.035) -> scale(1) hover */}
              <div className="w-44 shrink-0 overflow-hidden border-2 border-border-30 bg-border-10 md:w-60">
                <img
                  alt={content.nextProject.thumbnail.alt}
                  className="block h-auto w-full scale-[1.035] transition-transform duration-700 ease-out group-hover:scale-100"
                  loading="lazy"
                  src={content.nextProject.thumbnail.src}
                />
              </div>

              {/* Dual-layer Vertical Text-Wipe Hover Title */}
              <div className="relative overflow-hidden">
                <h2 className="text-[clamp(2rem,5.5vw,4.5rem)] font-normal leading-[0.94] tracking-[-0.035em] text-title-100 transition-transform duration-500 ease-out group-hover:-translate-y-full">
                  <span className="block">
                    {content.nextProject.titleLines[0]}
                  </span>
                  <span className="inline-flex items-center gap-3">
                    <span>{content.nextProject.titleLines[1]}</span>
                    <ArrowUpRightIcon
                      aria-hidden="true"
                      className="size-7 md:size-10"
                    />
                  </span>
                </h2>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 block translate-y-full text-[clamp(2rem,5.5vw,4.5rem)] font-normal leading-[0.94] tracking-[-0.035em] text-title-100 transition-transform duration-500 ease-out group-hover:translate-y-0"
                >
                  <span className="block">
                    {content.nextProject.titleLines[0]}
                  </span>
                  <span className="inline-flex items-center gap-3">
                    <span>{content.nextProject.titleLines[1]}</span>
                    <ArrowUpRightIcon
                      aria-hidden="true"
                      className="size-7 md:size-10"
                    />
                  </span>
                </span>
              </div>
            </div>
          </a>
        </section>
      </div>
    </article>
  )
}
