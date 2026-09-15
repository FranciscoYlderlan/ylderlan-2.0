import { ArrowUpRight, Info, RefreshCw, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Section } from '@/components/layout/section'
import { Badge } from '@/components/terminal/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import { siteConfig } from '@/config/site'
import { useGitHubRepositories } from '@/hooks/use-github-repositories'
import { cn } from '@/lib/utils'
import type { Repository } from '@/services/github'

const PROJECT_COUNT = 4

export function Projects() {
  const { t } = useTranslation()
  const { repositories, status, retry } = useGitHubRepositories(PROJECT_COUNT)

  return (
    <Section id="projects" command={t('projects.command')}>
      <div aria-live="polite" aria-busy={status === 'loading'}>
        {status === 'loading' ? <ProjectsSkeleton /> : null}

        {status === 'error' ? (
          <div className="border-border bg-card flex flex-col items-start gap-3 rounded-md border p-3.5">
            <p className="text-muted-foreground text-xs">
              {t('projects.error')}
            </p>
            <Button variant="outline" size="sm" onClick={retry}>
              <RefreshCw aria-hidden="true" />
              {t('projects.retry')}
            </Button>
          </div>
        ) : null}

        {status === 'success' && repositories.length === 0 ? (
          <p className="text-muted-foreground text-xs">{t('projects.empty')}</p>
        ) : null}

        {status === 'success' && repositories.length > 0 ? (
          <ul className="grid gap-2 sm:grid-cols-2">
            {repositories.map((repository) => (
              <ProjectCard key={repository.id} repository={repository} />
            ))}
          </ul>
        ) : null}
      </div>

      <div className="mt-4">
        <a
          href={siteConfig.links.githubRepositories}
          target="_blank"
          rel="noreferrer noopener"
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
          {t('projects.seeMore')}
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </Section>
  )
}

function ProjectCard({ repository }: { repository: Repository }) {
  const { t, i18n } = useTranslation()

  const pushedAt = new Intl.DateTimeFormat(i18n.resolvedLanguage, {
    month: 'short',
    year: 'numeric',
  }).format(new Date(repository.pushedAt))

  return (
    /* The card is one link; the details trigger sits beside it rather than
       inside it, so no interactive element is ever nested in another. */
    <li className="border-border bg-card hover:border-mint/60 group relative flex items-center gap-1 rounded-md border pr-1.5 transition-colors">
      <a
        href={repository.htmlUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="flex min-w-0 flex-1 flex-col gap-1.5 rounded-md p-3"
      >
        <span className="text-foreground group-hover:text-mint min-w-0 truncate text-xs font-semibold transition-colors">
          <span className="text-prompt/60 mr-1.5 select-none" aria-hidden="true">
            ▸
          </span>
          {repository.name}
        </span>

        <span className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px]">
          {repository.language ? (
            <span className="flex items-center gap-1.5">
              <span
                className="bg-mint size-1.5 rounded-full"
                aria-hidden="true"
              />
              {repository.language}
            </span>
          ) : null}
          {repository.stars > 0 ? (
            <span className="flex items-center gap-1">
              <Star className="size-2.5" aria-hidden="true" />
              {t('projects.stars', { count: repository.stars })}
            </span>
          ) : null}
          <span>{pushedAt}</span>
        </span>
      </a>

      <Popover>
        <PopoverTrigger
          aria-label={t('projects.detailsFor', { name: repository.name })}
          className="text-muted-foreground hover:text-mint hover:bg-muted data-popup-open:text-mint data-popup-open:bg-muted flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-sm transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Info className="size-3.5" aria-hidden="true" />
        </PopoverTrigger>
        <PopoverContent align="end">
          <PopoverTitle className="text-foreground text-xs font-semibold">
            {repository.name}
          </PopoverTitle>
          <PopoverDescription className="text-muted-foreground mt-2 text-[11px] leading-relaxed">
            {repository.description ?? t('projects.noDescription')}
          </PopoverDescription>

          {repository.topics.length > 0 ? (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {repository.topics.slice(0, 6).map((topic) => (
                <li key={topic}>
                  <Badge tone="muted">{topic}</Badge>
                </li>
              ))}
            </ul>
          ) : null}

          <dl className="text-muted-foreground mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px]">
            {repository.language ? (
              <div className="flex gap-1.5">
                <dt className="text-prompt">lang</dt>
                <dd>{repository.language}</dd>
              </div>
            ) : null}
            <div className="flex gap-1.5">
              <dt className="text-prompt">stars</dt>
              <dd>{repository.stars}</dd>
            </div>
            <div className="flex gap-1.5">
              <dt className="text-prompt">{t('projects.updated')}</dt>
              <dd>{pushedAt}</dd>
            </div>
          </dl>

          <a
            href={repository.htmlUrl}
            target="_blank"
            rel="noreferrer noopener"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'sm' }),
              'mt-3 w-full',
            )}
          >
            {t('projects.openOnGitHub')}
            <ArrowUpRight aria-hidden="true" />
          </a>
        </PopoverContent>
      </Popover>
    </li>
  )
}

function ProjectsSkeleton() {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {Array.from({ length: PROJECT_COUNT }).map((_, index) => (
        <li
          key={index}
          className="border-border bg-card flex flex-col gap-2 rounded-md border p-3"
        >
          <Skeleton className="h-3.5 w-28" />
          <Skeleton className="h-2.5 w-20" />
        </li>
      ))}
    </ul>
  )
}
