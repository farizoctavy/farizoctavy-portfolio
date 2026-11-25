import type { FocusEvent, PointerEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import { Button } from '@/components/atoms/Button'
import { Icon } from '@/components/atoms/Icon'
import { RollingText } from '@/components/atoms/RollingText'
import { NavLink } from '@/components/molecules/NavLink'
import type { NavigationContent } from '@/data/nav'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useRollingText } from '@/hooks/useRollingText'

export interface MobileMenuProps {
  activeId: string | null
  content: NavigationContent
  isOpen: boolean
  menuId: string
  navigationAnimation: boolean
  onClose: () => void
}

export function MobileMenu({
  activeId,
  content,
  isOpen,
  menuId,
  navigationAnimation,
  onClose,
}: MobileMenuProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const ctaRoll = useRollingText()
  const menuItemVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1] as const,
          },
        },
      }
  const menuContentVariants = {
    hidden: {},
    visible: {
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { delayChildren: 0.12, staggerChildren: 0.08 },
    },
  }
  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }

  const handleCtaPointerEnter = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'touch') {
      ctaRoll.play()
    }
  }

  const handleCtaFocus = (event: FocusEvent<HTMLElement>) => {
    if (event.currentTarget.matches(':focus-visible')) {
      ctaRoll.play()
    }
  }

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          animate={{ x: 0 }}
          aria-label="Mobile navigation"
          aria-modal="true"
          className="fixed inset-0 z-[60] h-dvh w-screen overflow-y-auto overscroll-contain bg-border-10 lg:hidden"
          exit={{ x: '100%' }}
          id={menuId}
          initial={prefersReducedMotion ? false : { x: '100%' }}
          role="dialog"
          transition={transition}
        >
          <motion.nav
          aria-label="Primary navigation"
          className="content-container flex min-h-dvh flex-col pb-8 pt-[var(--header-height)]"
          initial={prefersReducedMotion ? false : 'hidden'}
          variants={menuContentVariants}
          animate="visible"
        >
            <ul className="border-t border-border-30">
              {content.items.map((item) => (
                <motion.li key={item.id} variants={menuItemVariants}>
                  <NavLink
                    active={activeId === item.id}
                    animateActive={navigationAnimation}
                    item={item}
                    mobile
                    onNavigate={onClose}
                  />
                </motion.li>
              ))}
              <motion.li variants={menuItemVariants}>
                <Button
                  className="mobile-menu-cta w-full rounded-none border-0 border-b border-border-30 px-0 text-h3-bold text-title-80 hover:bg-transparent hover:text-title-100 focus-visible:bg-transparent"
                  fillOnHover={false}
                  href={content.callToAction.href}
                  onFocus={handleCtaFocus}
                  onClick={onClose}
                  onPointerEnter={handleCtaPointerEnter}
                  rightIcon={<Icon className="size-6" name="arrow-right" />}
                  variant="outline"
                >
                  <RollingText
                    isPlaying={ctaRoll.isPlaying}
                    onAnimationComplete={ctaRoll.complete}
                  >
                    {content.callToAction.label}
                  </RollingText>
                </Button>
              </motion.li>
            </ul>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
