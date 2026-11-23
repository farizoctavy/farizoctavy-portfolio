import { useEffect, useState } from 'react'

import type { NavItem } from '@/data/nav'

export function useActiveSection(items: NavItem[]) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      return
    }

    const targets = items
      .filter((item) => item.href.startsWith('#'))
      .map((item) => ({ id: item.id, element: document.querySelector(item.href) }))
      .filter(
        (target): target is { id: string; element: Element } =>
          target.element !== null,
      )

    if (targets.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0]

        if (visibleEntry) {
          const match = targets.find((target) => target.element === visibleEntry.target)
          setActiveId(match?.id ?? null)
        }
      },
      { threshold: [0.2, 0.5, 0.8] },
    )

    targets.forEach((target) => observer.observe(target.element))

    return () => observer.disconnect()
  }, [items])

  return activeId
}
