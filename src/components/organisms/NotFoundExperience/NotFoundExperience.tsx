import {
  Component,
  lazy,
  Suspense,
  type ErrorInfo,
  type FocusEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from 'react'

import { Button } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import { Icon } from '@/components/atoms/Icon'
import { RollingText } from '@/components/atoms/RollingText'
import { getAppHref, navigateTo } from '@/lib/navigation'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useRollingText } from '@/hooks/useRollingText'

const FallingText = lazy(
  () => import('@/components/vendor/reactbits/FallingText'),
)

export interface NotFoundExperienceProps {
  pageName: string
}

interface FallingTextBoundaryProps {
  children: ReactNode
  fallback: ReactNode
}

interface FallingTextBoundaryState {
  hasError: boolean
}

class FallingTextBoundary extends Component<
  FallingTextBoundaryProps,
  FallingTextBoundaryState
> {
  state: FallingTextBoundaryState = { hasError: false }

  static getDerivedStateFromError(): FallingTextBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    // The static fallback keeps the route usable if the animation cannot initialize.
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}

export function NotFoundExperience({
  pageName,
}: NotFoundExperienceProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const homeRoll = useRollingText()
  const fallback = (
    <div className="flex h-full w-full items-center justify-center text-[length:var(--text-not-found)] font-medium leading-none tracking-[-0.08em] text-title-100">
      404
    </div>
  )

  const handleHomePointerEnter = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'touch') {
      homeRoll.play()
    }
  }

  const handleHomeFocus = (event: FocusEvent<HTMLElement>) => {
    if (event.currentTarget.matches(':focus-visible')) {
      homeRoll.play()
    }
  }

  const handleHomeClick = (event: MouseEvent<HTMLElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }

    event.preventDefault()
    navigateTo('/')
  }

  return (
    <section
      aria-labelledby="under-development-title"
      className="content-container flex min-h-[calc(100dvh-var(--header-height)-var(--main-padding-top))] flex-col items-center justify-center py-16 text-center md:py-20 lg:min-h-[calc(100dvh-var(--header-height)-var(--main-padding-top-lg))] lg:pb-32 lg:pt-16"
    >
      <p className="text-body-m-semibold uppercase tracking-[0.08em] text-body-60">
        {pageName}
      </p>
      <div className="mt-3 h-[var(--not-found-stage-mobile)] w-full max-w-5xl md:mt-4 md:h-[var(--not-found-stage)]">
        {prefersReducedMotion ? (
          fallback
        ) : (
          <Suspense fallback={fallback}>
            <FallingTextBoundary fallback={fallback}>
              <FallingText
                text="404"
                split="letters"
                trigger="auto"
                gravity={1}
                bounciness={0.18}
                scatter={0.55}
                stagger={0.04}
                order="center"
                draggable
                mouseConstraintStiffness={0.2}
                cursorPush={0.45}
                fontSize="var(--text-not-found)"
                theme="light"
                backgroundColor="transparent"
                className="text-title-100"
              />
            </FallingTextBoundary>
          </Suspense>
        )}
      </div>
      <Heading
        as="h1"
        className="mt-1 max-w-3xl text-[length:var(--text-section-heading-mobile)] font-medium leading-[var(--leading-section-heading)] tracking-tight text-title-100 md:mt-2 md:text-[length:var(--text-section-heading-tablet)] lg:text-[length:var(--text-h2)]"
        id="under-development-title"
      >
        404? This page is in its character development era.
      </Heading>
      <p className="mt-5 max-w-2xl text-body-l-regular text-body-70 md:mt-6 md:text-body-xl-regular">
        We&apos;re still cooking this one. The pixels aren&apos;t ready for
        their big debut just yet.
      </p>
      <p className="mt-2 text-body-l-regular text-body-60">
        Come back later. It&apos;ll be worth the wait.
      </p>
      <Button
        className="hero-action hero-mobile-action hover:bg-primary-main focus-visible:bg-primary-main mt-8"
        href={getAppHref('/')}
        onClick={handleHomeClick}
        onFocus={handleHomeFocus}
        onPointerEnter={handleHomePointerEnter}
        rightIcon={<Icon className="size-4" name="arrow-right" />}
        variant="solid"
      >
        <RollingText
          isPlaying={homeRoll.isPlaying}
          onAnimationComplete={homeRoll.complete}
        >
          Back to Home
        </RollingText>
      </Button>
    </section>
  )
}
