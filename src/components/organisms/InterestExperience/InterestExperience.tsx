import { useEffect, useRef, useState } from 'react'
import { ArrowDownIcon } from '@heroicons/react/24/outline'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'

import { Button } from '@/components/atoms/Button'
import { Icon } from '@/components/atoms/Icon'
import { RollingText } from '@/components/atoms/RollingText'
import type {
  FloatingGalleryPhoto,
  InterestChapter,
  InterestPageContent,
} from '@/data/interest'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useRollingText } from '@/hooks/useRollingText'
import { revealContainerVariants, revealItemVariants } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface InterestExperienceProps {
  content: InterestPageContent
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

const LOOP_SPAN_VH = 160
const LOOP_MIN_VH = -30

interface FloatingBackdropItemProps {
  item: FloatingGalleryPhoto
  pointerX: MotionValue<number>
  pointerY: MotionValue<number>
  scrollProgress: MotionValue<number>
  viewportHeight: number
}

function FloatingBackdropItem({
  item,
  pointerX,
  pointerY,
  scrollProgress,
  viewportHeight,
}: FloatingBackdropItemProps) {
  const x = useTransform(pointerX, (px) => px * 32 * item.depth)

  // Continuous bottom-to-top scroll conveyor that loops off-screen (-30vh -> +130vh)
  const y = useTransform(
    [pointerY, scrollProgress],
    ([py, progress]: number[]) => {
      const rawVh = item.initialYVh - progress * item.travelVh
      const wrappedVh =
        ((((rawVh - LOOP_MIN_VH) % LOOP_SPAN_VH) + LOOP_SPAN_VH) %
          LOOP_SPAN_VH) +
        LOOP_MIN_VH
      const scrollPx = (wrappedVh / 100) * viewportHeight
      const pointerPx = py * 26 * item.depth
      return scrollPx + pointerPx
    },
  )

  const rotate = useTransform(pointerX, (px) => px * 1.4 * item.depth)

  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute top-0 hidden overflow-hidden will-change-transform md:block',
        item.horizontalClass,
        item.sizeClass,
        item.opacityClass,
      )}
      style={{ rotate, x, y }}
    >
      <div
        className={cn(
          'w-full overflow-hidden bg-border-20 shadow-card',
          item.aspectClass,
          item.isGhost && 'border border-border-30/80',
        )}
      >
        <img
          alt=""
          className={cn(
            'h-full w-full object-cover object-center',
            item.isGhost && 'opacity-55 blur-[0.5px]',
          )}
          loading="lazy"
          src={item.imageSrc}
        />
      </div>
    </motion.div>
  )
}

interface StageLayerProps {
  children: React.ReactNode
  index: number
  isInteractive: boolean
  pointerX: MotionValue<number>
  pointerY: MotionValue<number>
  scrollProgress: MotionValue<number>
  totalStages: number
  viewportHeight: number
}

function StageLayer({
  children,
  index,
  isInteractive,
  pointerX,
  pointerY,
  scrollProgress,
  totalStages,
  viewportHeight,
}: StageLayerProps) {
  const segment = 1 / totalStages
  const start = index * segment
  const end = (index + 1) * segment
  const enterEnd = start + segment * 0.28
  const exitStart = end - segment * 0.28

  const isFirst = index === 0
  const isLast = index === totalStages - 1
  const travelDistance = Math.round(viewportHeight * 0.44)

  // Continuous bottom -> center reading glide -> top exit
  const scrollY = useTransform(
    scrollProgress,
    isFirst
      ? [0, exitStart, end]
      : isLast
        ? [start, enterEnd, 1]
        : [start, enterEnd, exitStart, end],
    isFirst
      ? [0, -10, -travelDistance]
      : isLast
        ? [travelDistance, 8, 0]
        : [travelDistance, 8, -10, -travelDistance],
  )

  const opacity = useTransform(
    scrollProgress,
    isFirst
      ? [0, exitStart, end]
      : isLast
        ? [start, enterEnd, 1]
        : [start, enterEnd, exitStart, end],
    isFirst
      ? [1, 1, 0]
      : isLast
        ? [0, 1, 1]
        : [0, 1, 1, 0],
  )

  const scale = useTransform(
    scrollProgress,
    isFirst
      ? [0, exitStart, end]
      : isLast
        ? [start, enterEnd, 1]
        : [start, enterEnd, exitStart, end],
    isFirst
      ? [1, 1, 0.95]
      : isLast
        ? [0.95, 1, 1]
        : [0.95, 1, 1, 0.95],
  )

  // Subtle pointer-follow coupled with vertical scroll glide
  const x = useTransform(pointerX, (px) => px * -10)
  const y = useTransform(
    [scrollY, pointerY],
    ([sy, py]: number[]) => sy + py * -8,
  )

  return (
    <motion.div
      aria-hidden={!isInteractive}
      className={cn(
        'absolute inset-0 flex flex-col items-center justify-center px-5 pt-20 pb-20 will-change-transform md:px-8 md:pt-24 md:pb-24',
        isInteractive ? 'pointer-events-auto z-10' : 'pointer-events-none z-0',
      )}
      style={{ opacity, scale, x, y }}
    >
      {children}
    </motion.div>
  )
}

