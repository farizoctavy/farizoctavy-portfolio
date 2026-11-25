import type { MouseEvent } from 'react'

import { getAppHref, navigateTo } from '@/lib/navigation'
import { cn } from '@/lib/utils'

export interface LogoProps {
  ariaLabel: string
  descriptor: string
  href?: string
  iconSrc: string
  name: string
  className?: string
}

export function Logo({
  ariaLabel,
  descriptor,
  href = '/',
  iconSrc,
  name,
  className,
}: LogoProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      href !== '/' ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }

    event.preventDefault()
    navigateTo('/')
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }

  return (
    <a
      aria-label={ariaLabel}
      className={cn('inline-flex min-h-11 shrink-0 items-center gap-2', className)}
      href={getAppHref(href)}
      onClick={handleClick}
    >
      <img alt="" className="size-8 object-contain lg:size-10" src={iconSrc} />
      <span className="text-body-xl-regular whitespace-nowrap text-body-60">
        <span className="logo-name">{name}</span>
        <span className="logo-name" aria-hidden="true">
          {' '}
        </span>
        <span className="text-title-100 text-body-xl-semibold">{descriptor}</span>
      </span>
    </a>
  )
}
