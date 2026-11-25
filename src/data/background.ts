export interface RecognitionItem {
  title: string
  year: string
}

export interface EducationContent {
  description: string
  institution: string
  period: string
  academicPerformance: {
    label: string
    value: string
    supportingText: string
  }
}

export interface BackgroundContent {
  eyebrow: string
  heading: string
  seeAll: {
    href: string
    label: string
  }
  recognitionLabel: string
  recognitions: RecognitionItem[]
  educationLabel: string
  education: EducationContent
}

export const backgroundContent: BackgroundContent = {
  eyebrow: '03 - Background',
  heading: 'Learning, making, growing & exploring',
  seeAll: {
    href: '/my-interest',
    label: 'See all',
  },
  recognitionLabel: 'RECOGNITION',
  recognitions: [
    {
      title: 'Best Team at UX Academy COMPFEST 18 - Universitas Indonesia',
      year: '2026',
    },
    {
      title: 'Google Student Ambassador - Google Indonesia',
      year: '2026',
    },
    {
      title: '1st Winner, UI/UX Design — SIMI CUP, HIMA SI UNIKOM',
      year: '2025',
    },
    {
      title: '1st Place Certificate, Final Project — MySkill Intensive Bootcamp',
      year: '2024',
    },
  ],
  educationLabel: 'EDUCATION',
  education: {
    description: 'Information System Student',
    institution: 'Universitas Komputer Indonesia',
    period: 'October 2023 - Present',
    academicPerformance: {
      label: 'GPA',
      value: '3.71 / 4.0',
      supportingText: 'through 6th semester',
    },
  },
}
