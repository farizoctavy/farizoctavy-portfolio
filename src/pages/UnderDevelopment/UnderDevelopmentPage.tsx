import { Header } from '@/components/organisms/Header'
import { MainLayout } from '@/components/templates/MainLayout'
import { NotFoundExperience } from '@/components/organisms/NotFoundExperience'
import { navContent } from '@/data/nav'

export interface UnderDevelopmentPageProps {
  pageName: string
}

export function UnderDevelopmentPage({
  pageName,
}: UnderDevelopmentPageProps) {
  return (
    <MainLayout header={<Header content={navContent} />} showFooter={false}>
      <NotFoundExperience pageName={pageName} />
    </MainLayout>
  )
}
