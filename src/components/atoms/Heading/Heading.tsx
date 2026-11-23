import type { ElementType, ReactNode } from 'react'

import { cn } from '@/lib/utils'

export interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children: ReactNode
  className?: string
  id?: string
  ariaLabel?: string
}

export function Heading({
  ariaLabel,
  as: Tag = 'h2',
  children,
  className,
  id,
}: HeadingProps) {
  const HeadingTag = Tag as ElementType

  return (
    <HeadingTag aria-label={ariaLabel} className={cn(className)} id={id}>
      {children}
    </HeadingTag>
  )
}
