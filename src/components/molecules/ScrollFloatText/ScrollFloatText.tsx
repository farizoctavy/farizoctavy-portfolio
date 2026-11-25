import { lazy, Suspense, type ReactNode } from 'react'

const ScrollFloat = lazy(() => import('@/components/vendor/reactbits/ScrollFloat'))

export interface ScrollFloatTextProps {
  children: ReactNode
  containerClassName?: string
  textClassName?: string
}

export function ScrollFloatText({
  children,
  containerClassName = 'm-0',
  textClassName = 'm-0',
}: ScrollFloatTextProps) {
  return (
    <Suspense
      fallback={
        <span className={containerClassName}>
          <span className={textClassName}>{children}</span>
        </span>
      }
    >
      <ScrollFloat
        animationDuration={1.1}
        containerClassName={containerClassName}
        direction="up"
        distance={80}
        effect="float"
        ease="power3.out"
        order="start"
        scrollEnd="bottom bottom-=30%"
        scrollStart="center bottom+=30%"
        splitBy="chars"
        stagger={0.04}
        stretch={1.4}
        textClassName={textClassName}
      >
        {children}
      </ScrollFloat>
    </Suspense>
  )
}
