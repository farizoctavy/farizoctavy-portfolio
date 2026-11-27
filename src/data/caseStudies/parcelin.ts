import bannerImg from '@/assets/projects/parcelin/01-banner.png'
import heroShowcaseImg from '@/assets/projects/parcelin/02-hero-showcase.jpg'
import empathizeResearchImg from '@/assets/projects/parcelin/03-empathize-research.png'
import defineMatrixImg from '@/assets/projects/parcelin/04-define-matrix.png'
import ideateJourneyImg from '@/assets/projects/parcelin/05-ideate-journey.png'
import prototypeUiImg from '@/assets/projects/parcelin/06-prototype-ui.png'
import testTambahProdukImg from '@/assets/projects/parcelin/07-test-tambah-produk.png'
import testTerimaPesananImg from '@/assets/projects/parcelin/08-test-terima-pesanan.png'
import outcomeRoadmapImg from '@/assets/projects/parcelin/09-outcome-roadmap.jpg'
import nextProjectThumb from '@/assets/KPI CodeLabs 2026.png'

import type { CaseStudyContent, CaseStudyMedia } from './types'

const media: Record<string, CaseStudyMedia> = {
  banner: {
    id: 'parcelin-banner',
    src: bannerImg,
    alt: 'Parcelin Mobile Design App brand banner',
    caption: 'Parcelin Seller — Brand Identity & App Positioning',
  },
  heroShowcase: {
    id: 'parcelin-hero-showcase',
    src: heroShowcaseImg,
    alt: 'Parcelin Seller mobile app showcase featuring Home, Splash, and Profile screens',
    caption: 'Parcelin Seller — Core Mobile Experience Overview',
  },
  empathizeBoard: {
    id: 'parcelin-empathize',
    src: empathizeResearchImg,
    alt: 'User research synthesis and affinity mapping FigJam board from buyer surveys and seller interviews',
    caption: 'Research revealed that complexity increased as the number of recipients increased.',
  },
  defineBoard: {
    id: 'parcelin-define',
    src: defineMatrixImg,
    alt: 'Define and ideation FigJam board showing Personas, Empathy Maps, HMW statements, and Impact-Effort Matrix',
    caption: 'Personas, Empathy Maps, HMW framing, and 2×2 Impact-Effort Prioritization.',
  },
  ideateBoard: {
    id: 'parcelin-ideate',
    src: ideateJourneyImg,
    alt: 'Customer Journey Map and User Flow FigJam board connecting multi-recipient orders to production',
    caption: 'Customer Journey Map and connected operational User Flow.',
  },
  prototypeCanvas: {
    id: 'parcelin-prototype',
    src: prototypeUiImg,
    alt: 'Figma mobile UI prototype workspace showing high-fidelity screens and design tokens',
    caption: 'High-fidelity seller mobile UI canvas and token foundation in Figma.',
  },
  mazeTambahProduk: {
    id: 'parcelin-maze-produk',
    src: testTambahProdukImg,
    alt: 'Maze usability report for Tambah Produk Baru showing 100% success rate and 42.8s average duration',
    caption: 'Maze Usability Report — Task "Tambah Produk Baru" (100% success · 42.8s avg).',
  },
  mazeTerimaPesanan: {
    id: 'parcelin-maze-pesanan',
    src: testTerimaPesananImg,
    alt: 'Maze usability report for Terima Pesanan showing 83.3% success rate and navigation flow breakdown',
    caption: 'Maze Usability Report — Task "Terima Pesanan" (83.3% success · 117.4s avg).',
  },
  outcomeRoadmap: {
    id: 'parcelin-roadmap',
    src: outcomeRoadmapImg,
    alt: 'Parcelin Future Plan roadmap slide from feedback refinement to MVP launch',
    caption: 'Future Plan — Refine from testing feedback, build MVP, and launch.',
  },
}

