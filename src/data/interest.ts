import photoOne from '@/assets/photo/1.png'
import photoTwo from '@/assets/photo/2.png'
import parcelinImage from '@/assets/Parcelin Mobile App.png'
import kpiCodelabsImage from '@/assets/KPI CodeLabs 2026.png'
import unikomImage from '@/assets/UNIKOM Perlengkapan.png'

export interface InterestStat {
  label: string
  value: string
}

export interface InterestChapter {
  id: string
  indexLabel: string
  shortLabel: string
  title: string
  captionTitle: string
  captionMeta: string
  narrative: string
  imageSrc: string
  imageAlt: string
  aspectRatio: 'portrait' | 'landscape'
  detailNote: string
  stats?: InterestStat[]
  isFuture?: boolean
}

export interface FloatingGalleryPhoto {
  id: string
  imageSrc: string
  horizontalClass: string
  sizeClass: string
  aspectClass: string
  initialYVh: number
  travelVh: number
  depth: number
  opacityClass: string
  isGhost?: boolean
}

export interface InterestPageContent {
  intro: {
    eyebrow: string
    headlineLines: [string, string]
    scrollLabel: string
    hintLabel: string
  }
  chapters: InterestChapter[]
  floatingPhotos: FloatingGalleryPhoto[]
}

