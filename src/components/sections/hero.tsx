import { useTranslation } from 'react-i18next'

import { Badge } from '@/components/terminal/badge'
import { Prompt } from '@/components/terminal/prompt'
import { TerminalWindow } from '@/components/terminal/window'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { featuredCompanies } from '@/config/site'
import type { Translation } from '@/i18n/types'

export function Hero() {
  const { t } = useTranslation()
  const profile = t('hero.profile', {
    returnObjects: true,
  }) as Translation['hero']['profile']

  const keyWidth = Math.max(...profile.map((field) => field.key.length))

  return (
    <section id="top" className="pt-8 pb-2 sm:pt-12">
      <div className="flex items-center gap-4 sm:gap-5">
        <Avatar className="ring-border size-14 shrink-0 rounded-md ring-1 sm:size-[4.5rem]">
          <AvatarImage
            src="/avatar-320.webp"
            srcSet="/avatar-160.webp 160w, /avatar-320.webp 320w"
            sizes="72px"
            width={320}
            height={320}
            alt={t('a11y.avatarAlt')}
            loading="eager"
            decoding="async"
            className="rounded-md"
          />
          <AvatarFallback className="rounded-md">YL</AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <Prompt as="h1" command={t('hero.greeting')} className="text-sm" />
          <p className="text-foreground mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            {t('hero.name')}
            <span className="text-prompt caret ml-1 font-normal" aria-hidden="true">
              _
            </span>
          </p>
          <p className="text-muted-foreground mt-0.5 text-xs sm:text-sm">
            {t('hero.role')}
          </p>
        </div>
      </div>

      <ul className="mt-6 flex flex-wrap gap-2">
        <li>
          <Badge label={t('hero.badgeLocation')} tone="sky">
            {t('hero.badgeLocationValue')}
          </Badge>
        </li>
        <li>
          <Badge label={t('hero.badgeFocus')} tone="violet">
            {t('hero.badgeFocusValue')}
          </Badge>
        </li>
        <li>
          <Badge label={t('hero.badgeStatus')} tone="mint">
            {t('hero.badgeStatusValue')}
          </Badge>
        </li>
      </ul>

      <TerminalWindow
        title={t('hero.profileFile')}
        className="mt-6"
        bodyClassName="overflow-x-auto"
      >
        <pre className="text-[11px] leading-6 sm:text-xs">
          <code>
            <span className="text-muted-foreground">{'{'}</span>
            {'\n'}
            {profile.map((field) => (
              <span key={field.key}>
                {'  '}
                <span className="text-sky">&quot;{field.key}&quot;</span>
                <span className="text-muted-foreground">: </span>
                {' '.repeat(Math.max(0, keyWidth - field.key.length))}
                {field.type === 'number' ? (
                  <span className="text-violet">{field.value}</span>
                ) : (
                  <span className="text-mint">&quot;{field.value}&quot;</span>
                )}
                <span className="text-muted-foreground">,</span>
                {'\n'}
              </span>
            ))}
            <span className="text-muted-foreground">{'}'}</span>
          </code>
        </pre>
      </TerminalWindow>

      <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
        {t('hero.companiesIntro')}{' '}
        {featuredCompanies.map((company, index) => (
          <span key={company.id}>
            <span className={`${company.className} font-medium`}>
              {company.name}
            </span>
            {index < featuredCompanies.length - 2
              ? t('hero.listSeparator')
              : null}
            {index === featuredCompanies.length - 2
              ? t('hero.listLastSeparator')
              : null}
          </span>
        ))}
        {t('hero.companiesOutro')}
      </p>
    </section>
  )
}
