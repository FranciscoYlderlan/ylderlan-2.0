import { ArrowUpRight, GitBranch, Mail, UserRound } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Section } from '@/components/layout/section'
import { siteConfig } from '@/config/site'

type SocialLink = {
  id: string
  href: string
  icon: LucideIcon
  labelKey: string
  handleKey: string
  tone: string
}

const links: SocialLink[] = [
  {
    id: 'github',
    href: siteConfig.links.github,
    icon: GitBranch,
    labelKey: 'social.github',
    handleKey: 'social.githubHandle',
    tone: 'group-hover:text-mint',
  },
  {
    id: 'linkedin',
    href: siteConfig.links.linkedin,
    icon: UserRound,
    labelKey: 'social.linkedin',
    handleKey: 'social.linkedinHandle',
    tone: 'group-hover:text-sky',
  },
  {
    id: 'email',
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
    labelKey: 'social.email',
    handleKey: 'social.emailHandle',
    tone: 'group-hover:text-violet',
  },
]

export function Social() {
  const { t } = useTranslation()

  return (
    <Section id="social" command={t('social.command')}>
      <ul className="grid gap-2 sm:grid-cols-3">
        {links.map(({ id, href, icon: Icon, labelKey, handleKey, tone }) => {
          const external = !href.startsWith('mailto:')

          return (
            <li key={id}>
              <a
                href={href}
                {...(external
                  ? { target: '_blank', rel: 'noreferrer noopener' }
                  : {})}
                className="border-border bg-card hover:border-mint/60 group flex h-full min-w-0 items-center gap-3 rounded-md p-3.5 transition-colors sm:flex-col sm:items-start sm:gap-2"
              >
                <Icon
                  className={`text-muted-foreground size-4 shrink-0 transition-colors ${tone}`}
                  aria-hidden="true"
                />
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="text-foreground flex items-center gap-1 text-xs font-semibold">
                    {t(labelKey)}
                    <ArrowUpRight
                      className={`text-muted-foreground size-3 transition-colors ${tone}`}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="text-muted-foreground truncate text-[11px]">
                    {t(handleKey)}
                  </span>
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
