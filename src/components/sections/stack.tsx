import { useTranslation } from 'react-i18next'

import { Section } from '@/components/layout/section'
import { Badge, type BadgeTone } from '@/components/terminal/badge'
import type { Translation } from '@/i18n/types'

const TONES: BadgeTone[] = ['mint', 'sky', 'violet', 'amber', 'rose', 'muted']

export function Stack() {
  const { t } = useTranslation()
  const groups = t('stack.groups', {
    returnObjects: true,
  }) as Translation['stack']['groups']

  return (
    <Section id="stack" command={t('stack.command')}>
      <dl className="border-border bg-card divide-border divide-y rounded-md border">
        {groups.map((group, index) => (
          <div
            key={group.id}
            className="flex flex-col gap-2 p-3.5 sm:flex-row sm:items-baseline sm:gap-4"
          >
            <dt className="text-muted-foreground shrink-0 text-[11px] sm:w-20">
              <code className="text-prompt">{group.label}</code>
            </dt>
            <dd className="flex min-w-0 flex-wrap gap-1.5">
              {group.items.map((item) => (
                <Badge key={item} tone={TONES[index % TONES.length]}>
                  {item}
                </Badge>
              ))}
            </dd>
          </div>
        ))}
      </dl>

      <p className="border-violet/40 bg-violet/5 text-muted-foreground mt-3 flex flex-col gap-1.5 rounded-md border-l-2 py-2.5 pr-3 pl-3.5 text-[11px] leading-relaxed sm:flex-row sm:items-baseline sm:gap-3">
        <code className="text-violet shrink-0 font-semibold">
          {t('stack.aiLayerLabel')}
        </code>
        <span className="min-w-0">{t('stack.aiLayer')}</span>
      </p>
    </Section>
  )
}
