export interface ExperienceItem {
  company: string
  description: string
  period: string
  title: string
}

export interface ProfileContent {
  description: string
  eyebrow: string
  experiences: ExperienceItem[]
  heading: string
  introduction: string
  seeAll: {
    href: string
    label: string
  }
}

export const profileContent: ProfileContent = {
  eyebrow: '01 - Profile & Experience',
  heading: 'A little about me.',
  introduction:
    "I design digital experiences that connect people's needs with product goals.",
  description:
    'Experienced in web and mobile product work across agency and community-led projects, with a focus on usability, user-centered design, and scalable solutions.',
  seeAll: {
    href: '#about',
    label: 'See all',
  },
  experiences: [
    {
      title: 'Product Designer',
      company: 'CodeLabs UNIKOM',
      period: 'March 2025 - Present',
      description:
        'Collaborates in product research and development, deepens product design practice, and delivers app and website projects focused on usability and responsive interfaces.',
    },
    {
      title: 'Web UI/UX Designer',
      company: 'Suitmedia Digital Agency',
      period: 'Aug - Dec 2025',
      description:
        'Worked on web-based UI/UX projects, collaborated in requirement discussions and design reviews, and conducted heuristic evaluations and usability feedback analysis.',
    },
  ],
}
