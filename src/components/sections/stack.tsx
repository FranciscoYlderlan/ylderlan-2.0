import { useTranslation } from 'react-i18next'

import { Section } from '@/components/layout/section'
import { Badge, type BadgeTone } from '@/components/terminal/badge'
import { Marquee } from '@/components/terminal/marquee'
import type { StackGroup, Translation } from '@/i18n/types'

/** Each group keeps its own accent, so the rows stay readable as groupings. */
const GROUP_TONES: Record<string, BadgeTone> = {
  core: 'mint',
  frontend: 'sky',
  backend: 'violet',
  data: 'amber',
  platform: 'rose',
  quality: 'muted',
}

type StackEntry = { id: string; item: string; tone: BadgeTone }

function toEntries(groups: StackGroup[]): StackEntry[] {
  return groups.flatMap((group) =>
    group.items.map((item) => ({
      id: `${group.id}-${item}`,
      item,
      tone: GROUP_TONES[group.id] ?? 'muted',
    })),
  )
}

export function Stack() {
  const { t } = useTranslation()
  const groups = t('stack.groups', {
    returnObjects: true,
  }) as Translation['stack']['groups']

  const half = Math.ceil(groups.length / 2)
  const rows = [toEntries(groups.slice(0, half)), toEntries(groups.slice(half))]

  return (
    <Section id="stack" command={t('stack.command')}>
      <div className="flex flex-col gap-2">
        {rows.map((row, index) => (
          <Marquee
            key={index}
            reverse={index % 2 === 1}
            durationSeconds={row.length * 2.6}
          >
            {row.map((entry) => (
              <Badge key={entry.id} tone={entry.tone} className="shrink-0">
                {entry.item}
              </Badge>
            ))}
          </Marquee>
        ))}
      </div>

      {/* The same content, static: what screen readers announce, and what
          anyone with reduced motion turned on actually sees. */}
      <div className="marquee-fallback flex-col gap-2">
        {groups.map((group) => (
          <div key={group.id} className="flex flex-wrap items-baseline gap-1.5">
            <code className="text-prompt mr-1 text-[11px]">{group.label}</code>
            {group.items.map((item) => (
              <Badge key={item} tone={GROUP_TONES[group.id] ?? 'muted'}>
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

      <p className="border-violet/40 bg-violet/5 text-muted-foreground mt-3 flex flex-col gap-1.5 rounded-md border-l-2 py-2.5 pr-3 pl-3.5 text-[11px] leading-relaxed sm:flex-row sm:items-baseline sm:gap-3">
        <code className="text-violet shrink-0 font-semibold">
          {t('stack.aiLayerLabel')}
        </code>
        <span className="min-w-0">{t('stack.aiLayer')}</span>
      </p>
    </Section>
  )
}
