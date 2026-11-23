export interface HeroAction {
  href: string
  label: string
}

export interface HeroContent {
  badge: string
  greeting: string
  name: string
  role: string
  roles: string[]
  subtext: string
  actions: {
    work: HeroAction
    contact: HeroAction
  }
}

export const heroContent: HeroContent = {
  badge: 'Available for work - Indonesia',
  greeting: 'Hello,',
  name: 'i’m Fariz Oktavian',
  role: 'Product Designer',
  roles: [
    'Product Designer',
    'UI/UX Designer',
    'System Designer',
    'Business Analyst',
  ],
  subtext:
    'I turn complex systems into simple, usable products, from user research and flows to polished interfaces and design systems.',
  actions: {
    work: { label: 'View my Work', href: '#work' },
    contact: { label: 'Get in Touch', href: '#contact' },
  },
}
