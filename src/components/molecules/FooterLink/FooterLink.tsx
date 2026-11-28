import type { FocusEvent, MouseEventHandler, PointerEvent } from 'react'

import { Icon, type IconName } from '@/components/atoms/Icon'
import { RollingText } from '@/components/atoms/RollingText'
import { useRollingText } from '@/hooks/useRollingText'
import { cn } from '@/lib/utils'

export interface FooterLinkProps {
  className?: string
  external?: boolean
  href: string
  icon?: IconName
  label: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
  underline?: boolean
}

export function FooterLink({
  className,
  external = false,
  href,
  icon,
  label,
  onClick,
  underline = false,
}: FooterLinkProps) {
  const roll = useRollingText()

  const handlePointerEnter = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== 'touch') {
      roll.play()
    }
  }

  const handleFocus = (event: FocusEvent<HTMLAnchorElement>) => {
    if (event.currentTarget.matches(':focus-visible')) {
      roll.play()
    }
  }

  return (
    <a
      className={cn(
        'group inline-flex min-h-11 items-center gap-2 text-border-10 transition-colors duration-150 ease-out hover:text-border-10 focus-visible:text-border-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-10 active:text-border-10',
        className,
      )}
      href={href}
      onClick={onClick}
      onFocus={handleFocus}
      onPointerEnter={handlePointerEnter}
      rel={external ? 'noopener noreferrer' : undefined}
      target={external ? '_blank' : undefined}
    >
      <RollingText
        className={underline ? 'footer-link-underline' : undefined}
        isPlaying={roll.isPlaying}
        onAnimationComplete={roll.complete}
      >
        {label}
      </RollingText>
      {external && <span className="sr-only"> (opens in a new tab)</span>}
      {icon === 'arrow-up' ? (
        <span
          aria-hidden="true"
          className="relative inline-flex size-4 overflow-hidden"
        >
          <Icon
            className="size-4 transition-transform duration-300 ease-out motion-safe:group-hover:-translate-y-full motion-safe:group-focus-visible:-translate-y-full"
            name="arrow-up"
          />
          <Icon
            className="absolute inset-0 size-4 translate-y-full transition-transform duration-300 ease-out motion-safe:group-hover:translate-y-0 motion-safe:group-focus-visible:translate-y-0"
            name="arrow-up"
          />
        </span>
      ) : (
        icon && <Icon className="size-4" name={icon} />
      )}
    </a>
  )
}
