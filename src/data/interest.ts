import runPhoto from '@/assets/photo/Run.png'
import setupPhoto from '@/assets/photo/Setup.png'
import setupOnePhoto from '@/assets/photo/Setup-1.png'
import setupTwoPhoto from '@/assets/photo/Setup-2.png'
import achievementPhoto from '@/assets/photo/acchivement.png'
import eventPhoto from '@/assets/photo/event.png'
import photographyMain from '@/assets/photo/photography.png'
import photographyOne from '@/assets/photo/photography-1.png'
import photographyTwo from '@/assets/photo/photography-2.png'
import photographyThree from '@/assets/photo/photography-3.png'
import photographyFour from '@/assets/photo/photography-4.png'
import photographyFive from '@/assets/photo/photography-5.png'
import photographySix from '@/assets/photo/photography-6.png'
import photographySeven from '@/assets/photo/photography-7.png'

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
  aspectRatio: 'portrait' | 'tall-portrait' | 'landscape'
  detailNote: string
  stats?: InterestStat[]
  isFuture?: boolean
}

export type FloatingDepthPlane = 'far' | 'mid' | 'near'

export interface FloatingGalleryPhoto {
  id: string
  imageSrc: string
  horizontalClass: string
  sizeClass: string
  aspectClass: string
  initialYVh: number
  travelVh: number
  depth: number
  depthPlane: FloatingDepthPlane
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
    // FAR PLANE — distant, small, slow-moving, grayscale + depth-of-field blur
    {
      id: 'float-far-1',
      imageSrc: achievementPhoto,
      horizontalClass: 'left-[16%] lg:left-[18%] hidden lg:block',
      sizeClass: 'w-24 lg:w-28',
      aspectClass: 'aspect-[3/2]',
      initialYVh: 6,
      travelVh: 175,
      depth: 0.45,
      depthPlane: 'far',
    },
    {
      id: 'float-far-2',
      imageSrc: photographyTwo,
      horizontalClass: 'left-[18%] lg:left-[21%] hidden lg:block',
      sizeClass: 'w-22 lg:w-26',
      aspectClass: 'aspect-[4/5]',
      initialYVh: 74,
      travelVh: 165,
      depth: 0.4,
      depthPlane: 'far',
    },
    {
      id: 'float-far-3',
      imageSrc: photographyFour,
      horizontalClass: 'right-[18%] lg:right-[21%] hidden lg:block',
      sizeClass: 'w-22 lg:w-26',
      aspectClass: 'aspect-[4/5]',
      initialYVh: 34,
      travelVh: 180,
      depth: 0.48,
      depthPlane: 'far',
    },
    {
      id: 'float-far-4',
      imageSrc: photographyThree,
      horizontalClass: 'right-[15%] lg:right-[18%] hidden lg:block',
      sizeClass: 'w-22 lg:w-28',
      aspectClass: 'aspect-[4/5]',
      initialYVh: 112,
      travelVh: 170,
      depth: 0.42,
      depthPlane: 'far',
    },

    // MID PLANE — intermediate scale & speed, softened desaturation & light blur
    {
      id: 'float-mid-1',
      imageSrc: photographyFive,
      horizontalClass: 'left-[9%] lg:left-[11%]',
      sizeClass: 'w-24 md:w-28 lg:w-34',
      aspectClass: 'aspect-[4/5]',
      initialYVh: 42,
      travelVh: 265,
      depth: 0.95,
      depthPlane: 'mid',
    },
    {
      id: 'float-mid-2',
      imageSrc: photographyOne,
      horizontalClass: 'left-[7%] lg:left-[10%]',
      sizeClass: 'w-24 md:w-28 lg:w-34',
      aspectClass: 'aspect-[4/5]',
      initialYVh: 122,
      travelVh: 255,
      depth: 0.9,
      depthPlane: 'mid',
    },
    {
      id: 'float-mid-3',
      imageSrc: eventPhoto,
      horizontalClass: 'right-[8%] lg:right-[11%]',
      sizeClass: 'w-26 md:w-32 lg:w-38',
      aspectClass: 'aspect-[4/3]',
      initialYVh: 14,
      travelVh: 270,
      depth: 1.0,
      depthPlane: 'mid',
    },
    {
      id: 'float-mid-4',
      imageSrc: photographySeven,
      horizontalClass: 'right-[9%] lg:right-[12%] hidden lg:block',
      sizeClass: 'w-28 lg:w-34',
      aspectClass: 'aspect-[4/5]',
      initialYVh: 94,
      travelVh: 280,
      depth: 1.05,
      depthPlane: 'mid',
    },

    // NEAR PLANE — foreground edges, crisp focus, full color, fastest parallax
    {
      id: 'float-near-1',
      imageSrc: photographyMain,
      horizontalClass: 'left-[2%] lg:left-[3.5%]',
      sizeClass: 'w-28 md:w-36 lg:w-44',
      aspectClass: 'aspect-[4/5]',
      initialYVh: 12,
      travelVh: 375,
      depth: 1.6,
      depthPlane: 'near',
    },
    {
      id: 'float-near-2',
      imageSrc: setupTwoPhoto,
      horizontalClass: 'left-[2.5%] lg:left-[4%] hidden lg:block',
      sizeClass: 'w-36 lg:w-44',
      aspectClass: 'aspect-[4/3]',
      initialYVh: 86,
      travelVh: 395,
      depth: 1.7,
      depthPlane: 'near',
    },
    {
      id: 'float-near-3',
      imageSrc: photographySix,
      horizontalClass: 'right-[2%] lg:right-[3.5%]',
      sizeClass: 'w-28 md:w-36 lg:w-44',
      aspectClass: 'aspect-[4/5]',
      initialYVh: 48,
      travelVh: 385,
      depth: 1.65,
      depthPlane: 'near',
    },
    {
      id: 'float-near-4',
      imageSrc: setupOnePhoto,
      horizontalClass: 'right-[2.5%] lg:right-[4%]',
      sizeClass: 'w-26 md:w-34 lg:w-40',
      aspectClass: 'aspect-[3/4]',
      initialYVh: 128,
      travelVh: 410,
      depth: 1.8,
      depthPlane: 'near',
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
      imageSrc: photographySeven,
      imageAlt: 'Architectural sunlit stairs captured on a casual photo walk',
      aspectRatio: 'portrait',
      detailNote:
        'Captured during casual walks—chasing clean geometry, natural light, and everyday textures in film-inspired tones.',
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
      imageSrc: runPhoto,
      imageAlt: 'Fariz Oktavian on a morning street run',
      aspectRatio: 'tall-portrait',
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
      imageSrc: setupPhoto,
      imageAlt: 'Late-night desk setup experimenting with web and AI tools',
      aspectRatio: 'landscape',
      detailNote:
        'Hands-on experiments at the desk—testing ideas, speeding up prototypes, and learning how new AI tools work under the hood.',
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
      imageSrc: setupTwoPhoto,
      imageAlt: 'Desk notes, keyboard, and drawing pen awaiting the next hobby',
      aspectRatio: 'landscape',
      detailNote: 'Reserved for whatever new curiosity shows up next.',
      isFuture: true,
    },
  ],
}
