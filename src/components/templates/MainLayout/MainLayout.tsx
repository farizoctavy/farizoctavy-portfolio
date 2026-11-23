import type { ReactNode } from 'react'

import { Background } from '@/components/organisms/Background'
import { Footer } from '@/components/organisms/Footer'
import { footerContent } from '@/data/footer'

export interface MainLayoutProps {
  children: ReactNode
  header?: ReactNode
}

export function MainLayout({ children, header }: MainLayoutProps) {
  return (
    <div className="relative isolate flex min-h-dvh flex-col bg-border-10 text-title-100" id="top">
      <Background />
      {header}
      <main className="relative z-10 flex-1 pt-16 lg:pt-18">{children}</main>
      <Footer content={footerContent} />
    </div>
  )
}
