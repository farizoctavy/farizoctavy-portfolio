import { useEffect, useState } from 'react'

import ShapeGrid from '@/components/vendor/reactbits/ShapeGrid'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface BackgroundPalette {
  hoverColor: string
  hoverFillColor: string
  lineColor: string
  opacity: number
}

const readToken = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim()

export function Background() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [isCoarsePointer, setIsCoarsePointer] = useState(false)
  const [palette, setPalette] = useState<BackgroundPalette | null>(null)

  useEffect(() => {
    const media = window.matchMedia('(pointer: coarse)')
    const updatePointer = () => setIsCoarsePointer(media.matches)

    updatePointer()
    media.addEventListener('change', updatePointer)

    setPalette({
      hoverColor: readToken('--color-disable-40') || '#E0E0E0',
      hoverFillColor: readToken('--color-disable-40') || '#E0E0E0',
      lineColor: readToken('--color-border-30') || '#EDEDED',
      opacity: Number(readToken('--background-grid-opacity')) || 1,
    })

    return () => media.removeEventListener('change', updatePointer)
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {palette && (
        <ShapeGrid
          backgroundColor="transparent"
          cellSize={isCoarsePointer ? 64 : 76}
          clickCascade={!isCoarsePointer && !prefersReducedMotion}
          direction="diagonal"
          dpr={isCoarsePointer ? 1 : undefined}
          fade={0.85}
          fillOpacity={isCoarsePointer ? 0.05 : 0.08}
          glow={isCoarsePointer ? 0.08 : 0.18}
          hoverColor={palette.hoverColor}
          hoverFillColor={palette.hoverFillColor}
          intro={!prefersReducedMotion}
          lineColor={palette.lineColor}
          lineWidth={0.75}
          opacity={palette.opacity}
          radius={isCoarsePointer ? 0.85 : 1.1}
          shape="square"
          speed={isCoarsePointer ? 0.12 : 0.2}
          tiltX={isCoarsePointer ? 0 : 4}
          tiltY={isCoarsePointer ? 0 : -4}
          trail={isCoarsePointer ? 0.45 : 0.75}
          twinkle={0}
        />
      )}
    </div>
  )
}
