import { useEffect, useState } from 'react'
import { ArrowsPointingOutIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'motion/react'

import type { CaseStudyPlanSlide } from '@/data/caseStudies'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/utils'

export interface DesignPlansViewerProps {
  slides: CaseStudyPlanSlide[]
  subtitle: string
  title: string
}

export function DesignPlansViewer({
  slides,
  subtitle,
  title,
}: DesignPlansViewerProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const currentSlide = slides[activeIndex] ?? slides[0]

  useEffect(() => {
    if (!isZoomed) {
      return
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsZoomed(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isZoomed])

  if (!currentSlide) {
    return null
  }

  const handlePrev = () =>
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)
  const handleNext = () =>
    setActiveIndex((prev) => (prev + 1) % slides.length)

  const progressPercentage = ((activeIndex + 1) / slides.length) * 100

  return (
    <section
      aria-labelledby="design-plans-heading"
      className="content-container py-16 md:py-24 lg:py-28"
    >
      <div className="mb-8 flex flex-col gap-3 md:mb-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-body-xs-regular uppercase tracking-widest text-body-60">
            PROCESS BLUEPRINTS
          </p>
          <h2
            className="mt-2 text-h5-bold font-normal tracking-tight text-title-100 md:text-h4-bold"
            id="design-plans-heading"
          >
            {title}
          </h2>
        </div>
        <p className="max-w-md text-body-m-regular text-body-70">{subtitle}</p>
      </div>

      {/* Vision Mansion .uww 12-col Asymmetric Viewer + Sticky Right Rail */}
      <div className="grid items-start gap-6 lg:grid-cols-12 lg:gap-8">
        {/* Main Drawing / Workspace Stage */}
        <div className="lg:col-span-9">
          <div className="relative overflow-hidden border-2 border-border-30 bg-border-10">
            <div className="relative w-full overflow-hidden bg-border-10">
              <AnimatePresence mode="wait">
                <motion.img
                  alt={currentSlide.image.alt}
                  animate={{ opacity: 1, scale: 1 }}
                  className="block h-auto w-full bg-border-10"
                  exit={{ opacity: 0, scale: 0.99 }}
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, scale: 1.015 }
                  }
                  key={currentSlide.id}
                  src={currentSlide.image.src}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                />
              </AnimatePresence>

              <button
                aria-label={`Inspect ${currentSlide.title} full screen`}
                className="touch-target absolute right-3 bottom-3 inline-flex items-center gap-1.5 border border-border-30 bg-border-10/95 px-3 py-1.5 text-body-xs-regular text-title-100 backdrop-blur-header transition-colors hover:bg-primary-main hover:text-border-10 focus-visible:outline-2 focus-visible:outline-primary-main"
                onClick={() => setIsZoomed(true)}
                type="button"
              >
                <ArrowsPointingOutIcon aria-hidden="true" className="size-3.5" />
                <span>Inspect</span>
              </button>
            </div>

            {/* Vision Mansion 2px Bottom Progress Bar (.fma > .xzj) */}
            <div className="h-0.5 w-full bg-border-30">
              <motion.div
                animate={{ width: `${progressPercentage}%` }}
                className="h-full bg-primary-main"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>

          {/* Active Slide Caption Strip */}
          <div className="mt-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
            <div className="flex items-baseline gap-3">
              <span className="text-body-xs-regular text-body-60">
                {currentSlide.code} / 0{slides.length}
              </span>
              <h3 className="text-body-l-regular text-title-100">
                {currentSlide.title}
              </h3>
            </div>
            <p className="text-body-s-regular text-body-70">
              {currentSlide.subtitle}
            </p>
          </div>
        </div>

        {/* Sticky Right Sidebar Thumbnail Rail + Prev / Next Controls */}
        <aside
          aria-label="Process board thumbnails"
          className="flex flex-col gap-5 lg:sticky lg:top-24 lg:col-span-3"
        >
          <div className="grid grid-cols-3 items-start gap-2.5 sm:grid-cols-6 lg:grid-cols-2 lg:gap-3">
            {slides.map((slide, index) => {
              const isActive = index === activeIndex

              return (
                <button
                  aria-current={isActive ? 'true' : undefined}
                  aria-label={`View ${slide.code}: ${slide.title}`}
                  className={cn(
                    'group relative w-full overflow-hidden border-2 p-1 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-main',
                    isActive
                      ? 'border-primary-main bg-border-20/70'
                      : 'border-border-30 bg-border-10 opacity-75 hover:border-primary-border hover:opacity-100',
                  )}
                  key={slide.id}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                >
                  <img
                    alt=""
                    className={cn(
                      'block h-auto w-full transition-opacity duration-200',
                      isActive ? 'opacity-30' : 'opacity-100',
                    )}
                    loading="lazy"
                    src={slide.image.src}
                  />
                  <span className="absolute right-1.5 bottom-1 bg-border-10/90 px-1 text-[10px] text-title-100">
                    {slide.code}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="flex items-center justify-between border-t border-border-30 pt-4">
            <button
              className="touch-target inline-flex items-center border-b border-transparent py-1 text-body-m-regular text-title-100 transition-colors hover:border-primary-main focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-main"
              onClick={handlePrev}
              type="button"
            >
              Prev
            </button>
            <span className="text-body-xs-regular text-body-60">
              {currentSlide.code} / 0{slides.length}
            </span>
            <button
              className="touch-target inline-flex items-center border-b border-transparent py-1 text-body-m-regular text-title-100 transition-colors hover:border-primary-main focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-main"
              onClick={handleNext}
              type="button"
            >
              Next
            </button>
          </div>
        </aside>
      </div>

      {/* Fullscreen Lightbox Inspection Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            animate={{ opacity: 1 }}
            aria-label={`${currentSlide.title} zoomed preview`}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-primary-main/90 p-4 backdrop-blur-sm md:p-10"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            role="dialog"
          >
            <button
              aria-label="Close zoomed preview"
              className="touch-target fixed top-5 right-5 inline-flex items-center justify-center border border-title-80 bg-primary-main text-border-10 hover:bg-title-90 focus-visible:outline-2 focus-visible:outline-border-10"
              onClick={() => setIsZoomed(false)}
              type="button"
            >
              <XMarkIcon aria-hidden="true" className="size-5" />
            </button>
            <motion.img
              alt={currentSlide.image.alt}
              animate={{ scale: 1 }}
              className="max-h-[88dvh] max-w-[94vw] object-contain bg-border-10 p-2"
              exit={{ scale: 0.96 }}
              initial={{ scale: 0.96 }}
              onClick={(event) => event.stopPropagation()}
              src={currentSlide.image.src}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
