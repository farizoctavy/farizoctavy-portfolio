import heroSpeakingPhoto from '@/assets/photo/1.png'
import runPhoto from '@/assets/photo/Run.png'
import setupPhoto from '@/assets/photo/Setup.png'
import setupOnePhoto from '@/assets/photo/Setup-1.png'
import setupTwoPhoto from '@/assets/photo/Setup-2.png'
import achievementPhoto from '@/assets/photo/acchivement.png'
import eventPhoto from '@/assets/photo/event.png'
import photographyMain from '@/assets/photo/photography.png'
import photographyFive from '@/assets/photo/photography-5.png'
import photographySix from '@/assets/photo/photography-6.png'
import photographySeven from '@/assets/photo/photography-7.png'

export interface AboutMetadataRow {
  label: string
  value: string
}

export interface AboutExperienceRow {
  id: string
  organization: string
  role: string
  period: string
  location: string
  summary: string
  highlights: string[]
}

export interface AboutRecognitionRow {
  title: string
  organization: string
  year: string
}

export interface AboutMetricItem {
  value: string
  labelLines: [string, string]
}

export interface AboutGalleryFrame {
  id: string
  title: string
  meta: string
  imageSrc: string
  imageAlt: string
  aspectClass: string
  gridClass: string
  href: string
}

export interface AboutContent {
  hero: {
    imageSrc: string
    imageAlt: string
    lines: [string, string, string]
    scrollLabel: string
  }
  thesis: {
    displayLines: [string, string]
    leftCaption: string
    rightCaption: string
    editorialPhoto: {
      imageSrc: string
      imageAlt: string
      caption: string
    }
  }
  profile: {
    label: string
    manifesto: string
    supportingCopy: string
    metadata: AboutMetadataRow[]
    recognitionHeading: string
    recognitions: AboutRecognitionRow[]
    educationHeading: string
    education: {
      institution: string
      degree: string
      period: string
      gpaLabel: string
      gpaValue: string
      gpaNote: string
    }
  }
  experience: {
    label: string
    heading: string
    rows: AboutExperienceRow[]
  }
  dialPivot: {
    spokes: { number: string; label: string }[]
    lightPhrase: [string, string]
    darkPhrase: [string, string]
    caption: string
  }
  runningSection: {
    label: string
    statement: string
    photoSrc: string
    photoAlt: string
    photoCaption: string
    metrics: AboutMetricItem[]
  }
  gallery: {
    heading: string
    countLabel: string
    seeAllLabel: string
    seeAllHref: string
    frames: AboutGalleryFrame[]
  }
  aiSection: {
    label: string
    statement: string
    body: string
    primaryPhoto: {
      imageSrc: string
      imageAlt: string
      caption: string
    }
    secondaryPhoto: {
      imageSrc: string
      imageAlt: string
      caption: string
    }
  }
}

