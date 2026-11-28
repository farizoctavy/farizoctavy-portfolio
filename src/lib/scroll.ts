import type Lenis from 'lenis'

let activeLenis: Lenis | null = null

export function registerLenis(instance: Lenis | null) {
  activeLenis = instance
}

export function scrollToTop(prefersReducedMotion = false) {
  if (activeLenis) {
    activeLenis.scrollTo(
      0,
      prefersReducedMotion
        ? { force: true, immediate: true }
        : {
            duration: 1.4,
            easing: (t) => 1 - (1 - t) ** 4,
            force: true,
          },
    )
    return
  }

  window.scrollTo({
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
    top: 0,
  })
}
