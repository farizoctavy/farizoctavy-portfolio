export interface NavItem {
  id: string
  label: string
  href: string
}

export interface NavigationContent {
  logo: {
    name: string
    descriptor: string
    iconSrc: string
    ariaLabel: string
  }
  items: NavItem[]
  callToAction: {
    label: string
    href: string
  }
}

export const navContent: NavigationContent = {
  logo: {
    name: 'farizoctavy',
    descriptor: 'portfolio',
    iconSrc: logoIcon,
    ariaLabel: 'farizoctavy portfolio, home',
  },
  items: [
    { id: 'work', label: 'Work', href: '/work' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'interest', label: 'myInterest', href: '/my-interest' },
  ],
  callToAction: {
    label: 'Get in Touch',
    href: 'mailto:farizoctavy@gmail.com',
  },
}
import logoIcon from '@/assets/farizoctavy-Logo.svg'
