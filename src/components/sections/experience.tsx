import { useTranslation } from 'react-i18next'

import { Section } from '@/components/layout/section'
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/components/ui/tabs'
import type { ExperienceItem, Translation } from '@/i18n/types'

export function Experience() {
  const { t } = useTranslation()
  const items = t('experience.items', {
    returnObjects: true,
  }) as Translation['experience']['items']

  if (items.length === 0) return null

  return (
    <Section id="experience" title={t('experience.title')}>
      <Tabs
        defaultValue={items[0].id}
        orientation="vertical"
        className="gap-6 sm:flex-row sm:gap-8"
      >
        <TabsList
          className="-mx-5 flex-row gap-1 overflow-x-auto px-5 pb-1 sm:mx-0 sm:w-48 sm:shrink-0 sm:flex-col sm:overflow-visible sm:px-0"
          loopFocus
        >
          {items.map((item) => (
            <TabsTab
              key={item.id}
              value={item.id}
              className="shrink-0 sm:w-full sm:rounded-l-none sm:border-l-2 sm:border-transparent sm:text-[13px] sm:whitespace-normal sm:data-active:border-l-highlight"
            >
              {item.company}
            </TabsTab>
          ))}
        </TabsList>

        <div className="min-w-0 flex-1">
          {items.map((item) => (
            <TabsPanel key={item.id} value={item.id}>
              <ExperienceDetail item={item} />
            </TabsPanel>
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
        <h3 className="text-foreground text-sm font-semibold sm:text-base">
          {item.role}{' '}
          <span className="text-muted-foreground font-normal">
            {t('experience.at')}
          </span>{' '}
          <span className="text-highlight">{item.company}</span>
        </h3>
        <p className="text-muted-foreground text-xs">
          {item.period} · {item.location}
        </p>
      </header>

      <ul className="flex flex-col gap-3">
        {item.bullets.map((bullet, index) => (
          <li
            key={index}
            className="text-muted-foreground flex gap-2.5 text-sm leading-relaxed"
          >
            <span className="text-highlight mt-[0.35em] text-[10px]" aria-hidden="true">
              &#9656;
            </span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <ul className="flex flex-wrap gap-1.5">
        {item.stack.map((technology) => (
          <li
            key={technology}
            className="border-border bg-muted/60 text-muted-foreground rounded-full border px-2.5 py-1 text-[11px]"
          >
            {technology}
          </li>
        ))}
      </ul>

      {item.note ? (
        <p className="text-muted-foreground text-xs italic">{item.note}</p>
      ) : null}
    </article>
  )
}