export const parcelinCaseStudy: CaseStudyContent = {
  slug: 'parcelin',
  titleLines: ['Parcelin', 'Mobile App'],
  heroStat: {
    value: '70',
    unit: 'SUS',
    caption: 'Usability Score · 2026',
  },
  heroImage: media.heroShowcase,
  metadata: [
    {
      label: 'Overview',
      value: 'Simplifying how sellers manage Ramadan hampers',
    },
    { label: 'Category', value: 'UI/UX · Mobile Product Design' },
    { label: 'My Role', value: 'UX Research, UX Design, UI Design' },
    { label: 'Timeline', value: 'August – September 2026' },
    { label: 'Collaborator', value: 'Fariz Oktavian (Kelompok A)' },
  ],
  leadHeading: 'When one order means more than one delivery.',
  leadStatement:
    'Buying Ramadan hampers almost never ends with one box going to one address. A single customer often orders several parcels for different relatives or colleagues, each with its own delivery address and greeting card. For sellers, that quickly turns into juggling WhatsApp chats, Instagram DMs, and manual spreadsheets.',
  openingQuote:
    '“How might we help hampers sellers manage complex orders without having to rely on scattered chats and manual records?”',
  plansViewer: {
    title: 'Design Artifacts & Process Boards',
    subtitle:
      'Browse the FigJam research boards, user flows, Figma screens, and Maze usability reports behind the product.',
    slides: [
      {
        id: 'plan-empathize',
        code: '01',
        title: 'User Research & Affinity Map',
        subtitle: 'Buyer survey synthesis (14 respondents) & seller interviews',
        image: media.empathizeBoard,
      },
      {
        id: 'plan-define',
        code: '02',
        title: 'Personas, HMW & Impact Matrix',
        subtitle: 'Reframing scattered ordering into one connected problem',
        image: media.defineBoard,
      },
      {
        id: 'plan-ideate',
        code: '03',
        title: 'Customer Journey & User Flow',
        subtitle: 'End-to-end operational flow from pre-order to delivery',
        image: media.ideateBoard,
      },
      {
        id: 'plan-prototype',
        code: '04',
        title: 'Mobile UI Prototype Canvas',
        subtitle: 'Seller dashboard, product upload, and multi-address flows',
        image: media.prototypeCanvas,
      },
      {
        id: 'plan-maze-1',
        code: '05',
        title: 'Maze Test — Tambah Produk',
        subtitle: '100% task completion · 42.8s average duration',
        image: media.mazeTambahProduk,
      },
      {
        id: 'plan-maze-2',
        code: '06',
        title: 'Maze Test — Terima Pesanan',
        subtitle: '83.3% task completion · friction analysis on order flow',
        image: media.mazeTerimaPesanan,
      },
    ],
  },
  chapters: [
    {
      id: 'context',
      number: '01',
      eyebrow: '01 — The Context',
      heading: 'When one order means more than one delivery',
      paragraphs: [
        'Ramadan hampers work differently from a regular online purchase. One buyer often sends several boxes to different recipients in the same transaction, with separate addresses and personal greeting notes attached to each box.',
        'Early on, we noticed most sellers still tracked these orders by hand across WhatsApp threads, Instagram DMs, and spreadsheets. Once order volume climbed, keeping recipients, payment status, and packing progress in sync became exhausting.',
      ],
      media: [media.banner],
      mediaLayout: 'full',
    },
    {
      id: 'empathize',
      number: '02',
      eyebrow: '02 — Empathize',
      heading: 'Getting closer to the people behind the orders',
      paragraphs: [
        'We began with buyer questionnaires and seller interviews to trace how hampers orders actually move from chat to doorstep.',
        'One pattern showed up right away: every extra recipient added friction on both sides. Buyers grew tired of retyping addresses and worried their greeting cards would get swapped, while sellers had to cross-check production batches against scattered delivery notes.',
      ],
      stats: [
        {
          value: '71%',
          label: 'Multi-address buyers',
          detail: 'Out of 14 respondents, most sent parcels to more than one address in a single order',
        },
        {
          value: '43%',
          label: 'Manual copy fatigue',
          detail: 'Found retyping and copying multiple addresses tiring or prone to mistakes',
        },
        {
          value: '100%',
          label: 'Greeting card anxiety',
          detail: 'Worried about personal greeting cards getting mixed up between recipients',
        },
      ],
      media: [media.empathizeBoard],
      mediaLayout: 'full',
    },
    {
      id: 'define',
      number: '03',
      eyebrow: '03 — Define',
      heading: 'The real problem wasn’t just taking orders',
      paragraphs: [
        'Early on, this looked like a checkout problem. Once we mapped the seller’s daily routine, the real breakdown happened after an order was confirmed: keeping all of its details tied together.',
        'A seller might confirm an order in chat, copy it into a spreadsheet, track kitchen prep on paper, and send courier addresses from another app. As peak Ramadan orders stacked up, small details slipped through the cracks.',
      ],
      calloutQuote:
        '“Sellers need a structured way to manage complex, multi-recipient orders from pre-order to delivery.”',
      media: [media.defineBoard],
      mediaLayout: 'full',
    },
    {
      id: 'ideate',
      number: '04',
      eyebrow: '04 — Ideate',
      heading: 'Turning a complex process into one connected system',
      paragraphs: [
        'We connected every step—from incoming pre-orders to batch packing—into one workflow, cutting down manual data entry while keeping the flexibility sellers need during peak season.',
        'We kept the scope focused on five core capabilities that mirror how hampers sellers already work, just organized in one place.',
      ],
      capabilities: [
        {
          title: 'Multiple Address Delivery',
          description:
            'Assign several recipients, addresses, and parcel items inside a single order.',
        },
        {
          title: 'End-to-End PO Tracking',
          description:
            'Track every order from confirmation through preparation and courier pickup.',
        },
        {
          title: 'Greeting Card Management',
          description:
            'Pair each recipient with their own custom greeting message to prevent mix-ups.',
        },
        {
          title: 'Production Scheduling',
          description:
            'Group preparation and packing tasks cleanly by pre-order batch.',
        },
        {
          title: 'Parcel Content Recap',
          description:
            'Auto-calculate total items and supplies needed before a batch goes into production.',
        },
      ],
      media: [media.ideateBoard],
      mediaLayout: 'full',
    },
    {
      id: 'prototype',
      number: '05',
      eyebrow: '05 — Prototype',
      heading: 'From scattered tasks to one flow',
      paragraphs: [
        'We turned that flow into a mobile app shaped around a seller’s daily routine: accepting orders, assigning multiple addresses, planning batches, and keeping every parcel linked to the right recipient.',
        'Each order moves through clear status stages, so sellers can check what needs packing next without digging back through old chat threads.',
      ],
      media: [media.prototypeCanvas],
      mediaLayout: 'full',
    },
    {
      id: 'test',
      number: '06',
      eyebrow: '06 — Test',
      heading: 'Letting users challenge the design',
      paragraphs: [
        'We tested the interactive prototype with Maze and a System Usability Scale (SUS) survey across 5 participants. Testers liked the clean layout, clear order status labels, and Pre-Order controls, giving the prototype a 70/100 SUS score.',
        'The sessions also exposed clear friction: accepting an order took too many steps for first-time users. Those task timings gave us a concrete list of screens to trim in the next iteration.',
      ],
      stats: [
        {
          value: '70/100',
          label: 'SUS Usability Score',
          detail: 'Across 5 responses, highlighting clear hierarchy and Pre-Order coverage',
        },
        {
          value: '100%',
          label: 'Tambah Produk Success',
          detail: 'Completed in 42.8s on average with 0% drop-off',
        },
        {
          value: '83.3%',
          label: 'Terima Pesanan Success',
          detail: '117.4s average duration — main area to shorten steps next',
        },
      ],
      media: [media.mazeTambahProduk, media.mazeTerimaPesanan],
      mediaLayout: 'duo',
    },
    {
      id: 'outcome',
      number: '07',
      eyebrow: '07 — Outcome',
      heading: 'From manual tracking to a connected seller experience',
      paragraphs: [
        'Parcelin pulled the seasonal hampers workflow into one mobile app, connecting multi-recipient orders, greeting cards, and batch production in a single view.',
        'Next, we plan to shorten the order acceptance flow using the Maze findings, finish the MVP build, and get ready for launch.',
      ],
      media: [media.outcomeRoadmap],
      mediaLayout: 'full',
    },
    {
      id: 'reflection',
      number: '08',
      eyebrow: '08 — Reflection',
      heading: 'Designing for complexity doesn’t mean adding complexity',
      paragraphs: [
        'Working on Parcelin changed how I think about feature-heavy apps. Picking which features to build is usually the easy part; the real work is making sure each screen hands off cleanly to the next.',
        'Testing also proved that having complete features means little if a key action feels slow on the first try. Cutting friction in those everyday moments matters far more than packing extra options onto the screen.',
      ],
    },
  ],
  gallery: {
    eyebrow: 'Visual Archive',
    heading: 'Complete Project Frames',
    images: [
      media.heroShowcase,
      media.empathizeBoard,
      media.defineBoard,
      media.ideateBoard,
      media.prototypeCanvas,
      media.mazeTambahProduk,
      media.mazeTerimaPesanan,
      media.outcomeRoadmap,
    ],
    slices: [
      { type: 'full', image: media.heroShowcase },
      {
        type: 'trioAsymmetric',
        items: [media.empathizeBoard, media.defineBoard, media.ideateBoard],
      },
      {
        type: 'duoStaggered',
        left: media.mazeTambahProduk,
        right: media.prototypeCanvas,
      },
      { type: 'full', image: media.outcomeRoadmap },
    ],
  },
  nextProject: {
    eyebrow: 'Next work',
    titleLines: ['KPI CodeLabs', '2026'],
    href: '/work',
    thumbnail: {
      id: 'next-kpi-codelabs',
      src: nextProjectThumb,
      alt: 'KPI CodeLabs 2026 dashboard preview',
    },
  },
}
