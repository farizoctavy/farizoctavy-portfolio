import type { AboutQuoteBlock } from '@/data/about'
import { cn } from '@/lib/utils'

export interface EditorialQuoteProps {
  block: AboutQuoteBlock
  className?: string
  emphasis?: 'primary' | 'secondary'
}

export function EditorialQuote({
  block,
  className,
  emphasis = 'secondary',
}: EditorialQuoteProps) {
  const isPrimary = emphasis === 'primary'

  return (
    <div
      className={cn(
        'grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-3 md:grid-cols-[1.75rem_minmax(0,1fr)] md:gap-x-5',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="select-none pt-0.5 text-center font-rounded text-h6-extrabold leading-none text-disable-40 md:text-h4-extrabold"
      >
        “
      </span>

      <h2
        className={cn(
          'text-balance tracking-tight text-title-100',
          isPrimary
            ? 'text-h6-bold leading-snug md:text-h4-bold lg:text-h3-bold lg:leading-tight'
            : 'text-h7-bold leading-snug md:text-h6-bold lg:text-h5-bold lg:leading-snug',
        )}
      >
        {block.headline}
      </h2>

      <div aria-hidden="true" className="mt-4 flex justify-center md:mt-5">
        <span className="h-full w-px bg-border-30" />
      </div>

      <div className="mt-4 flex max-w-prose flex-col gap-4 text-left text-pretty md:mt-5 md:gap-5">
        {block.paragraphs.map((paragraph, index) => (
          <p
            className={cn(
              index === 0
                ? 'text-body-l-regular leading-relaxed text-title-80 md:text-body-xl-regular'
                : 'text-body-m-regular leading-relaxed text-body-70 md:text-body-l-regular',
            )}
            key={paragraph}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )
}
