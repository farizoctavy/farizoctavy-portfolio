import { cn } from '@/lib/utils'

export interface DividerProps {
  className?: string
  orientation?: 'horizontal' | 'vertical'
}

export function Divider({
  className,
  orientation = 'vertical',
}: DividerProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        orientation === 'horizontal'
          ? 'block h-px w-full bg-border-30'
          : 'h-6 w-px shrink-0 bg-title-90',
        className,
      )}
    />
  )
}
