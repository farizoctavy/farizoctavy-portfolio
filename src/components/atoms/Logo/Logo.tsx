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
  href = '#top',
  iconSrc,
  name,
  className,
}: LogoProps) {
  return (
    <a
      aria-label={ariaLabel}
      className={cn('inline-flex min-h-11 shrink-0 items-center gap-2', className)}
      href={href}
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
