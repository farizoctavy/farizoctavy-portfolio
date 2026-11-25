import { Header } from '@/components/organisms/Header'
import { Heading } from '@/components/atoms/Heading'
import { MainLayout } from '@/components/templates/MainLayout'
import { navContent } from '@/data/nav'

export interface UnderDevelopmentPageProps {
  pageName: string
}

export function UnderDevelopmentPage({
  pageName,
}: UnderDevelopmentPageProps) {
  return (
    <MainLayout header={<Header content={navContent} />}>
      <section
        aria-labelledby="under-development-title"
        className="content-container flex min-h-[calc(100svh-var(--header-height))] flex-col items-center justify-center py-20 text-center"
      >
        <Heading
          className="text-[length:var(--text-h1)] font-medium tracking-tight text-title-100"
          id="under-development-title"
        >
          404
        </Heading>
        <p className="mt-6 max-w-prose text-body-xl-regular text-body-70">
          This page is currently under development.
        </p>
        <p className="mt-2 text-body-l-regular text-body-60">
          Stay tuned for updates.
        </p>
        <span className="sr-only">{pageName}</span>
      </section>
    </MainLayout>
  )
}
