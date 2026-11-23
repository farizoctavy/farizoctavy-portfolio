import parcelinImage from '@/assets/Parcelin Mobile App.png'
import kpiCodelabsImage from '@/assets/KPI CodeLabs 2026.png'
import unikomImage from '@/assets/UNIKOM Perlengkapan.png'

export interface Project {
  category: string
  date: string
  description: string
  href: string
  imageAlt: string
  imageSrc?: string
  title: string
}

export const projects: Project[] = [
  {
    title: 'Parcelin Mobile App',
    description:
      'A mobile experience that makes parcel delivery easier to manage from pickup to arrival.',
    category: 'Product Design',
    date: '2025',
    href: '/work/parcelin-mobile-app',
    imageAlt: 'Parcelin Mobile App project preview',
    imageSrc: parcelinImage,
  },
  {
    title: 'KPI CodeLabs 2026',
    description:
      'A focused dashboard experience for turning performance data into clear next steps.',
    category: 'Dashboard',
    date: '2026',
    href: '/work/kpi-codelabs-2026',
    imageAlt: 'KPI CodeLabs 2026 project preview',
    imageSrc: kpiCodelabsImage,
  },
  {
    title: 'UNIKOM Perlengkapan',
    description:
      'A practical web experience for discovering and purchasing campus essentials.',
    category: 'Web Experience',
    date: '2025',
    href: '/work/unikom-perlengkapan',
    imageAlt: 'UNIKOM Perlengkapan project preview',
    imageSrc: unikomImage,
  },
  {
    title: 'SUPER SIER ARENA',
    description:
      'A bold digital experience created to bring the SUPER SIER ARENA brand to life.',
    category: 'Web Experience',
    date: '2024',
    href: '/work/super-sier-arena',
    imageAlt: 'SUPER SIER ARENA project preview',
  },
]
