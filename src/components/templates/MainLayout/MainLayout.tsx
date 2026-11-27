import type { ReactNode } from 'react'

import { Background } from '@/components/organisms/Background'
import { Footer } from '@/components/organisms/Footer'
import { footerContent } from '@/data/footer'

export interface MainLayoutProps {
  bleedTop?: boolean
  children: ReactNode
  header?: ReactNode
  showFooter?: boolean
}

export function MainLayout({
  bleedTop = false,
  children,
  header,
  showFooter = true,
}: MainLayoutProps) {
  return (
    <div className="relative isolate flex min-h-dvh flex-col bg-border-10 text-title-100" id="top">
      <Background />
      {header}
      <main
        className={
          bleedTop
            ? 'relative z-10 flex-1'
            : 'relative z-10 flex-1 pt-[var(--main-padding-top)] lg:pt-[var(--main-padding-top-lg)]'
        }
      >
        {children}
      </main>
      {showFooter && <Footer content={footerContent} />}
    </div>
  )
}
