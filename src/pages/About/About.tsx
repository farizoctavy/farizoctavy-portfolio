import { AboutShowcase } from '@/components/organisms/AboutShowcase'
import { Header } from '@/components/organisms/Header'
import { MainLayout } from '@/components/templates/MainLayout'
import { aboutContent } from '@/data/about'
import { navContent } from '@/data/nav'

export function About() {
  return (
    <MainLayout bleedTop header={<Header content={navContent} />}>
      <AboutShowcase content={aboutContent} />
    </MainLayout>
  )
}
