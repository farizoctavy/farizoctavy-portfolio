export interface FooterSocialLink {
  href: string
  label: string
}

export interface FooterContent {
  eyebrow: string
  headline: {
    primary: string
    muted: string
  }
  contact: {
    label: string
    href: string
  }
  email: string
  wordmark: string
  copyrightName: string
  location: string
  socialLinks: FooterSocialLink[]
  backToTop: string
}

export const footerContent: FooterContent = {
  eyebrow: 'Have something in mind?',
  headline: {
    primary: 'Let’s create ',
    muted: 'something meaningful.',
  },
  contact: {
    label: 'contact me',
    href: 'mailto:farizoctavy@gmail.com',
  },
  email: 'farizoctavy@gmail.com',
  wordmark: 'farizoctavy',
  copyrightName: 'Fariz Oktavian',
  location: 'Based in Bandung, Indonesia',
  socialLinks: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/farizoctaviaan/',
    },
    {
      label: 'Dribbble',
      href: 'https://dribbble.com/farizoktaviaan',
    },
    {
      label: 'GitHub',
      href: 'https://github.com/farizoctavy',
    },
  ],
  backToTop: 'Back to top',
}
