import { parcelinCaseStudy } from './parcelin'
import type { CaseStudyContent } from './types'

export type {
  CaseStudyCapability,
  CaseStudyChapter,
  CaseStudyContent,
  CaseStudyGallerySlice,
  CaseStudyMedia,
  CaseStudyMetadataRow,
  CaseStudyPlanSlide,
  CaseStudyStat,
} from './types'

export const caseStudies: Record<string, CaseStudyContent> = {
  parcelin: parcelinCaseStudy,
}

export function getCaseStudyBySlug(slug: string): CaseStudyContent | null {
  return caseStudies[slug] ?? null
}
