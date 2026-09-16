import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

import { Section } from '@/components/layout/section'
import { Badge, type BadgeTone } from '@/components/terminal/badge'
import { Marquee } from '@/components/terminal/marquee'
import type { StackGroup, Translation } from '@/i18n/types'

/** One accent per group, cycling: eleven groups, six tones. */
const TONES: BadgeTone[] = ['mint', 'sky', 'violet', 'amber', 'rose', 'muted']

/**
 * How the eleven groups of the CV are spread over the three rails, balanced so
 * the tracks end up a similar length and scroll at a comparable rhythm.
 */
const ROWS: readonly (readonly string[])[] = [
  ['languages', 'frontend', 'backend'],
  ['frameworks', 'databases', 'testing'],
  ['devops', 'cloud', 'ai', 'docs', 'engineering'],
]

type Run = { id: string; label: string; tone: BadgeTone; items: string[] }

function toRuns(groups: StackGroup[], ids: readonly string[]): Run[] {
  return ids.flatMap((id) => {
    const index = groups.findIndex((group) => group.id === id)
    if (index === -1) return []

    const group = groups[index]
    return [
      {
        id: group.id,
        label: group.label,
        tone: TONES[index % TONES.length],
        items: group.items,
      },
    ]
  })
}

export function Stack() {
  const { t } = useTranslation()
  const groups = t('stack.groups', {
    returnObjects: true,
  }) as Translation['stack']['groups']

  return (
    <Section id="stack" command={t('stack.command')}>
      <div className="flex flex-col gap-2">
        {ROWS.map((ids, index) => {
          const runs = toRuns(groups, ids)
          const length = runs.reduce((total, run) => total + run.items.length, 0)

          return (
            <Marquee
              key={index}
              reverse={index % 2 === 1}
              durationSeconds={length * 2.4}
            >
              {runs.map((run) => (
                <Fragment key={run.id}>
                  {/* The label leads its run once, the way the CV lists it. */}
                  <code className="text-muted-foreground mr-0.5 ml-4 shrink-0 self-center text-[11px] first:ml-0">
                    {run.label}
                  </code>
                  {run.items.map((item) => (
                    <Badge key={item} tone={run.tone} className="shrink-0">
                      {item}
                    </Badge>
                  ))}
                </Fragment>
              ))}
            </Marquee>
          )
        })}
      </div>

      {/* The same grouping, static: what reduced motion shows and what screen
          readers announce. It mirrors the CV row for row. */}
      <div className="marquee-fallback flex-col gap-2">
        {groups.map((group, index) => (
          <div key={group.id} className="flex flex-wrap items-baseline gap-1.5">
            <code className="text-muted-foreground mr-1 text-[11px]">
              {group.label}
            </code>
            {group.items.map((item) => (
              <Badge key={item} tone={TONES[index % TONES.length]}>
                {item}
              </Badge>
            ))}
          </div>
        ))}
      </div>

      <ul className="sr-only">
        {groups.map((group) => (
          <li key={group.id}>
            {group.label}: {group.items.join(', ')}
          </li>
        ))}
      </ul>
    </Section>
  )
}
