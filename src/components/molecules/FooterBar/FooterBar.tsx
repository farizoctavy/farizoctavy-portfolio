import type { MouseEvent } from 'react'

import { FooterLink } from '@/components/molecules/FooterLink'
import type { FooterContent } from '@/data/footer'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { scrollToTop } from '@/lib/scroll'

export interface FooterBarProps {
  content: FooterContent
}

export function FooterBar({ content }: FooterBarProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const currentYear = new Date().getFullYear()

  const handleBackToTop = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    scrollToTop(prefersReducedMotion)
  }

  return (
    <div className="grid grid-cols-1 items-start gap-6 pt-7 text-body-m-regular text-border-10 md:items-stretch md:grid-cols-2 md:gap-4 lg:flex lg:flex-row lg:items-center lg:justify-between">
      <p className="min-w-0">{`© ${currentYear} ${content.copyrightName}`}</p>
      <p className="min-w-0 text-left">{content.location}</p>
      <nav aria-label="Social links" className="min-w-0">
        <ul className="flex flex-row flex-wrap items-center gap-x-5 gap-y-2">
          {content.socialLinks.map((link) => (
            <li key={link.label}>
              <FooterLink
                className="text-body-m-regular"
                external
                href={link.href}
                icon="arrow-up-right"
                label={link.label}
              />
            </li>
          ))}
        </ul>
      </nav>
      <FooterLink
        className="justify-self-start whitespace-nowrap text-body-m-regular lg:justify-self-auto"
        href="#top"
        icon="arrow-up"
        label={content.backToTop}
        onClick={handleBackToTop}
      />
    </div>
  )
}
