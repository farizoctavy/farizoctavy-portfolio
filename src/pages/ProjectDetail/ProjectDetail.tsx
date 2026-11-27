import { Header } from '@/components/organisms/Header'
import { ProjectCaseStudy } from '@/components/organisms/ProjectCaseStudy'
import { MainLayout } from '@/components/templates/MainLayout'
import { getCaseStudyBySlug } from '@/data/caseStudies'
import { navContent } from '@/data/nav'
import { UnderDevelopmentPage } from '@/pages/UnderDevelopment'

export interface ProjectDetailProps {
  slug: string
}

export function ProjectDetail({ slug }: ProjectDetailProps) {
  const study = getCaseStudyBySlug(slug)

  if (!study) {
    return <UnderDevelopmentPage pageName="Work" />
  }

  return (
    <MainLayout header={<Header content={navContent} />}>
      <ProjectCaseStudy content={study} />
    </MainLayout>
  )
}
