import { cn } from '@/lib/utils'

export interface StatusDotProps {
  blink?: boolean
  className?: string
}

export function StatusDot({ blink = false, className }: StatusDotProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'size-2 shrink-0 rounded-full bg-success-main motion-reduce:animate-none',
        blink && 'motion-safe:animate-status-blink',
        className,
      )}
    />
  )
}
