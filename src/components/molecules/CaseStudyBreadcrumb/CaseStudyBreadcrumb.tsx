import {
  ArrowLeftIcon,
  ArrowUpIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import {
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react'

import { Button } from '@/components/atoms/Button'
import { RollingText } from '@/components/atoms/RollingText'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useRollingText } from '@/hooks/useRollingText'
import { revealContainerVariants, revealItemVariants } from '@/lib/motion'
import { getAppHref, navigateTo } from '@/lib/navigation'
import { cn } from '@/lib/utils'

export interface BreadcrumbSectionItem {
  code: string
  id: string
  label: string
}

export interface BreadcrumbParentLink {
  href: string
  label: string
}

export interface CaseStudyBreadcrumbProps {
  backHref?: string
  backLabel?: string
  currentTitle: string
  mobileDockExtension?: ReactNode
  nextProjectHref?: string
  nextProjectTitle?: string
  parents?: BreadcrumbParentLink[]
  sections: BreadcrumbSectionItem[]
}

const DEFAULT_PARENTS: BreadcrumbParentLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
]

interface RollingBreadcrumbLinkProps {
  className?: string
  href: string
  label: string
  onNavigate: (event: ReactMouseEvent<HTMLAnchorElement>, href: string) => void
}

function RollingBreadcrumbLink({
  className,
  href,
  label,
  onNavigate,
}: RollingBreadcrumbLinkProps) {
  const { complete, isPlaying, play, prefersReducedMotion } = useRollingText()

  const handlePointerEnter = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== 'touch') {
      play()
    }
  }

  const handleFocus = (event: FocusEvent<HTMLAnchorElement>) => {
    if (event.currentTarget.matches(':focus-visible')) {
      play()
    }
  }

  return (
    <a
      className={className}
      href={getAppHref(href)}
      onClick={(event) => onNavigate(event, href)}
      onFocus={!prefersReducedMotion ? handleFocus : undefined}
      onPointerEnter={!prefersReducedMotion ? handlePointerEnter : undefined}
    >
      {prefersReducedMotion ? (
        label
      ) : (
        <RollingText isPlaying={isPlaying} onAnimationComplete={complete}>
          {label}
        </RollingText>
      )}
    </a>
  )
}

