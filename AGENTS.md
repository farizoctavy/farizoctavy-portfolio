# Portfolio foundation guidelines

## Stack

- Vite + React + TypeScript.
- Tailwind CSS v4 through `@tailwindcss/vite`.
- Inter Tight is loaded from `@fontsource-variable/inter-tight`.
- The `@/*` path alias resolves to `src/*`.
- React Bits is not installed until a requested section needs one of its components. Install React Bits components with the official CLI and keep installed source in `src/components/vendor/reactbits/` unchanged.

## Folder and dependency rules

```text
src/
  assets/            images, SVG icons, fonts
  components/
    atoms/           Button, Badge, Heading, Text, Link, Icon, Divider, Tag, Logo
    molecules/       NavLink, LanguageSwitcher, SectionHeader, ProjectRow, ExperienceItem, RecognitionItem
    organisms/       Header, Hero, HeroShowcase, SelectedWork, ProfileExperience, Background, ContactFooter
    templates/       MainLayout
    vendor/reactbits/ raw React Bits components
    vendor/motion-primitives/ raw Motion Primitives components
  pages/             route-level page compositions
  data/              static content and future locale-ready content
  hooks/
  lib/
  styles/            tokens.css and globals.css
```

Components live in their own folder with a component file and `index.ts` barrel. Props use TypeScript interfaces. Keep dependency direction one-way: atoms -> molecules -> organisms -> templates -> pages. Lower-level components must not import higher-level components.

Atoms have no business logic or hardcoded product content. Organisms receive content through props; page data belongs in `src/data`. Keep content shaped for `en` and `id` without adding full i18n until requested.

## Design tokens

Use the token names in `src/styles/tokens.css` via Tailwind utilities or the existing typography utilities. Do not put raw colors, spacing, shadows, radii, or magic layout values in components. The spacing base is 4px, the grid is 12 columns with a 24px gutter, and the assumed content max width is 1280px. The mobile-first container uses 20px horizontal padding at the base breakpoint, 32px from `md` (768px), and 24px from `lg` (1024px) while the max width is respected.

Typography utilities include:

- `text-body-{xs|s|m|l|xl}-{regular|semibold}`
- `text-h{1..12}-{bold|extrabold}`
- `type-display` for independently tighter line-height and tracking.

The Figma weight labels map to real weights as follows: Regular 400, Semibold 600, Bold 500 (Inter Tight Medium), and Extrabold 700 (Inter Tight Bold). The secondary rounded stack is reserved for the large personal wordmark/display name; SF Pro Rounded is not committed because it is not freely redistributable.

The confirmed focus ring is the primary main color. Cards may use the explicit 8px, 12px, or 16px radius scale; buttons and badges use full-pill. Respect `prefers-reduced-motion` for every animation.

## Accessibility and implementation

Use semantic HTML, visible `:focus-visible` states, keyboard-accessible controls, and `aria-label` for icon-only buttons. Keep the layout mobile-first at 375px, 768px, 1024px, and 1280px+. Interactive elements must have at least a 44px touch target. Use Tailwind min-width variants (`md`, `lg`, `xl`) rather than `max-*` variants. Hover styles must use `hover:` and have a visible pressed or focus state that also works on touch. Never introduce horizontal page scrolling from 320px upward.

## Known token inconsistency

The provided success surface value is `#F7F7F7`, which is unusually neutral for a success surface. It is intentionally preserved as supplied and should not be “fixed” without design approval.
