import { FooterLink } from '@/components/molecules/FooterLink'
import type { FooterContent } from '@/data/footer'

export interface FooterBarProps {
  content: FooterContent
}

export function FooterBar({ content }: FooterBarProps) {
  const currentYear = new Date().getFullYear()

  return (
    <div className="grid grid-cols-1 items-start gap-8 pt-7 text-body-m-regular text-border-10 md:items-stretch md:grid-cols-2 md:gap-4 lg:flex lg:flex-row lg:items-center lg:justify-between">
      <p className="min-w-0">{`© ${currentYear} ${content.copyrightName}`}</p>
      <p className="min-w-0 text-left">{content.location}</p>
      <nav aria-label="Social links" className="min-w-0">
        <ul className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-5">
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
      />
    </div>
  )
}
