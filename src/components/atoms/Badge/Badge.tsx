import type { ReactNode } from 'react'

import { StatusDot } from '@/components/atoms/StatusDot'
import { cn } from '@/lib/utils'

export interface BadgeProps {
  children: ReactNode
  className?: string
  dot?: boolean
}

export function Badge({ children, className, dot = false }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex h-10 items-center gap-2 rounded-full bg-border-20 px-4 text-body-m-regular text-title-100',
        className,
      )}
    >
      {dot && <StatusDot blink />}
      <span>{children}</span>
    </div>
  )
}
