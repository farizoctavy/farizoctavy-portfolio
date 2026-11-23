import { Icon } from '@/components/atoms/Icon'
import type { Locale } from '@/data/site'
import { cn } from '@/lib/utils'

export interface LanguageSwitcherProps {
  labels: {
    en: string
    id: string
  }
  locale: Locale
  onChange: (locale: Locale) => void
}

export function LanguageSwitcher({
  labels,
  locale,
  onChange,
}: LanguageSwitcherProps) {
  const languageName = locale === 'en' ? 'English' : 'Indonesian'
  const nextLocale = locale === 'en' ? 'id' : 'en'

  return (
    <button
      aria-label={`Switch language, current: ${languageName}`}
      aria-pressed={locale === 'id'}
      className={cn(
        'press-scale inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-primary-main bg-transparent px-4 text-body-m-regular text-primary-main transition-[background-color,transform] duration-150 ease-out hover:bg-border-20 focus-visible:bg-border-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-main active:bg-border-20 lg:h-10 lg:min-h-0',
      )}
      onClick={() => onChange(nextLocale)}
      type="button"
    >
      <Icon className="size-4" name="globe" />
      <span>{locale === 'en' ? labels.en : labels.id}</span>
    </button>
  )
}