export function InterestExperience({ content }: InterestExperienceProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const scrollRoll = useRollingText()
  const trackRef = useRef<HTMLDivElement>(null)

  const totalStages = content.chapters.length + 1
  const [activeStage, setActiveStage] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(860)
  const [selectedChapter, setSelectedChapter] =
    useState<InterestChapter | null>(null)

  useEffect(() => {
    const updateViewport = () => setViewportHeight(window.innerHeight)
    updateViewport()
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  // Spring-smoothed scroll progress (0 -> 1)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.45,
  })

  // Spring-smoothed normalized pointer (-1 -> 1)
  const rawPointerX = useMotionValue(0)
  const rawPointerY = useMotionValue(0)
  const smoothPointerX = useSpring(rawPointerX, {
    stiffness: 55,
    damping: 20,
    mass: 0.75,
  })
  const smoothPointerY = useSpring(rawPointerY, {
    stiffness: 55,
    damping: 20,
    mass: 0.75,
  })

  const centerPhotoX = useTransform(smoothPointerX, (px) => px * -12)
  const centerPhotoY = useTransform(smoothPointerY, (py) => py * -10)
  const timelineFillScaleX = useTransform(
    smoothProgress,
    [1 / totalStages, 1],
    [0, 1],
  )

  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    const nextStage = clamp(
      Math.floor(latest * totalStages * 0.999),
      0,
      totalStages - 1,
    )
    setActiveStage((prev) => (prev === nextStage ? prev : nextStage))
  })

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') {
        return
      }
      const nx = (event.clientX / window.innerWidth - 0.5) * 2
      const ny = (event.clientY / window.innerHeight - 0.5) * 2
      rawPointerX.set(clamp(nx, -1, 1))
      rawPointerY.set(clamp(ny, -1, 1))
    }

    const handlePointerLeave = () => {
      rawPointerX.set(0)
      rawPointerY.set(0)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.documentElement.addEventListener(
      'pointerleave',
      handlePointerLeave,
    )

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      document.documentElement.removeEventListener(
        'pointerleave',
        handlePointerLeave,
      )
    }
  }, [prefersReducedMotion, rawPointerX, rawPointerY])

  useEffect(() => {
    if (!selectedChapter) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedChapter(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedChapter])

  const scrollToStage = (stageIndex: number) => {
    const track = trackRef.current
    if (!track) {
      return
    }

    const trackTop = track.getBoundingClientRect().top + window.scrollY
    const maxScroll = Math.max(1, track.offsetHeight - window.innerHeight)
    const targetProgress =
      stageIndex === 0
        ? 0
        : stageIndex === totalStages - 1
          ? 1
          : (stageIndex + 0.5) / totalStages
    const targetY = trackTop + clamp(targetProgress, 0, 1) * maxScroll

    window.scrollTo({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      top: targetY,
    })
  }

  // Accessible vertical layout for reduced motion
  if (prefersReducedMotion) {
    return (
      <div className="content-container py-24 md:py-32">
        <header className="mx-auto max-w-4xl text-center">
          <p className="text-body-m-regular text-body-70">
            {content.intro.eyebrow}
          </p>
          <h1 className="hero-heading mt-4 text-balance text-title-100 ![font-weight:var(--font-weight-regular)] lg:text-[clamp(3rem,5.2vw,5.25rem)]">
            <span className="block lg:whitespace-nowrap">
              {content.intro.headlineLines[0]}
            </span>
            <span className="block lg:whitespace-nowrap">
              {content.intro.headlineLines[1]}
            </span>
          </h1>
        </header>

        <div className="mt-16 flex flex-col gap-20">
          {content.chapters.map((chapter) => (
            <section
              className="mx-auto flex max-w-3xl flex-col items-center text-center"
              key={chapter.id}
            >
              <div
                className={cn(
                  'w-full overflow-hidden bg-border-20 shadow-card',
                  chapter.aspectRatio === 'tall-portrait'
                    ? 'aspect-[2/3] max-w-xs'
                    : chapter.aspectRatio === 'portrait'
                      ? 'aspect-[4/5] max-w-xs'
                      : 'aspect-[4/3] max-w-md',
                )}
              >
                <img
                  alt={chapter.imageAlt}
                  className={cn(
                    'h-full w-full object-cover',
                    chapter.isFuture && 'opacity-30',
                  )}
                  src={chapter.imageSrc}
                />
              </div>
              <p className="mt-4 text-body-s-regular font-normal text-title-90 underline underline-offset-4">
                {chapter.captionTitle}
              </p>
              <p className="mt-1 text-body-xs-regular font-normal text-body-60">
                {chapter.captionMeta}
              </p>
              <p className="mt-5 max-w-2xl text-body-xl-regular font-normal leading-relaxed tracking-tight text-title-90 md:text-[1.375rem]">
                {chapter.narrative}
              </p>
            </section>
          ))}
        </div>
      </div>
    )
  }

  const currentChapter =
    activeStage > 0 ? content.chapters[activeStage - 1] : null

  return (
    <article
      aria-label="My Interests — Fariz Oktavian"
      className="relative w-full"
    >
      <div
        className="relative w-full"
        ref={trackRef}
        style={{ height: `${totalStages * 120}dvh` }}
      >
        <div className="sticky top-0 flex h-dvh w-full flex-col justify-between overflow-hidden bg-border-10">
          {/* Infinite Bottom-to-Top Rising Gallery Photos + Pointer Parallax */}
          <motion.div
            animate={{ opacity: 1 }}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {content.floatingPhotos.map((item) => (
              <FloatingBackdropItem
                item={item}
                key={item.id}
                pointerX={smoothPointerX}
                pointerY={smoothPointerY}
                scrollProgress={smoothProgress}
                viewportHeight={viewportHeight}
              />
            ))}

            {/* Soft central radial wash so Inter Tight text stays crisp */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-border-10)_44%,transparent_82%)]" />
          </motion.div>

          {/* CONTINUOUS BOTTOM-TO-TOP SCRUBBED CENTER STAGES */}
          <div className="relative z-10 flex-1">
            {/* Stage 0 — Opening Intro */}
            <StageLayer
              index={0}
              isInteractive={activeStage === 0}
              pointerX={smoothPointerX}
              pointerY={smoothPointerY}
              scrollProgress={smoothProgress}
              totalStages={totalStages}
              viewportHeight={viewportHeight}
            >
              <motion.div
                animate="visible"
                className="content-container flex max-w-6xl flex-col items-center text-center"
                initial="hidden"
                variants={revealContainerVariants}
              >
                <motion.p
                  className="text-body-m-regular font-normal tracking-tight text-title-80 md:text-body-l-regular lg:text-body-xl-regular"
                  variants={revealItemVariants}
                >
                  {content.intro.eyebrow}
                </motion.p>
                <motion.h1
                  className="hero-heading mt-4 text-balance text-title-100 ![font-weight:var(--font-weight-regular)] lg:mt-6 lg:text-[clamp(3rem,5.2vw,5.25rem)]"
                  variants={revealItemVariants}
                >
                  <span className="block lg:whitespace-nowrap">
                    {content.intro.headlineLines[0]}
                  </span>
                  <span className="block lg:whitespace-nowrap">
                    {content.intro.headlineLines[1]}
                  </span>
                </motion.h1>

                <motion.div variants={revealItemVariants}>
                  <Button
                    className="mt-8 md:mt-10"
                    fillOnHover
                    onClick={() => scrollToStage(1)}
                    onFocus={(event) => {
                      if (event.currentTarget.matches(':focus-visible')) {
                        scrollRoll.play()
                      }
                    }}
                    onPointerEnter={(event) => {
                      if (event.pointerType !== 'touch') {
                        scrollRoll.play()
                      }
                    }}
                    rightIcon={
                      <ArrowDownIcon aria-hidden="true" className="size-4" />
                    }
                  >
                    <RollingText
                      isPlaying={scrollRoll.isPlaying}
                      onAnimationComplete={scrollRoll.complete}
                    >
                      {content.intro.scrollLabel}
                    </RollingText>
                  </Button>
                </motion.div>
              </motion.div>
            </StageLayer>

            {/* Stages 1..4 — Photography -> Running -> AI -> Future */}
            {content.chapters.map((chapter, idx) => {
              const stageIdx = idx + 1
              return (
                <StageLayer
                  index={stageIdx}
                  isInteractive={activeStage === stageIdx}
                  key={chapter.id}
                  pointerX={smoothPointerX}
                  pointerY={smoothPointerY}
                  scrollProgress={smoothProgress}
                  totalStages={totalStages}
                  viewportHeight={viewportHeight}
                >
                  <div className="flex w-full max-w-2xl flex-col items-center text-center">
                    <motion.button
                      aria-label={`Learn more about ${chapter.title}`}
                      className={cn(
                        'group relative overflow-hidden bg-border-20 shadow-soft transition-shadow duration-300 hover:shadow-card focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-main',
                        chapter.aspectRatio === 'tall-portrait'
                          ? 'aspect-[2/3] h-[34dvh] max-h-80 w-auto md:h-[38dvh] md:max-h-92'
                          : chapter.aspectRatio === 'portrait'
                            ? 'aspect-[4/5] h-[32dvh] max-h-76 w-auto md:h-[36dvh] md:max-h-88'
                            : 'aspect-[4/3] w-[80vw] max-w-sm md:w-full md:max-w-md lg:max-w-lg',
                      )}
                      onClick={() => setSelectedChapter(chapter)}
                      style={{ x: centerPhotoX, y: centerPhotoY }}
                      type="button"
                    >
                      <img
                        alt={chapter.imageAlt}
                        className={cn(
                          'h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105',
                          chapter.isFuture && 'opacity-35',
                        )}
                        src={chapter.imageSrc}
                      />

                      {chapter.isFuture && (
                        <div className="absolute inset-3 flex flex-col items-center justify-center border border-dashed border-disable-50 bg-border-10/75 p-4 backdrop-blur-[2px]">
                          <span className="text-body-s-regular font-normal text-title-90 uppercase">
                            NEXT CHAPTER
                          </span>
                          <span className="mt-1 text-body-xs-regular font-normal text-body-60">
                            More to come
                          </span>
                        </div>
                      )}
                    </motion.button>

                    <div className="mt-4 max-w-lg md:mt-5">
                      <p className="text-body-s-regular font-normal text-title-90 underline underline-offset-4 md:text-body-m-regular">
                        {chapter.captionTitle}
                      </p>
                      <p className="mt-1 text-body-xs-regular font-normal text-body-60 md:text-body-s-regular">
                        {chapter.captionMeta}
                      </p>
                    </div>

                    <p className="mt-5 max-w-2xl text-balance text-body-xl-regular font-normal leading-relaxed tracking-tight text-title-90 md:mt-6 md:text-[1.375rem] lg:text-[1.625rem] lg:leading-[1.35]">
                      {chapter.narrative}
                    </p>
                  </div>
                </StageLayer>
              )
            })}
          </div>

          {/* RIGHT-EDGE VERTICAL CHAPTER PILL */}
          <nav
            aria-label="Interest chapters"
            className="fixed top-1/2 right-3 z-30 hidden -translate-y-1/2 flex-col items-center gap-2 rounded-full border border-border-30 bg-border-10/85 px-2 py-3 shadow-card backdrop-blur-header sm:flex lg:right-6"
          >
            {Array.from({ length: totalStages }).map((_, index) => {
              const isCurrent = index === activeStage
              const label =
                index === 0
                  ? 'Intro'
                  : content.chapters[index - 1]?.shortLabel ?? ''
              return (
                <button
                  aria-current={isCurrent ? 'step' : undefined}
                  aria-label={`Jump to ${label}`}
                  className="group flex size-5 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-primary-main"
                  key={label}
                  onClick={() => scrollToStage(index)}
                  type="button"
                >
                  <span
                    className={cn(
                      'block rounded-full transition-all duration-300',
                      isCurrent
                        ? 'h-4 w-1.5 bg-primary-main'
                        : 'size-1.5 bg-disable-50 group-hover:bg-title-80',
                    )}
                  />
                </button>
              )
            })}
          </nav>

          {/* BOTTOM HAIRLINE TIMELINE PROGRESS BAR */}
          <div className="content-container relative z-20 pb-6 md:pb-8">
            <div className="mx-auto flex max-w-md items-center gap-3">
              <span className="h-px w-6 bg-primary-main" aria-hidden="true" />
              <span className="shrink-0 text-body-s-regular font-normal tracking-tight text-title-90">
                {currentChapter
                  ? `${currentChapter.indexLabel} · ${currentChapter.shortLabel}`
                  : '00 · Intro'}
              </span>
              <div className="relative h-px flex-1 overflow-hidden bg-border-30">
                <motion.div
                  className="absolute inset-0 origin-left bg-primary-main"
                  style={{ scaleX: timelineFillScaleX }}
                />
              </div>
              <span className="shrink-0 text-body-s-regular font-normal text-body-70">
                0{content.chapters.length}
              </span>
            </div>
          </div>

          {/* BOTTOM-RIGHT HINT / PHOTO DETAIL CARD */}
          <div className="fixed right-4 bottom-5 z-30 lg:right-6 lg:bottom-6">
            <AnimatePresence mode="wait">
              {selectedChapter ? (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  aria-label={`${selectedChapter.title} details`}
                  className="w-[calc(100vw-2rem)] max-w-xs rounded-card-md border border-border-30 bg-border-10/95 p-4 text-left shadow-soft backdrop-blur-header sm:w-80"
                  exit={{ opacity: 0, y: 10 }}
                  initial={{ opacity: 0, y: 10 }}
                  key="detail-card"
                  role="dialog"
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-body-xs-regular font-normal text-body-60 uppercase">
                        {selectedChapter.indexLabel} ·{' '}
                        {selectedChapter.shortLabel}
                      </p>
                      <h2 className="mt-0.5 text-[length:var(--text-h9)] font-normal text-title-90">
                        {selectedChapter.title}
                      </h2>
                    </div>
                    <button
                      aria-label="Close detail card"
                      className="touch-target -mt-1 -mr-1 inline-flex items-center justify-center rounded-full text-title-90 hover:bg-border-20 focus-visible:outline-2 focus-visible:outline-primary-main"
                      onClick={() => setSelectedChapter(null)}
                      type="button"
                    >
                      <Icon className="size-4" name="close" />
                    </button>
                  </div>

                  {selectedChapter.stats && (
                    <dl className="mt-3 grid grid-cols-3 gap-2 border-y border-border-30 py-2.5">
                      {selectedChapter.stats.map((stat) => (
                        <div key={stat.label}>
                          <dt className="text-body-xs-regular font-normal text-body-60">
                            {stat.label}
                          </dt>
                          <dd className="text-body-s-regular font-normal text-title-90">
                            {stat.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  <p className="mt-3 text-body-s-regular font-normal leading-relaxed text-body-70">
                    {selectedChapter.detailNote}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="hidden rounded-card-sm border border-border-30 bg-border-10/90 px-4 py-2.5 text-body-s-regular text-body-70 shadow-card backdrop-blur-header md:block"
                  exit={{ opacity: 0, y: 8 }}
                  initial={{ opacity: 0, y: 8 }}
                  key="hint-pill"
                  transition={{ duration: 0.2 }}
                >
                  {content.intro.hintLabel}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </article>
  )
}
