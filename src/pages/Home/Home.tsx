import { Hero } from '@/components/organisms/Hero'
import { Header } from '@/components/organisms/Header'
import { SelectedWork } from '@/components/organisms/SelectedWork'
import { MainLayout } from '@/components/templates/MainLayout'
import { heroContent } from '@/data/hero'
import { navContent } from '@/data/nav'
import { projects } from '@/data/projects'
import { useSplashComplete } from '@/hooks/useSplashComplete'
import { cn } from '@/lib/utils'

export function Home() {
  const splashComplete = useSplashComplete()

  return (
    <div
      aria-hidden={!splashComplete}
      className={cn(!splashComplete && 'invisible')}
    >
      <MainLayout header={<Header content={navContent} />}>
        <Hero content={heroContent} />
        <SelectedWork projects={projects} />
      </MainLayout>
    </div>
  )
}
