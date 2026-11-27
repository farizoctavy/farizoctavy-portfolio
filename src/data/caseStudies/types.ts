export interface CaseStudyMedia {
  id: string
  src: string
  alt: string
  caption?: string
  aspectClass?: string
}

export interface CaseStudyMetadataRow {
  label: string
  value: string
}

export interface CaseStudyStat {
  value: string
  label: string
  detail?: string
}

export interface CaseStudyCapability {
  title: string
  description: string
}

export interface CaseStudyChapter {
  id: string
  number: string
  eyebrow: string
  heading: string
  paragraphs: string[]
  calloutQuote?: string
  stats?: CaseStudyStat[]
  capabilities?: CaseStudyCapability[]
  media?: CaseStudyMedia[]
  mediaLayout?: 'full' | 'duo'
}

export interface CaseStudyPlanSlide {
  id: string
  code: string
  title: string
  subtitle: string
  image: CaseStudyMedia
}

export type CaseStudyGallerySlice =
  | { type: 'full'; image: CaseStudyMedia }
  | { type: 'trioAsymmetric'; items: [CaseStudyMedia, CaseStudyMedia, CaseStudyMedia] }
  | { type: 'duoStaggered'; left: CaseStudyMedia; right: CaseStudyMedia }

export interface CaseStudyContent {
  slug: string
  titleLines: [string, string]
  heroStat: {
    value: string
    unit: string
    caption: string
  }
  heroImage: CaseStudyMedia
  metadata: CaseStudyMetadataRow[]
  leadHeading: string
  leadStatement: string
  openingQuote?: string
  plansViewer?: {
    title: string
    subtitle: string
    slides: CaseStudyPlanSlide[]
  }
  chapters: CaseStudyChapter[]
  gallery: {
    eyebrow: string
    heading: string
    images: CaseStudyMedia[]
    slices: CaseStudyGallerySlice[]
  }
  nextProject: {
    eyebrow: string
    titleLines: [string, string]
    href: string
    thumbnail: CaseStudyMedia
  }
}
