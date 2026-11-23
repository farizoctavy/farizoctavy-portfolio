import type { FocusEvent, PointerEvent } from 'react'

import { RollingText } from '@/components/atoms/RollingText'
import type { NavItem } from '@/data/nav'
import { cn } from '@/lib/utils'
import { useRollingText } from '@/hooks/useRollingText'

export interface NavLinkProps {
  active?: boolean
  item: NavItem
  mobile?: boolean
  onNavigate?: () => void
  rolling?: boolean
}

export function NavLink({
  active = false,
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

  const canRoll = rolling && !prefersReducedMotion

  return (
    <a
      aria-current={active ? 'page' : undefined}
      className={cn(
        'inline-flex min-h-11 items-center transition-colors duration-150 ease-out focus-visible:text-title-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-main active:text-title-100',
        mobile
          ? 'mobile-menu-link w-full justify-center border-b border-border-30 py-6 text-center text-title-90'
          : 'text-body-m-regular text-body-60 hover:text-title-100 lg:min-h-0',
        active && 'text-title-100',
      )}
      href={item.href}
      onClick={onNavigate}
      onFocus={canRoll ? handleFocus : undefined}
      onPointerEnter={canRoll ? handlePointerEnter : undefined}
    >
      {canRoll ? (
        <RollingText isPlaying={isPlaying} onAnimationComplete={complete}>
          {item.label}
        </RollingText>
      ) : (
        item.label
      )}
    </a>
  )
}