export const aboutContent: AboutContent = {
  hero: {
    imageSrc: heroSpeakingPhoto,
    imageAlt:
      'Fariz Oktavian presenting a Design Thinking workshop in Bandung',
    lines: ['Fariz Oktavian', 'Product Designer', '& Systems Thinker'],
    scrollLabel: 'Scroll to explore',
  },
  thesis: {
    displayLines: ['Clean Logic', '& Human Craft'],
    leftCaption:
      'Studying Information Systems in Bandung while designing web and mobile products that people can actually figure out on the first try.',
    rightCaption:
      'Less clutter, clearer flows. I like taking messy requirements and turning them into calm interfaces that just make sense.',
    editorialPhoto: {
      imageSrc: eventPhoto,
      imageAlt:
        'Fariz Oktavian with students after a UX Architecture and MVP Prototyping workshop',
      caption: 'UX Architecture & MVP Prototyping Session, Bandung',
    },
  },
  profile: {
    label: 'Profile',
    manifesto:
      'I design digital products where real user needs meet clear product goals, from early research and flows down to the final screen.',
    supportingCopy:
      'Over the past couple of years I have worked across agency projects and campus research labs, mostly focusing on usability, responsive web and mobile interfaces, and design systems that hold up when built.',
    metadata: [
      { label: 'Role', value: 'Product & UI/UX Designer' },
      { label: 'Based in', value: 'Bandung, Indonesia' },
      { label: 'Education', value: 'Information Systems, UNIKOM' },
      { label: 'Status', value: 'Open for Product & UI/UX Work' },
    ],
    recognitionHeading: 'Recognition',
    recognitions: [
      {
        title: 'Best Team, UX Academy COMPFEST 18',
        organization: 'Universitas Indonesia',
        year: '2026',
      },
      {
        title: 'Google Student Ambassador',
        organization: 'Google Indonesia',
        year: '2026',
      },
      {
        title: '1st Winner, UI/UX Design (SIMI CUP)',
        organization: 'HIMA SI UNIKOM',
        year: '2025',
      },
      {
        title: '1st Place Certificate, Final Project',
        organization: 'MySkill Intensive Bootcamp',
        year: '2024',
      },
    ],
    educationHeading: 'Education',
    education: {
      institution: 'Universitas Komputer Indonesia',
      degree: 'Bachelor of Information Systems',
      period: 'October 2023 – Present',
      gpaLabel: 'Cumulative GPA',
      gpaValue: '3.71 / 4.0',
      gpaNote: 'Through 6th semester',
    },
  },
  experience: {
    label: 'Experience',
    heading: 'Places where I learned by actually shipping.',
    rows: [
      {
        id: 'codelabs',
        organization: 'CodeLabs UNIKOM',
        role: 'Product Designer',
        period: 'Mar 2025 – Present',
        location: 'Bandung',
        summary:
          'Works directly with student engineers and researchers on web and mobile products, keeping usability and clean responsive layouts front and center.',
        highlights: [
          'Product research and end-to-end UX flows',
          'Operational dashboards and responsive web apps',
          'Close handoff with developers',
        ],
      },
      {
        id: 'suitmedia',
        organization: 'Suitmedia Digital Agency',
        role: 'Web UI/UX Designer',
        period: 'Aug – Dec 2025',
        location: 'Remote / Hybrid',
        summary:
          'Designed web UI/UX deliverables, joined client requirement calls and design reviews, and ran heuristic audits to spot friction early.',
        highlights: [
          'Requirement discussions and design critiques',
          'Heuristic evaluations and usability notes',
          'Production web interface design',
        ],
      },
      {
        id: 'gsa',
        organization: 'Google Indonesia',
        role: 'Google Student Ambassador',
        period: '2026',
        location: 'Bandung',
        summary:
          'Hosts campus sessions around UX architecture, MVP prototyping, and practical AI workflows for students who want to build.',
        highlights: [
          'UX Architecture and Design Thinking workshops',
          'Peer mentoring and campus tech events',
          'Hands-on AI prototyping sessions',
        ],
      },
    ],
  },
  dialPivot: {
    spokes: [
      { number: '01', label: 'Research' },
      { number: '02', label: 'Flows' },
      { number: '03', label: 'Systems' },
      { number: '04', label: 'UI Craft' },
      { number: '05', label: 'Prototyping' },
      { number: '06', label: 'AI Tools' },
    ],
    lightPhrase: ['Clear Systems', '& Real Craft'],
    darkPhrase: ['Off the Clock', '& Still Curious'],
    caption: 'What keeps me moving once Figma closes.',
  },
  runningSection: {
    label: 'Running & Rhythm',
    statement:
      'Outside the canvas, I chase pace on asphalt and keep steady across both miles and semesters.',
    photoSrc: runPhoto,
    photoAlt: 'Fariz Oktavian running outdoors on a morning route',
    photoCaption: 'Morning Route — Asphalt & Pace',
    metrics: [
      {
        value: '28m',
        labelLines: ['5K run', 'personal best'],
      },
      {
        value: '59m',
        labelLines: ['10K run', 'personal best'],
      },
      {
        value: '2:26',
        labelLines: ['Half marathon', 'finish time'],
      },
      {
        value: '3.71',
        labelLines: ['Cumulative GPA', 'at UNIKOM'],
      },
    ],
  },
  gallery: {
    heading: 'Frames & Moments',
    countLabel: '(06)',
    seeAllLabel: 'Open myInterest',
    seeAllHref: '/my-interest',
    frames: [
      {
        id: 'frame-stairs',
        title: 'Sunlit Geometry',
        meta: 'Photography · 4:5',
        imageSrc: photographySeven,
        imageAlt: 'Architectural white stairs in afternoon light',
        aspectClass: 'aspect-[4/5]',
        gridClass: 'md:col-span-5',
        href: '/my-interest',
      },
      {
        id: 'frame-monument',
        title: 'Symmetry & Sky',
        meta: 'Photography · 4:5',
        imageSrc: photographySix,
        imageAlt: 'Symmetrical white monument facade',
        aspectClass: 'aspect-[4/5]',
        gridClass: 'md:col-span-5 md:col-start-8 md:mt-24',
        href: '/my-interest',
      },
      {
        id: 'frame-compfest',
        title: 'COMPFEST 18 Best Team',
        meta: 'Recognition · 2026',
        imageSrc: achievementPhoto,
        imageAlt: 'Team A holding Best Team award at UX Academy COMPFEST 18',
        aspectClass: 'aspect-[3/2]',
        gridClass: 'md:col-span-7 md:mt-8',
        href: '/my-interest',
      },
      {
        id: 'frame-windows',
        title: 'Quiet Facades',
        meta: 'Photography · 4:5',
        imageSrc: photographyFive,
        imageAlt: 'Vintage building windows in warm film tones',
        aspectClass: 'aspect-[4/5]',
        gridClass: 'md:col-span-4 md:col-start-9 md:-mt-12',
        href: '/my-interest',
      },
      {
        id: 'frame-indomaret',
        title: 'Evening Walk',
        meta: 'Photography · 4:5',
        imageSrc: photographyMain,
        imageAlt: 'Evening street corner storefront captured on a walk',
        aspectClass: 'aspect-[4/5]',
        gridClass: 'md:col-span-5 md:col-start-2 md:mt-12',
        href: '/my-interest',
      },
      {
        id: 'frame-setup',
        title: 'Late-Night AI Tinkering',
        meta: 'Desk Setup · 4:3',
        imageSrc: setupPhoto,
        imageAlt: 'Dual monitor desk setup running web and AI experiments',
        aspectClass: 'aspect-[4/3]',
        gridClass: 'md:col-span-5 md:col-start-8 md:mt-24',
        href: '/my-interest',
      },
    ],
  },
  aiSection: {
    label: 'AI & Next Up',
    statement:
      'Right now I spend a lot of spare time tinkering with AI tools and seeing how they fit into real design work.',
    body: 'For now it is photography walks, running splits, and AI experiments. I might pick up another hobby later, so this part stays open.',
    primaryPhoto: {
      imageSrc: setupTwoPhoto,
      imageAlt: 'Mechanical keyboard, study notes, drawing pen, and iced coffee',
      caption: 'Notes, pen, and late-night experiments',
    },
    secondaryPhoto: {
      imageSrc: setupOnePhoto,
      imageAlt: 'Monitor displaying portfolio work on a late-night desk',
      caption: 'Testing ideas one build at a time',
    },
  },
}
