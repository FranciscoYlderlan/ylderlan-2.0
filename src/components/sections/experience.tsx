import { useTranslation } from 'react-i18next'

import { Section } from '@/components/layout/section'
import { RichText } from '@/components/rich-text'
import { Badge } from '@/components/terminal/badge'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import type { ExperienceItem, Translation } from '@/i18n/types'

export function Experience() {
  const { t } = useTranslation()
  const items = t('experience.items', {
    returnObjects: true,
  }) as Translation['experience']['items']

  if (items.length === 0) return null

  return (
    <Section id="experience" command={t('experience.command')}>
      <Tabs
        defaultValue={items[0].id}
        orientation="vertical"
        className="gap-5 sm:flex-row sm:gap-7"
      >
        {/* Mobile: a horizontal rail that scrolls. Desktop: a vertical rail. */}
        <div className="-mx-5 min-w-0 sm:mx-0 sm:w-44 sm:shrink-0">
          <TabsList
            loopFocus
            className="scrollbar-none snap-x snap-mandatory gap-1 overflow-x-auto px-5 pb-2 sm:flex-col sm:overflow-x-visible sm:px-0 sm:pb-0"
          >
            {items.map((item) => (
              <TabsTrigger
                key={item.id}
                value={item.id}
                className="shrink-0 snap-start border-b-2 border-transparent data-active:border-b-mint data-active:bg-muted sm:w-full sm:rounded-l-none sm:border-b-0 sm:border-l-2 sm:whitespace-normal sm:data-active:border-l-mint"
              >
                {item.company}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="min-w-0 flex-1">
          {items.map((item) => (
            <TabsContent key={item.id} value={item.id}>
              <ExperienceDetail item={item} />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </Section>
  )
}

function ExperienceDetail({ item }: { item: ExperienceItem }) {
  const { t } = useTranslation()

  return (
    <article className="flex flex-col gap-4">
      <header className="flex flex-col gap-1">
        <h3 className="text-foreground text-sm font-semibold">
          {item.role}{' '}
          <span className="text-muted-foreground font-normal">
            {t('experience.at')}
          </span>{' '}
          <span className="text-mint">{item.company}</span>
        </h3>
        <p className="text-muted-foreground text-[11px]">
          {item.period} · {item.location}
        </p>
      </header>

      <ul className="flex flex-col gap-3">
        {item.bullets.map((bullet, index) => (
          <li
            key={index}
            className="text-muted-foreground flex gap-2.5 text-xs leading-relaxed sm:text-[13px]"
          >
            <span
              className="text-prompt mt-[0.15em] shrink-0 select-none"
              aria-hidden="true"
            >
              ▸
            </span>
            <span className="min-w-0">
              <RichText>{bullet}</RichText>
            </span>
          </li>
        ))}
      </ul>

      <ul className="flex flex-wrap gap-1.5">
        {item.stack.map((technology) => (
          <li key={technology}>
            <Badge tone="muted">{technology}</Badge>
          </li>
        ))}
      </ul>

      {item.note ? (
        <p className="text-muted-foreground text-[11px] italic">{item.note}</p>
      ) : null}
    </article>
  )
}
