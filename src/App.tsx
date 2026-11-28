import { About } from '@/pages/About'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { Home } from '@/pages/Home'
import { MyInterest } from '@/pages/MyInterest'
import { ProjectDetail } from '@/pages/ProjectDetail'
import { Work } from '@/pages/Work'
import { SplashScreen } from '@/components/organisms/SplashScreen'
import { SPLASH_COMPLETE_EVENT } from '@/hooks/useSplashComplete'
import { useCurrentPath } from '@/hooks/useCurrentPath'
import { useSplashTrigger } from '@/hooks/useSplashTrigger'
import { registerLenis } from '@/lib/scroll'
import { useEffect, useLayoutEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export function App() {
  const pathname = useCurrentPath()
  const normalizedPath = pathname.replace(/\/+$/, '') || '/'
  const isHome = normalizedPath === '/'
  const workSlug = normalizedPath.startsWith('/work/')
    ? normalizedPath.slice('/work/'.length)
    : null
  const lenisRef = useRef<Lenis | null>(null)
  const { complete, shouldPlay } = useSplashTrigger(isHome)
  const Page =
    normalizedPath === '/work'
      ? Work
      : normalizedPath === '/about'
        ? About
        : normalizedPath === '/my-interest'
          ? MyInterest
          : Home

  useLayoutEffect(() => {
    window.history.scrollRestoration = 'manual'
    lenisRef.current?.scrollTo(0, { immediate: true, force: true })
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,
      stopInertiaOnNavigate: true,
    })

    lenisRef.current = lenis
    registerLenis(lenis)
    const removeScrollListener = lenis.on('scroll', () =>
      ScrollTrigger.update(),
    )
    const raf = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      removeScrollListener()
      registerLenis(null)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    if (shouldPlay) {
      document.documentElement.dataset.splashRun = 'true'
      delete document.documentElement.dataset.splashComplete
    } else {
      document.documentElement.dataset.splashComplete = 'true'
      if (!isHome) {
        delete document.documentElement.dataset.splashRun
      }
    }

    window.dispatchEvent(new Event(SPLASH_COMPLETE_EVENT))
  }, [isHome, shouldPlay])

  return (
    <>
      {isHome && shouldPlay && <SplashScreen onComplete={complete} />}
      {workSlug ? <ProjectDetail slug={workSlug} /> : <Page />}
    </>
  )
}
