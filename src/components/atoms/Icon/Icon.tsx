import { cn } from '@/lib/utils'

export type IconName =
  | 'arrow-right'
  | 'arrow-up'
  | 'arrow-up-right'
  | 'close'
  | 'globe'
  | 'menu'

export interface IconProps {
  name: IconName
  className?: string
}

export function Icon({ name, className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn('size-4 shrink-0', className)}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {name === 'globe' && (
        <>
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.75" />
          <path
            d="M3.7 12h16.6M12 3.5c2.25 2.33 3.38 5.16 3.38 8.5S14.25 18.17 12 20.5C9.75 18.17 8.62 15.34 8.62 12S9.75 5.83 12 3.5Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </>
      )}
      {name === 'menu' && (
        <path
          d="M4 7h16M4 12h16M4 17h16"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.75"
        />
      )}
      {name === 'close' && (
        <path
          d="m6 6 12 12M18 6 6 18"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.75"
        />
      )}
      {name === 'arrow-right' && (
        <path
          d="M4 12h15m-6-6 6 6-6 6"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.75"
        />
      )}
      {name === 'arrow-up-right' && (
        <path
          d="M5 19 19 5m-8 0h8v8"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.75"
        />
      )}
      {name === 'arrow-up' && (
        <path
          d="M12 19V5m0 0 6 6m-6-6-6 6"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.75"
        />
      )}
    </svg>
  )
}