export const interestContent: InterestPageContent = {
  intro: {
    eyebrow: 'Outside the design canvas',
    headlineLines: ['Things that keep me curious', 'when I’m off the clock.'],
    scrollLabel: 'Scroll down',
    hintLabel: 'Click on a photo to learn more.',
  },
  floatingPhotos: [
    {
      id: 'float-1',
      imageSrc: photoOne,
      horizontalClass: 'left-[3%] lg:left-[6%]',
      sizeClass: 'w-28 md:w-36 lg:w-44',
      aspectClass: 'aspect-[3/2]',
      initialYVh: 16,
      travelVh: 340,
      depth: 1.5,
      opacityClass: 'opacity-50 md:opacity-75 lg:opacity-85',
    },
    {
      id: 'float-2',
      imageSrc: photoTwo,
      horizontalClass: 'right-[4%] lg:right-[7%]',
      sizeClass: 'w-24 md:w-32 lg:w-40',
      aspectClass: 'aspect-[4/5]',
      initialYVh: 54,
      travelVh: 390,
      depth: 1.75,
      opacityClass: 'opacity-45 md:opacity-75 lg:opacity-85',
    },
    {
      id: 'float-3',
      imageSrc: photoTwo,
      horizontalClass: 'left-[10%] lg:left-[15%]',
      sizeClass: 'w-24 md:w-28 lg:w-36',
      aspectClass: 'aspect-[4/5]',
      initialYVh: 92,
      travelVh: 290,
      depth: 1.2,
      opacityClass: 'opacity-35 md:opacity-55 lg:opacity-70',
    },
    {
      id: 'float-4',
      imageSrc: photoOne,
      horizontalClass: 'right-[12%] lg:right-[17%]',
      sizeClass: 'w-28 md:w-36 lg:w-44',
      aspectClass: 'aspect-[3/2]',
      initialYVh: 122,
      travelVh: 420,
      depth: 1.85,
      opacityClass: 'opacity-45 md:opacity-70 lg:opacity-85',
    },
    {
      id: 'float-5',
      imageSrc: parcelinImage,
      horizontalClass: 'left-[2%] lg:left-[4%]',
      sizeClass: 'w-24 md:w-32 lg:w-36',
      aspectClass: 'aspect-[4/3]',
      initialYVh: 138,
      travelVh: 250,
      depth: 0.95,
      opacityClass: 'opacity-25 md:opacity-40 lg:opacity-50',
    },
    {
      id: 'float-6',
      imageSrc: kpiCodelabsImage,
      horizontalClass: 'right-[2%] lg:right-[5%]',
      sizeClass: 'w-24 md:w-32 lg:w-36',
      aspectClass: 'aspect-[16/10]',
      initialYVh: 22,
      travelVh: 260,
      depth: 1.0,
      opacityClass: 'opacity-25 md:opacity-40 lg:opacity-55',
    },
    {
      id: 'float-7',
      imageSrc: unikomImage,
      horizontalClass: 'left-[22%] hidden lg:block',
      sizeClass: 'w-28',
      aspectClass: 'aspect-[4/3]',
      initialYVh: 68,
      travelVh: 210,
      depth: 0.65,
      opacityClass: 'opacity-20',
      isGhost: true,
    },
    {
      id: 'float-8',
      imageSrc: photoTwo,
      horizontalClass: 'right-[24%] hidden lg:block',
      sizeClass: 'w-24',
      aspectClass: 'aspect-[4/5]',
      initialYVh: 108,
      travelVh: 220,
      depth: 0.6,
      opacityClass: 'opacity-20',
      isGhost: true,
    },
    {
      id: 'float-9',
      imageSrc: photoOne,
      horizontalClass: 'left-[18%] hidden lg:block',
      sizeClass: 'w-32',
      aspectClass: 'aspect-[3/2]',
      initialYVh: 4,
      travelVh: 240,
      depth: 0.75,
      opacityClass: 'opacity-20',
      isGhost: true,
    },
    {
      id: 'float-10',
      imageSrc: photoTwo,
      horizontalClass: 'right-[19%] hidden lg:block',
      sizeClass: 'w-24',
      aspectClass: 'aspect-[4/5]',
      initialYVh: 82,
      travelVh: 310,
      depth: 1.1,
      opacityClass: 'opacity-30',
      isGhost: true,
    },
  ],
  chapters: [
    {
      id: 'photography',
      indexLabel: '01',
      shortLabel: 'Photography',
      title: 'Photography & Casual Walks',
      captionTitle: 'Casual Walks & Random Frames, Photography',
      captionMeta:
        'Mostly photos, with occasional random videos along the way.',
      narrative:
        'I like heading out on casual walks just to take photos of whatever catches my eye. Sometimes I end up shooting random videos too, though I still gravitate toward photography most of the time.',
      imageSrc: photoTwo,
      imageAlt: 'Monochrome portrait preview for photography interest',
      aspectRatio: 'portrait',
      detailNote:
        'Casual walks and spontaneous captures. Placeholder assets are currently in place and can be swapped anytime in src/data/interest.ts.',
      stats: [
        { label: 'Focus', value: 'Photos' },
        { label: 'Side', value: 'Random Videos' },
        { label: 'Style', value: 'Casual Walks' },
      ],
    },
    {
      id: 'running',
      indexLabel: '02',
      shortLabel: 'Running',
      title: 'Running & Pace Logs',
      captionTitle: 'Distance & Pace Archive, Running',
      captionMeta: '5K in 28 min · 10K in 59 min · Half Marathon in 2h 26m',
      narrative:
        'Lately I’ve been really into running. So far my best times are 28 minutes for 5K, 59 minutes for 10K, and 2 hours 26 minutes for a Half Marathon.',
      imageSrc: photoOne,
      imageAlt: 'Running personal bests preview',
      aspectRatio: 'landscape',
      detailNote:
        'Personal best milestones logged so far, still working on staying consistent and shaving off a few minutes next time.',
      stats: [
        { label: '5K', value: '28 min' },
        { label: '10K', value: '59 min' },
        { label: 'Half Marathon', value: '2h 26m' },
      ],
    },
    {
      id: 'ai-tinkering',
      indexLabel: '03',
      shortLabel: 'AI',
      title: 'Exploring AI',
      captionTitle: 'Daily Experiments, Artificial Intelligence',
      captionMeta: 'Testing new tools, workflows, and creative side projects.',
      narrative:
        'Right now I’m also having fun tinkering with AI. From trying out new tools to seeing how they actually fit into everyday creative workflows.',
      imageSrc: photoTwo,
      imageAlt: 'AI experimentation preview',
      aspectRatio: 'portrait',
      detailNote:
        'Hands-on experiments testing ideas, speeding up prototypes, and learning how new AI tools work under the hood.',
      stats: [
        { label: 'Topic', value: 'Tools & Flows' },
        { label: 'Approach', value: 'Hands-on' },
        { label: 'Status', value: 'Active' },
      ],
    },
    {
      id: 'next-obsession',
      indexLabel: '04',
      shortLabel: 'Next',
      title: 'More Hobbies to Come',
      captionTitle: 'Next Chapter, Future Interests',
      captionMeta: 'Three active interests for now, with room for more.',
      narrative:
        'For now, those three are what I spend most of my free time on. I might pick up a new hobby down the road, so this list stays open.',
      imageSrc: photoOne,
      imageAlt: 'Open placeholder frame for future hobbies',
      aspectRatio: 'landscape',
      detailNote: 'Reserved for whatever new curiosity shows up next.',
      isFuture: true,
    },
  ],
}
