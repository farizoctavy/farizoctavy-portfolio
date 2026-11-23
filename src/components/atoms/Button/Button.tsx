import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FocusEventHandler,
  MouseEventHandler,
  PointerEventHandler,
  ReactNode,
} from 'react'

import { cn } from '@/lib/utils'

export type ButtonVariant = 'inverse' | 'outline' | 'solid'

export interface ButtonProps {
  children: ReactNode
  className?: string
  fillOnHover?: boolean
  href?: string
  rightIcon?: ReactNode
  variant?: ButtonVariant
  onClick?: MouseEventHandler<HTMLElement>
  onFocus?: FocusEventHandler<HTMLElement>
  onPointerEnter?: PointerEventHandler<HTMLElement>
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  ariaLabel?: string
}

const baseClasses =
  'press-scale inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-6 text-body-m-regular transition-[background-color,border-color,color,transform] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-main lg:h-10 lg:min-h-0'

export function Button({
  ariaLabel,
  children,
  className,
  fillOnHover = false,
  href,
  onClick,
  onFocus,
  onPointerEnter,
  rightIcon,
  type = 'button',
  variant = 'outline',
}: ButtonProps) {
  const classes = cn(
    baseClasses,
    variant === 'solid'
      ? 'border-primary-main bg-primary-main text-border-10 hover:bg-primary-hover focus-visible:bg-primary-hover active:bg-primary-pressed'
      : variant === 'inverse'
        ? 'border-border-10 bg-border-10 text-primary-main hover:bg-border-10 focus-visible:bg-border-10 focus-visible:outline-border-10 active:bg-disable-40'
        : 'border-primary-main bg-transparent text-primary-main active:bg-primary-pressed active:text-border-10',
    fillOnHover &&
      'hover:bg-primary-main hover:text-border-10 focus-visible:bg-primary-main focus-visible:text-border-10',
    className,
  )

  if (href) {
    const anchorProps: AnchorHTMLAttributes<HTMLAnchorElement> = {
      'aria-label': ariaLabel,
      className: classes,
      href,
      onClick,
      onFocus,
      onPointerEnter,
    }

    return (
      <a {...anchorProps}>
        {children}
        {rightIcon}
      </a>
    )
  }

  return (
    <button
      aria-label={ariaLabel}
      className={classes}
      onClick={onClick}
      onFocus={onFocus}
      onPointerEnter={onPointerEnter}
      type={type}
    >
      {children}
      {rightIcon}
    </button>
  )
}
