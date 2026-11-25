import type { FocusEvent, MouseEvent, PointerEvent } from 'react'
import { motion } from 'motion/react'

import { RollingText } from '@/components/atoms/RollingText'
import type { NavItem } from '@/data/nav'
import { getAppHref, navigateTo } from '@/lib/navigation'
import { cn } from '@/lib/utils'
import { useRollingText } from '@/hooks/useRollingText'

export interface NavLinkProps {
  active?: boolean
  animateActive?: boolean
  item: NavItem
  mobile?: boolean
  onNavigate?: () => void
  rolling?: boolean
}

export function NavLink({
  active = false,
  animateActive = false,
  item,
  mobile = false,
  onNavigate,
  rolling = true,
}: NavLinkProps) {
  const { complete, isPlaying, play, prefersReducedMotion } = useRollingText()

  const handlePointerEnter = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== 'touch') {
      play()
    }
  }

  const handleFocus = (event: FocusEvent<HTMLAnchorElement>) => {
    if (event.currentTarget.matches(':focus-visible')) {
      play()
    }
  }

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.()

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      !item.href.startsWith('/')
    ) {
      return
    }

    event.preventDefault()
    navigateTo(item.href)
  }

  const canRoll = rolling && !prefersReducedMotion

  return (
    <a
      aria-current={active ? 'page' : undefined}
      className={cn(
        'relative inline-flex min-h-11 items-center transition-colors duration-150 ease-out focus-visible:text-title-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-main active:text-title-100',
        mobile
          ? 'mobile-menu-link w-full justify-center border-b border-border-30 py-6 text-center text-body-60'
          : 'text-body-m-regular text-body-60 hover:text-title-100 lg:min-h-0',
        active && 'text-title-100',
      )}
      href={getAppHref(item.href)}
      onClick={handleClick}
      onFocus={canRoll ? handleFocus : undefined}
      onPointerEnter={canRoll ? handlePointerEnter : undefined}
    >
      <span className="relative inline-flex">
        {canRoll ? (
          <RollingText isPlaying={isPlaying} onAnimationComplete={complete}>
            {item.label}
          </RollingText>
        ) : (
          item.label
        )}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -bottom-1 h-px origin-center bg-primary-main"
          initial={animateActive ? { opacity: 0, scaleX: 0 } : false}
          animate={{
            opacity: active ? 1 : 0,
            scaleX: active ? 1 : 0,
          }}
          transition={
            !animateActive || prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
          }
        />
      </span>
    </a>
  )
}
