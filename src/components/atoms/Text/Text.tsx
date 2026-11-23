import type { ElementType, ReactNode } from 'react'

import { cn } from '@/lib/utils'

export interface TextProps {
  as?: 'p' | 'span'
  children: ReactNode
  className?: string
}

export function Text({ as: Tag = 'p', children, className }: TextProps) {
  const TextTag = Tag as ElementType

  return <TextTag className={cn(className)}>{children}</TextTag>
}
