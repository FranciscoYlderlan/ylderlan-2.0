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
    <Section id="about" title={t('about.title')}>
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-8">
        <div className="text-muted-foreground flex flex-1 flex-col gap-4 text-sm leading-relaxed sm:text-[15px]">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>
              <RichText>{paragraph}</RichText>
            </p>
          ))}
        </div>

        <figure className="mx-auto w-full max-w-[200px] shrink-0 sm:mx-0 sm:w-40 sm:max-w-none">
          <picture>
            <source
              type="image/webp"
              srcSet="/ylderlan-offline-480.webp 480w, /ylderlan-offline-960.webp 960w"
              sizes="(min-width: 640px) 160px, 200px"
            />
            <img
              src="/ylderlan-offline-480.jpg"
              srcSet="/ylderlan-offline-480.jpg 480w, /ylderlan-offline-960.jpg 960w"
              sizes="(min-width: 640px) 160px, 200px"
              width={900}
              height={1600}
              alt={t('a11y.casualPhotoAlt')}
              loading="lazy"
              decoding="async"
              className="border-border aspect-[9/13] w-full rounded-xl border object-cover"
            />
          </picture>
        </figure>
      </div>
    </Section>
  )
}