export function CaseStudyBreadcrumb({
  backHref = '/',
  backLabel = 'Back to Portfolio',
  currentTitle,
  mobileDockExtension,
  nextProjectHref,
  nextProjectTitle,
  parents = DEFAULT_PARENTS,
  sections,
}: CaseStudyBreadcrumbProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const backRoll = useRollingText()

  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '')
  const [readPercent, setReadPercent] = useState(0)
  const [isRailOpen, setIsRailOpen] = useState(false)
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)

  const railRef = useRef<HTMLDivElement>(null)
  const mobileDockRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.25,
  })

  // Track active section and reading percentage smoothly during scroll
  useEffect(() => {
    const updateScrollMetrics = () => {
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - window.innerHeight
      const ratio =
        scrollable > 0
          ? Math.min(1, Math.max(0, window.scrollY / scrollable))
          : 0
      setReadPercent(Math.round(ratio * 100))

      const triggerY = window.innerHeight * 0.34
      let current = sections[0]?.id ?? ''

      for (const section of sections) {
        const el = document.getElementById(section.id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= triggerY) {
          current = section.id
        }
      }

      setActiveId(current)
    }

    updateScrollMetrics()
    window.addEventListener('scroll', updateScrollMetrics, { passive: true })
    window.addEventListener('resize', updateScrollMetrics, { passive: true })
    return () => {
      window.removeEventListener('scroll', updateScrollMetrics)
      window.removeEventListener('resize', updateScrollMetrics)
    }
  }, [sections])

  // Close interactive drawers on Escape or outside click
  useEffect(() => {
    if (!isRailOpen && !isMobileDrawerOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsRailOpen(false)
        setIsMobileDrawerOpen(false)
      }
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!(event.target instanceof Node)) return
      if (
        isRailOpen &&
        railRef.current &&
        !railRef.current.contains(event.target)
      ) {
        setIsRailOpen(false)
      }
      if (
        isMobileDrawerOpen &&
        mobileDockRef.current &&
        !mobileDockRef.current.contains(event.target)
      ) {
        setIsMobileDrawerOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [isMobileDrawerOpen, isRailOpen])

  const handleInternalLink = (
    event: ReactMouseEvent<HTMLElement>,
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
    setIsRailOpen(false)
    setIsMobileDrawerOpen(false)
    navigateTo(href)
  }

  const handleBackPointerEnter = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'touch') {
      backRoll.play()
    }
  }

  const handleBackFocus = (event: FocusEvent<HTMLElement>) => {
    if (event.currentTarget.matches(':focus-visible')) {
      backRoll.play()
    }
  }

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId)
    if (!target) return

    const headerOffset = window.innerWidth >= 1024 ? 96 : 84
    const top =
      target.getBoundingClientRect().top + window.scrollY - headerOffset

    window.scrollTo({
      top: Math.max(0, top),
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
    setActiveId(sectionId)
    setIsRailOpen(false)
    setIsMobileDrawerOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
    setIsRailOpen(false)
    setIsMobileDrawerOpen(false)
  }

  const activeSection =
    sections.find((section) => section.id === activeId) ?? sections[0]
  const activeIndex = Math.max(
    0,
    sections.findIndex((section) => section.id === activeId),
  )

  return (
    <>
      {/* 1. DESKTOP TOP ARCHITECTURAL BREADCRUMB STRIP (lg+) */}
      <div className="hidden w-full border-b border-border-30 bg-border-10 lg:block">
        <motion.div
          animate="visible"
          className="content-container flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4"
          initial={prefersReducedMotion ? false : 'hidden'}
          variants={revealContainerVariants}
        >
          {/* Animated Signature Return Button (matches Header Button + RollingText) */}
          <motion.div variants={revealItemVariants}>
            <Button
              className="group gap-2.5 border-border-30 px-5 text-title-100 hover:border-primary-main"
              fillOnHover
              href={getAppHref(backHref)}
              onClick={(event) => handleInternalLink(event, backHref)}
              onFocus={handleBackFocus}
              onPointerEnter={handleBackPointerEnter}
            >
              <ArrowLeftIcon
                aria-hidden="true"
                className="size-4 shrink-0 transition-transform duration-200 group-hover:-translate-x-1"
              />
              <RollingText
                isPlaying={backRoll.isPlaying}
                onAnimationComplete={backRoll.complete}
              >
                {backLabel}
              </RollingText>
            </Button>
          </motion.div>

          {/* Right-Aligned Semantic Breadcrumb Trail */}
          <motion.nav
            aria-label="Breadcrumb"
            className="min-w-0"
            variants={revealItemVariants}
          >
            <ol className="flex flex-wrap items-center gap-2 text-body-m-regular text-body-60">
              {parents.map((parent) => (
                <li
                  className="inline-flex items-center gap-2"
                  key={parent.href}
                >
                  <RollingBreadcrumbLink
                    className="inline-flex items-center px-1 text-body-60 transition-colors duration-150 hover:text-title-100 focus-visible:text-title-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-main"
                    href={parent.href}
                    label={parent.label}
                    onNavigate={handleInternalLink}
                  />
                  <ChevronRightIcon
                    aria-hidden="true"
                    className="size-4 shrink-0 text-disable-50"
                  />
                </li>
              ))}
              <li
                aria-current="page"
                className="inline-flex items-center gap-2.5 pl-1 text-title-100"
              >
                <span
                  aria-hidden="true"
                  className="size-2 shrink-0 rounded-full bg-primary-main"
                />
                <span className="truncate">{currentTitle}</span>
              </li>
            </ol>
          </motion.nav>
        </motion.div>
      </div>

      {/* 2. DESKTOP FLOATING RIGHT-EDGE ARCHITECTURAL WAYFINDER RAIL (lg+) */}
      <motion.aside
        animate={{ opacity: 1, x: 0 }}
        aria-label="Case study breadcrumb and chapter navigation"
        className="fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 lg:block xl:right-6"
        initial={prefersReducedMotion ? false : { opacity: 0, x: 18 }}
        onMouseEnter={() => setIsRailOpen(true)}
        onMouseLeave={() => setIsRailOpen(false)}
        ref={railRef}
        transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative flex items-center justify-end">
          {/* Expandable Architectural Breadcrumb & Chapter Drawer */}
          <AnimatePresence>
            {isRailOpen && (
              <motion.div
                animate={{ opacity: 1, x: 0, scale: 1 }}
                className="mr-3 w-76 overflow-hidden rounded-card-md border border-border-30 bg-border-10/95 shadow-soft backdrop-blur-header"
                exit={{ opacity: 0, x: 10, scale: 0.98 }}
                initial={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 0, x: 14, scale: 0.98 }
                }
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Live Breadcrumb Path Header */}
                <div className="border-b border-border-30 px-4 py-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-body-xs-regular uppercase tracking-widest text-body-60">
                      Location
                    </span>
                    <span className="text-body-s-regular tabular-nums text-body-70">
                      {readPercent}%
                    </span>
                  </div>
                  <nav aria-label="Compact breadcrumb" className="mt-1.5">
                    <ol className="flex flex-wrap items-center gap-1.5 text-body-s-regular text-body-60">
                      {parents.map((parent) => (
                        <li
                          className="inline-flex items-center gap-1.5"
                          key={`rail-${parent.href}`}
                        >
                          <a
                            className="transition-colors hover:text-title-100 focus-visible:outline-2 focus-visible:outline-primary-main"
                            href={getAppHref(parent.href)}
                            onClick={(event) =>
                              handleInternalLink(event, parent.href)
                            }
                          >
                            {parent.label}
                          </a>
                          <span aria-hidden="true" className="text-disable-50">
                            /
                          </span>
                        </li>
                      ))}
                      <li
                        aria-current="page"
                        className="truncate text-title-100"
                      >
                        {currentTitle}
                      </li>
                    </ol>
                  </nav>
                </div>

                {/* Chapter Jump List */}
                <nav
                  aria-label="Case study sections"
                  className="max-h-[54dvh] overflow-y-auto px-2.5 py-2.5"
                >
                  <ul className="flex flex-col gap-1">
                    {sections.map((section) => {
                      const isActive = section.id === activeId
                      return (
                        <li key={section.id}>
                          <button
                            aria-current={isActive ? 'location' : undefined}
                            className={cn(
                              'group flex w-full items-center gap-3 rounded-card-sm px-3 py-2 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-primary-main',
                              isActive
                                ? 'bg-primary-main text-border-10'
                                : 'text-title-90 hover:bg-border-20 hover:text-title-100',
                            )}
                            onClick={() => scrollToSection(section.id)}
                            type="button"
                          >
                            <span
                              className={cn(
                                'w-6 shrink-0 text-body-s-regular uppercase tabular-nums',
                                isActive
                                  ? 'text-border-10/75'
                                  : 'text-body-60 group-hover:text-title-90',
                              )}
                            >
                              {section.code}
                            </span>
                            <span className="truncate text-body-m-regular">
                              {section.label}
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </nav>

                {/* Drawer Footer Quick Actions */}
                <div className="flex items-center justify-between gap-2 border-t border-border-30 bg-border-20/60 px-3 py-2.5">
                  <button
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-body-s-regular text-title-90 transition-colors hover:bg-border-10 hover:text-title-100 focus-visible:outline-2 focus-visible:outline-primary-main"
                    onClick={scrollToTop}
                    type="button"
                  >
                    <ArrowUpIcon aria-hidden="true" className="size-3.5" />
                    <span>Top</span>
                  </button>

                  {nextProjectHref && nextProjectTitle && (
                    <a
                      className="inline-flex max-w-[11.5rem] items-center gap-1 truncate rounded-full px-3 py-1.5 text-body-s-regular text-title-90 transition-colors hover:bg-border-10 hover:text-title-100 focus-visible:outline-2 focus-visible:outline-primary-main"
                      href={getAppHref(nextProjectHref)}
                      onClick={(event) =>
                        handleInternalLink(event, nextProjectHref)
                      }
                    >
                      <span className="truncate">Next: {nextProjectTitle}</span>
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Compact Architectural Spine (Tactile Ticks + Live Section Code) */}
          <button
            aria-expanded={isRailOpen}
            aria-label={`Open case study navigation. Currently reading ${activeSection?.label ?? currentTitle}, ${readPercent}% complete`}
            className={cn(
              'press-scale group flex flex-col items-end gap-3.5 rounded-card-md border bg-border-10/92 px-3 py-3.5 shadow-card backdrop-blur-header transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-main',
              isRailOpen
                ? 'border-primary-main'
                : 'border-border-30 hover:border-primary-border',
            )}
            onClick={() => setIsRailOpen((prev) => !prev)}
            type="button"
          >
            <span className="text-body-s-semibold uppercase tracking-wider tabular-nums text-title-100">
              {activeSection?.code ?? '00'}
            </span>

            <div className="relative flex flex-col items-end gap-2.5 py-0.5">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 right-0 bottom-0 w-px bg-border-30"
              >
                <motion.div
                  className="h-full w-full origin-top bg-primary-main"
                  style={{ scaleY: prefersReducedMotion ? 0 : smoothProgress }}
                />
              </div>

              {sections.map((section, idx) => {
                const isActive = section.id === activeId
                const isPassed = idx < activeIndex
                return (
                  <span
                    aria-hidden="true"
                    className={cn(
                      'mr-2 block h-[2.5px] rounded-full transition-all duration-300',
                      isActive
                        ? 'w-5 bg-primary-main'
                        : isPassed
                          ? 'w-3.5 bg-title-80/75'
                          : 'w-2.5 bg-disable-50',
                    )}
                    key={`tick-${section.id}`}
                  />
                )
              })}
            </div>

            <span className="text-body-s-regular tabular-nums text-body-60">
              {readPercent}%
            </span>
          </button>
        </div>
      </motion.aside>

      {/* 3. MOBILE & TABLET FLOATING BOTTOM ARCHITECTURAL DOCK (< lg) */}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-3 lg:hidden">
        <div
          className="pointer-events-auto relative flex max-w-full flex-col items-center"
          ref={mobileDockRef}
        >
          {/* Expandable Upward Breadcrumb & Chapter Sheet */}
          <AnimatePresence>
            {isMobileDrawerOpen && (
              <motion.div
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="mb-3 w-[min(92vw,28rem)] overflow-hidden rounded-card-lg border border-border-30 bg-border-10/96 shadow-soft backdrop-blur-header"
                exit={{ opacity: 0, y: 12, scale: 0.98 }}
                initial={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 0, y: 14, scale: 0.98 }
                }
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Breadcrumb Path Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-30 px-4 py-3">
                  <nav aria-label="Mobile breadcrumb" className="min-w-0">
                    <ol className="flex flex-wrap items-center gap-1.5 text-body-s-regular text-body-60">
                      {parents.map((parent) => (
                        <li
                          className="inline-flex items-center gap-1.5"
                          key={`mob-${parent.href}`}
                        >
                          <a
                            className="py-0.5 text-title-90 underline-offset-4 hover:underline"
                            href={getAppHref(parent.href)}
                            onClick={(event) =>
                              handleInternalLink(event, parent.href)
                            }
                          >
                            {parent.label}
                          </a>
                          <ChevronRightIcon
                            aria-hidden="true"
                            className="size-3.5 shrink-0 text-disable-50"
                          />
                        </li>
                      ))}
                      <li
                        aria-current="page"
                        className="inline-flex items-center gap-1.5 text-title-100"
                      >
                        <span
                          aria-hidden="true"
                          className="size-1.5 shrink-0 rounded-full bg-primary-main"
                        />
                        <span className="truncate">{currentTitle}</span>
                      </li>
                    </ol>
                  </nav>

                  <span className="rounded-full bg-border-20 px-2.5 py-0.5 text-body-s-regular tabular-nums text-title-90">
                    {readPercent}%
                  </span>
                </div>

                {/* Section Jump List */}
                <nav
                  aria-label="Mobile case study sections"
                  className="max-h-[46dvh] overflow-y-auto p-2.5"
                >
                  <ul className="flex flex-col gap-1">
                    {sections.map((section) => {
                      const isActive = section.id === activeId
                      return (
                        <li key={`mob-sec-${section.id}`}>
                          <button
                            aria-current={isActive ? 'location' : undefined}
                            className={cn(
                              'touch-target flex w-full items-center gap-3 rounded-card-sm px-3.5 py-2.5 text-left text-body-m-regular transition-colors',
                              isActive
                                ? 'bg-primary-main text-border-10'
                                : 'text-title-90 hover:bg-border-20',
                            )}
                            onClick={() => scrollToSection(section.id)}
                            type="button"
                          >
                            <span
                              className={cn(
                                'w-7 shrink-0 text-body-s-regular uppercase tabular-nums',
                                isActive
                                  ? 'text-border-10/75'
                                  : 'text-body-60',
                              )}
                            >
                              {section.code}
                            </span>
                            <span className="truncate">{section.label}</span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </nav>

                {/* Sheet Footer Actions */}
                <div className="flex items-center justify-between gap-2 border-t border-border-30 bg-border-20/60 px-4 py-2.5">
                  <button
                    className="touch-target inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-body-s-regular text-title-90 transition-colors hover:bg-border-10"
                    onClick={scrollToTop}
                    type="button"
                  >
                    <ArrowUpIcon aria-hidden="true" className="size-3.5" />
                    <span>Top</span>
                  </button>

                  {nextProjectHref && nextProjectTitle && (
                    <a
                      className="touch-target inline-flex max-w-[13rem] items-center gap-1 truncate rounded-full px-3 py-1.5 text-body-s-regular text-title-90 transition-colors hover:bg-border-10"
                      href={getAppHref(nextProjectHref)}
                      onClick={(event) =>
                        handleInternalLink(event, nextProjectHref)
                      }
                    >
                      <span className="truncate">Next: {nextProjectTitle}</span>
                      <ChevronRightIcon
                        aria-hidden="true"
                        className="size-3.5 shrink-0"
                      />
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Floating Pill Dock */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="relative flex max-w-full items-center gap-1.5 overflow-hidden rounded-full border border-border-30 bg-border-10/95 p-1.5 shadow-soft backdrop-blur-header"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Subtle Bottom Progress Hairline */}
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute right-5 bottom-0 left-5 h-[2px] origin-left bg-primary-main/80"
              style={{ scaleX: prefersReducedMotion ? 0 : smoothProgress }}
            />

            {/* Quick Back Button */}
            <Button
              ariaLabel={backLabel}
              className="group shrink-0 border-border-30 px-3.5 text-title-100 hover:border-primary-main"
              fillOnHover
              href={getAppHref(backHref)}
              onClick={(event) => handleInternalLink(event, backHref)}
            >
              <ArrowLeftIcon
                aria-hidden="true"
                className="size-4 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5"
              />
            </Button>

            <span
              aria-hidden="true"
              className="h-5 w-px shrink-0 bg-border-30"
            />

            {/* Active Chapter & Breadcrumb Trigger */}
            <button
              aria-expanded={isMobileDrawerOpen}
              aria-label={`Open case study navigation. Currently reading ${activeSection?.label ?? currentTitle}, ${readPercent}% complete`}
              className={cn(
                'press-scale touch-target flex min-w-0 items-center gap-2 rounded-full px-3 py-2 text-left transition-colors focus-visible:outline-2 focus-visible:outline-primary-main',
                isMobileDrawerOpen
                  ? 'bg-border-20 text-title-100'
                  : 'text-title-100 hover:bg-border-20/80',
              )}
              onClick={() => setIsMobileDrawerOpen((open) => !open)}
              type="button"
            >
              <span className="truncate text-body-m-regular text-title-100">
                {activeSection
                  ? `${activeSection.code} · ${activeSection.label}`
                  : currentTitle}
              </span>

              <span className="shrink-0 rounded-full bg-border-20 px-2 py-0.5 text-body-s-regular tabular-nums text-body-70">
                {readPercent}%
              </span>

              <ChevronUpIcon
                aria-hidden="true"
                className={cn(
                  'size-4 shrink-0 text-title-90 transition-transform duration-200',
                  isMobileDrawerOpen && 'rotate-180',
                )}
              />
            </button>

            {/* Integrated Gallery Mode Switcher on Mobile when Gallery is in View */}
            <AnimatePresence initial={false}>
              {mobileDockExtension && (
                <motion.div
                  animate={{ opacity: 1, width: 'auto' }}
                  className="flex shrink-0 items-center gap-1 overflow-hidden"
                  exit={{ opacity: 0, width: 0 }}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1, width: 'auto' }
                      : { opacity: 0, width: 0 }
                  }
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span
                    aria-hidden="true"
                    className="h-5 w-px shrink-0 bg-border-30"
                  />
                  {mobileDockExtension}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </>
  )
}
