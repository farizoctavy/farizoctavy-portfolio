import { About } from '@/pages/About'
import { Home } from '@/pages/Home'
import { MyInterest } from '@/pages/MyInterest'
import { Work } from '@/pages/Work'
import { SplashScreen } from '@/components/organisms/SplashScreen'
import { SPLASH_COMPLETE_EVENT } from '@/hooks/useSplashComplete'
import { useCurrentPath } from '@/hooks/useCurrentPath'
import { useSplashTrigger } from '@/hooks/useSplashTrigger'
import { useEffect, useLayoutEffect } from 'react'

export function App() {
  const pathname = useCurrentPath()
  const isHome = pathname === '/'
  const { complete, shouldPlay } = useSplashTrigger(isHome)
  const Page =
    pathname === '/work'
      ? Work
      : pathname === '/about'
        ? About
      : pathname === '/my-interest'
          ? MyInterest
          : Home

  useLayoutEffect(() => {
    window.scrollTo({ left: 0, top: 0, behavior: 'auto' })
  }, [pathname])

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
      <Page />
    </>
  )
}
