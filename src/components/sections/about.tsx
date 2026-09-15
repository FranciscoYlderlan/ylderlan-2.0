import { useTranslation } from 'react-i18next'

import { Section } from '@/components/layout/section'
import { RichText } from '@/components/rich-text'
import type { Translation } from '@/i18n/types'

export function About() {
  const { t } = useTranslation()
  const paragraphs = t('about.paragraphs', {
    returnObjects: true,
  }) as Translation['about']['paragraphs']

  return (
    <Section id="about" command={t('about.command')}>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-7">
        <div className="text-muted-foreground flex min-w-0 flex-1 flex-col gap-4 text-sm leading-relaxed">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>
              <RichText>{paragraph}</RichText>
            </p>
          ))}
        </div>

        {/* Flexible portrait: never wider than its column, never taller than
            it needs to be, and it shrinks with the viewport instead of
            dominating the section on small screens. */}
        <figure className="mx-auto w-[min(100%,13rem)] shrink-0 sm:mx-0 sm:w-[clamp(8rem,24vw,12rem)]">
          <picture>
            <source
              type="image/webp"
              srcSet="/ylderlan-offline-480.webp 480w, /ylderlan-offline-960.webp 960w"
              sizes="(min-width: 640px) 12rem, 13rem"
            />
            <img
              src="/ylderlan-offline-480.jpg"
              srcSet="/ylderlan-offline-480.jpg 480w, /ylderlan-offline-960.jpg 960w"
              sizes="(min-width: 640px) 12rem, 13rem"
              width={900}
              height={1600}
              alt={t('a11y.casualPhotoAlt')}
              loading="lazy"
              decoding="async"
              className="border-border aspect-[4/5] w-full rounded-md border object-cover"
            />
          </picture>
        </figure>
      </div>
    </Section>
  )
}
