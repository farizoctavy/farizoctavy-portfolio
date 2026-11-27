import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

import { EditorialQuote } from '@/components/molecules/EditorialQuote'
import type { AboutContent } from '@/data/about'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { revealContainerVariants, revealItemVariants } from '@/lib/motion'

export interface AboutShowcaseProps {
  content: AboutContent
}

interface LayoutMetrics {
  row1Height: number
  shrinkDistance: number
  targetHeight: number
  targetLeft: number
  targetTop: number
  targetWidth: number
  viewportHeight: number
  viewportWidth: number
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

const lerp = (start: number, end: number, t: number) =>
  start + (end - start) * t

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 2.4)

export function AboutShowcase({ content }: AboutShowcaseProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const targetSlotRef = useRef<HTMLDivElement>(null)

  const [metrics, setMetrics] = useState<LayoutMetrics | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      if (!stickyRef.current || !targetSlotRef.current) {
        return
      }

      const viewportWidth = document.documentElement.clientWidth
      const viewportHeight = window.innerHeight
      const stickyRect = stickyRef.current.getBoundingClientRect()
      const targetRect = targetSlotRef.current.getBoundingClientRect()
      const row1Height = stickyRef.current.offsetHeight

      const targetLeft = targetRect.left - stickyRect.left
      const targetTop = targetRect.top - stickyRect.top
      const targetWidth = targetRect.width
      const targetHeight = targetRect.height

      const shrinkDistance = Math.max(
        Math.round(viewportHeight * 0.65),
        viewportHeight - row1Height + 32,
      )

      setMetrics({
        row1Height,
        shrinkDistance,
        targetHeight,
        targetLeft,
        targetTop,
        targetWidth,
        viewportHeight,
        viewportWidth,
      })
    }

    measure()

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(measure)
        : null

    if (stickyRef.current) {
      resizeObserver?.observe(stickyRef.current)
    }
    if (targetSlotRef.current) {
      resizeObserver?.observe(targetSlotRef.current)
    }

    window.addEventListener('resize', measure)
    return () => {
      resizeObserver?.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) {
      setScrollProgress(1)
      return
    }

    const handleScroll = () => {
      const distance = metrics?.shrinkDistance ?? window.innerHeight * 0.65
      const raw = distance > 0 ? window.scrollY / distance : 1
      setScrollProgress(clamp(raw, 0, 1))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [metrics?.shrinkDistance, prefersReducedMotion])

  const effectiveProgress = prefersReducedMotion ? 1 : scrollProgress
  const morphT = easeOutCubic(effectiveProgress)

  const overlayOpacity = clamp(1 - effectiveProgress / 0.34, 0, 1)
  const quoteOpacity = prefersReducedMotion
    ? 1
    : clamp((effectiveProgress - 0.36) / 0.56, 0, 1)
  const quoteTranslateY = prefersReducedMotion ? 0 : (1 - quoteOpacity) * 20

  const trackHeight =
    !prefersReducedMotion && metrics
      ? metrics.row1Height + metrics.shrinkDistance
      : undefined

  const morphBoxStyle =
    !prefersReducedMotion && metrics
      ? {
          height: `${lerp(metrics.viewportHeight, metrics.targetHeight, morphT)}px`,
          left: `${lerp(0, metrics.targetLeft, morphT)}px`,
          top: `${lerp(0, metrics.targetTop, morphT)}px`,
          width: `${lerp(metrics.viewportWidth, metrics.targetWidth, morphT)}px`,
        }
      : undefined

  return (
    <article aria-label="About Fariz Oktavian" className="relative w-full">
      {/* ROW 1 + HERO SCROLL-TO-SHRINK STAGE */}
      <div
        className="relative w-full"
        ref={trackRef}
        style={trackHeight ? { height: `${trackHeight}px` } : undefined}
      >
        <div
          className="sticky top-0 w-full overflow-visible"
          ref={stickyRef}
        >
          <div className="content-container pt-24 pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20">
            <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
              {/* Top-Left Editorial Quote Block */}
              <div
                className="order-2 lg:order-1 lg:col-span-6 lg:pr-8"
                style={{
                  opacity: quoteOpacity,
                  transform: `translate3d(0, ${quoteTranslateY}px, 0)`,
                }}
              >
                <EditorialQuote block={content.introBlock} emphasis="primary" />
              </div>

              {/* Top-Right Target Slot for the Shrinking Hero Photo */}
              <div className="order-1 lg:order-2 lg:col-span-6">
                <div
                  className="relative aspect-[3/2] w-full overflow-hidden bg-border-20"
                  ref={targetSlotRef}
                >
                  {(prefersReducedMotion || !metrics) && (
                    <img
                      alt={content.hero.imageAlt}
                      className="h-full w-full object-cover grayscale"
                      src={content.hero.imageSrc}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Floating Full-Viewport -> Top-Right Morphing Hero Photo */}
          {!prefersReducedMotion && metrics && (
            <motion.div
              animate={{ opacity: 1 }}
              className="pointer-events-none absolute z-20 overflow-hidden bg-primary-main will-change-[top,left,width,height]"
              initial={{ opacity: 0 }}
              style={morphBoxStyle}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.img
                alt={content.hero.imageAlt}
                animate={{ scale: 1 }}
                className="h-full w-full object-cover object-center grayscale"
                initial={{ scale: 1.05 }}
                src={content.hero.imageSrc}
                transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Subtle bottom scrim that fades out as the image shrinks */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-primary-main/60 via-primary-main/10 to-transparent"
                style={{ opacity: overlayOpacity }}
              />

              {/* Full-Screen Hero Overlays (Scroll to Explore + Tagline) */}
              <div
                aria-hidden={overlayOpacity === 0}
                className="absolute inset-x-0 bottom-0"
                style={{ opacity: overlayOpacity }}
              >
                <motion.div
                  animate="visible"
                  className="content-container flex items-end justify-between pb-0"
                  initial="hidden"
                  variants={revealContainerVariants}
                >
                  {/* Bottom-Left: Scroll to Explore + Vertical Line */}
                  <motion.div
                    className="flex flex-col items-center gap-2.5"
                    variants={revealItemVariants}
                  >
                    <span className="text-body-xs-regular tracking-tight text-border-10/85 md:text-body-s-regular">
                      {content.hero.scrollLabel}
                    </span>
                    <span
                      aria-hidden="true"
                      className="block h-8 w-px bg-border-10/75 md:h-11"
                    />
                  </motion.div>

                  {/* Bottom-Right: Two-Line Gen-Z Tagline */}
                  <motion.div
                    className="pb-6 text-right md:pb-8"
                    variants={revealItemVariants}
                  >
                    <p className="font-rounded text-h7-bold leading-tight tracking-tight md:text-h5-bold lg:text-h4-bold">
                      <span className="block text-border-10">
                        {content.hero.taglineLines[0]}
                      </span>
                      <span className="block text-border-10/80">
                        {content.hero.taglineLines[1]}
                      </span>
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* ROW 2 — PORTRAIT PHOTO (LEFT) + SECOND EDITORIAL QUOTE (RIGHT) */}
      <motion.section
        animate={prefersReducedMotion ? 'visible' : undefined}
        aria-label="Community and design philosophy"
        className="content-container pt-4 pb-20 md:pt-8 md:pb-28 lg:pt-10 lg:pb-36"
        initial={prefersReducedMotion ? false : 'hidden'}
        variants={revealContainerVariants}
        viewport={{ amount: 0.15, once: false }}
        whileInView={prefersReducedMotion ? undefined : 'visible'}
      >
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Bottom-Left Vertical Portrait Photo */}
          <motion.div
            className="lg:col-span-6"
            variants={revealItemVariants}
          >
            <div className="aspect-[2/3] w-full overflow-hidden bg-border-20">
              <img
                alt={content.secondSection.imageAlt}
                className="h-full w-full object-cover object-center grayscale"
                loading="lazy"
                src={content.secondSection.imageSrc}
              />
            </div>
          </motion.div>

          {/* Bottom-Right Editorial Quote Blocks */}
          <motion.div
            className="flex flex-col gap-12 lg:col-span-6 lg:gap-16 lg:pl-4"
            variants={revealItemVariants}
          >
            {content.secondSection.quoteBlocks.map((block) => (
              <EditorialQuote block={block} key={block.headline} />
            ))}
          </motion.div>
        </div>
      </motion.section>
    </article>
  )
}
