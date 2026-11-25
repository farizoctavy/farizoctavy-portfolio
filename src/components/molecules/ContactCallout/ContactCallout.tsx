import type { FocusEvent, PointerEvent } from 'react'

import { Button } from '@/components/atoms/Button'
import { Divider } from '@/components/atoms/Divider'
import { Icon } from '@/components/atoms/Icon'
import { RollingText } from '@/components/atoms/RollingText'
import { Text } from '@/components/atoms/Text'
import { ScrollFloatText } from '@/components/molecules/ScrollFloatText'
import { FooterLink } from '@/components/molecules/FooterLink'
import type { FooterContent } from '@/data/footer'
import { useRollingText } from '@/hooks/useRollingText'

export interface ContactCalloutProps {
  content: FooterContent
}

export function ContactCallout({ content }: ContactCalloutProps) {
  const roll = useRollingText()

  const handlePointerEnter = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'touch') {
      roll.play()
    }
  }

  const handleFocus = (event: FocusEvent<HTMLElement>) => {
    if (event.currentTarget.matches(':focus-visible')) {
      roll.play()
    }
  }

  return (
    <div>
      <Text className="text-body-l-regular text-border-10 md:text-body-xl-regular">
        {content.eyebrow}
      </Text>
      <ScrollFloatText
        containerClassName="m-0 mt-6 w-full lg:whitespace-nowrap"
        textClassName="footer-heading m-0 w-full text-left text-border-10"
      >
        <span>{content.headline.primary}</span>
        <span className="text-body-60">{content.headline.muted}</span>
      </ScrollFloatText>
      <div className="mt-8 flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-8">
        <Button
          className="shrink-0 px-4 md:px-6"
          href={content.contact.href}
          onFocus={handleFocus}
          onPointerEnter={handlePointerEnter}
          rightIcon={<Icon className="size-4" name="arrow-right" />}
          variant="inverse"
        >
          <RollingText isPlaying={roll.isPlaying} onAnimationComplete={roll.complete}>
            {content.contact.label}
          </RollingText>
        </Button>
        <FooterLink
          className="min-w-0 text-body-l-regular md:text-body-l-regular"
          href={content.contact.href}
          label={content.email}
          underline
        />
        <Divider className="block w-full md:w-auto md:flex-1" orientation="horizontal" />
      </div>
    </div>
  )
}
