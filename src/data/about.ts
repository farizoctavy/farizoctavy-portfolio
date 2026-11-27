import heroLandscapePhoto from '@/assets/photo/1.png'
import portraitSpeakingPhoto from '@/assets/photo/2.png'

export interface AboutQuoteBlock {
  headline: string
  paragraphs: string[]
}

export interface AboutContent {
  hero: {
    imageSrc: string
    imageAlt: string
    scrollLabel: string
    taglineLines: [string, string]
  }
  introBlock: AboutQuoteBlock
  secondSection: {
    imageSrc: string
    imageAlt: string
    quoteBlocks: AboutQuoteBlock[]
  }
}

export const aboutContent: AboutContent = {
  hero: {
    imageSrc: heroLandscapePhoto,
    imageAlt:
      'Fariz Oktavian facilitating a Design Thinking session in front of a whiteboard',
    scrollLabel: 'Scroll to Explore',
    taglineLines: ['Half systems thinker.', 'Half pixel perfectionist.'],
  },
  introBlock: {
    headline: 'Making complex things feel effortless.',
    paragraphs: [
      'I’m Fariz Oktavian. I design web and mobile products that bridge heavy technical logic with calm, human-friendly experiences.',
      'If a product needs a manual to understand, the design isn’t done yet. I build with clarity, rhythm, and real users in mind.',
    ],
  },
  secondSection: {
    imageSrc: portraitSpeakingPhoto,
    imageAlt:
      'Fariz Oktavian speaking with participants during a design workshop',
    quoteBlocks: [
      {
        headline:
          'Off the Figma canvas, you’ll probably find me yapping about design, tech, and how people think.',
        paragraphs: [
          'I don’t believe great products are built in isolation. Whether I’m facilitating a design thinking session, jamming with engineers, or mentoring peers, I thrive on shared curiosity and honest critiques.',
          'Fueled by strong coffee, good typography, and the constant urge to fix bad UX in the wild.',
        ],
      },
      {
        headline:
          'Always curious, always iterating, never too precious about the first draft.',
        paragraphs: [
          'Good design isn’t about showing off—it’s about removing friction until the product feels like second nature. I love digging into the why, testing messy ideas early, and refining the tiny details most people only feel subconsciously.',
          'Whether it’s a complex system from scratch or a subtle micro-interaction, I’m here to make digital spaces feel a little more human.',
        ],
      },
    ],
  },
}
