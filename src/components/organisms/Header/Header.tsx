import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import type { FocusEvent, PointerEvent as ReactPointerEvent } from 'react'

import { Button } from '@/components/atoms/Button'
import { Icon } from '@/components/atoms/Icon'
import { Logo } from '@/components/atoms/Logo'
import { RollingText } from '@/components/atoms/RollingText'
import { MobileMenu } from '@/components/molecules/MobileMenu'
import { NavLink } from '@/components/molecules/NavLink'
import type { NavigationContent } from '@/data/nav'
import { useCurrentPath } from '@/hooks/useCurrentPath'
import { useRollingText } from '@/hooks/useRollingText'
import { useSplashComplete, useSplashRun } from '@/hooks/useSplashComplete'
import { cn } from '@/lib/utils'

export interface HeaderProps {
  content: NavigationContent
}

const desktopBreakpoint = '(min-width: 64rem)'

export function Header({ content }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const currentPath =
    useCurrentPath().replace(/\/+$/, '') || '/'
  const isHome = currentPath === '/'
  const activeId =
    content.items.find(
      (item) =>
        item.href === currentPath ||
        (item.href !== '/' && currentPath.startsWith(`${item.href}/`)),
    )?.id ?? null
  const ctaRoll = useRollingText()
  const splashComplete = useSplashComplete()
  const splashRun = useSplashRun()
  const splashNavigationAnimation = isHome && splashComplete && splashRun

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 8)
    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })

    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    const handleOutsidePointer = (event: globalThis.PointerEvent) => {
      if (
        headerRef.current &&
        event.target instanceof Node &&
        !headerRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('pointerdown', handleOutsidePointer)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('pointerdown', handleOutsidePointer)
    }
  }, [isMenuOpen])

  useEffect(() => {
    const media = window.matchMedia(desktopBreakpoint)
    const closeOnDesktop = () => {
      if (media.matches) {
        setIsMenuOpen(false)
      }
    }

    media.addEventListener('change', closeOnDesktop)
    return () => media.removeEventListener('change', closeOnDesktop)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMenuOpen])

  const handleCtaPointerEnter = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'touch') {
      ctaRoll.play()
    }
  }

  const handleCtaFocus = (event: FocusEvent<HTMLElement>) => {
    if (event.currentTarget.matches(':focus-visible')) {
      ctaRoll.play()
    }
  }

  const handleMenuClose = () => setIsMenuOpen(false)

  return (
    <header
      ref={headerRef}
      className={cn(
        'fixed inset-x-0 top-0 z-50 w-full border-b transition-[background-color,border-color,backdrop-filter] duration-200 ease-out',
        splashNavigationAnimation && 'motion-safe:animate-page-enter',
        isScrolled
          ? 'border-border-30 bg-border-10/80 backdrop-blur-header'
          : 'border-transparent bg-transparent',
      )}
    >
      <div className="content-container relative z-[70] flex h-16 items-center justify-between lg:h-18">
        <Logo {...content.logo} />

        <div className="hidden items-center gap-6 lg:flex">
          <nav aria-label="Primary navigation">
            <ul className="flex items-center gap-6">
              {content.items.map((item) => (
                <li key={item.id}>
                  <NavLink
                    active={activeId === item.id}
                    animateActive={splashNavigationAnimation}
                    item={item}
                  />
                </li>
              ))}
            </ul>
            </nav>
          <Button
            fillOnHover
            href={content.callToAction.href}
            onFocus={handleCtaFocus}
            onPointerEnter={handleCtaPointerEnter}
          >
            <RollingText
              isPlaying={ctaRoll.isPlaying}
              onAnimationComplete={ctaRoll.complete}
            >
              {content.callToAction.label}
            </RollingText>
          </Button>
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="press-scale touch-target inline-flex items-center justify-center rounded-full text-primary-main transition-[background-color,transform] duration-150 ease-out hover:bg-border-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-main active:bg-border-20 lg:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          ref={menuButtonRef}
          type="button"
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              className="inline-flex"
              exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
              initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
              key={isMenuOpen ? 'close' : 'menu'}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <Icon
                className="size-6"
                name={isMenuOpen ? 'close' : 'bars-3-bottom-right'}
              />
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <MobileMenu
        activeId={activeId}
        content={content}
        isOpen={isMenuOpen}
        menuId="mobile-navigation"
        navigationAnimation={splashNavigationAnimation}
        onClose={handleMenuClose}
      />
    </header>
  )
}
