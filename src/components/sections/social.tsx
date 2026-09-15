import { ArrowUpRight, BriefcaseBusiness, GitBranch, Mail } from 'lucide-react'
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
}

const links: SocialLink[] = [
  {
    id: 'github',
    href: siteConfig.links.github,
    icon: GitBranch,
    labelKey: 'social.github',
    handleKey: 'social.githubHandle',
  },
  {
    id: 'linkedin',
    href: siteConfig.links.linkedin,
    icon: BriefcaseBusiness,
    labelKey: 'social.linkedin',
    handleKey: 'social.linkedinHandle',
  },
  {
    id: 'email',
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
    labelKey: 'social.email',
    handleKey: 'social.emailHandle',
  },
]

export function Social() {
  const { t } = useTranslation()

  return (
    <Section id="social" title={t('social.title')}>
      <ul className="grid gap-2 sm:grid-cols-3">
        {links.map(({ id, href, icon: Icon, labelKey, handleKey }) => {
          const external = !href.startsWith('mailto:')

          return (
            <li key={id}>
              <a
                href={href}
                {...(external
                  ? { target: '_blank', rel: 'noreferrer noopener' }
                  : {})}
                className="border-border bg-card hover:border-primary/40 group flex h-full items-center gap-3 rounded-lg border p-4 transition-colors sm:flex-col sm:items-start sm:gap-2"
              >
                <Icon
                  className="text-muted-foreground group-hover:text-highlight size-5 shrink-0 transition-colors"
                  aria-hidden="true"
                />
                <span className="flex min-w-0 flex-col">
                  <span className="text-foreground flex items-center gap-1 text-sm font-medium">
                    {t(labelKey)}
                    <ArrowUpRight
                      className="text-muted-foreground group-hover:text-highlight size-3.5 transition-colors"
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
