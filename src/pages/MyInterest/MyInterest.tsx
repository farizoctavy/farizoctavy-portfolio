import { Header } from '@/components/organisms/Header'
import { InterestExperience } from '@/components/organisms/InterestExperience'
import { MainLayout } from '@/components/templates/MainLayout'
import { interestContent } from '@/data/interest'
import { navContent } from '@/data/nav'

export function MyInterest() {
  return (
    <MainLayout bleedTop header={<Header content={navContent} />}>
      <InterestExperience content={interestContent} />
    </MainLayout>
  )
}
