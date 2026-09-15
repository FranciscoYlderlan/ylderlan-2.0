import { ArrowUpRight, RefreshCw, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { siteConfig } from '@/config/site'
import { useGitHubRepositories } from '@/hooks/use-github-repositories'
import type { Repository } from '@/services/github'

const PROJECT_COUNT = 5

export function Projects() {
  const { t } = useTranslation()
  const { repositories, status, retry } = useGitHubRepositories(PROJECT_COUNT)

  return (
    <Section id="projects" title={t('projects.title')}>
      <div aria-live="polite" aria-busy={status === 'loading'}>
        {status === 'loading' ? <ProjectsSkeleton /> : null}

        {status === 'error' ? (
          <div className="border-border bg-card flex flex-col items-start gap-3 rounded-lg border p-4">
            <p className="text-muted-foreground text-sm">
              {t('projects.error')}
            </p>
            <Button variant="outline" size="sm" onClick={retry}>
              <RefreshCw aria-hidden="true" />
              {t('projects.retry')}
            </Button>
          </div>
        ) : null}

        {status === 'success' && repositories.length === 0 ? (
          <p className="text-muted-foreground text-sm">{t('projects.empty')}</p>
        ) : null}

        {status === 'success' && repositories.length > 0 ? (
          <ul className="grid gap-2">
            {repositories.map((repository) => (
              <ProjectCard key={repository.id} repository={repository} />
            ))}
          </ul>
        ) : null}
      </div>

      <div className="mt-5">
        <Button
          variant="outline"
          size="sm"
          render={
            <a
              href={siteConfig.links.githubRepositories}
              target="_blank"
              rel="noreferrer noopener"
            />
          }
        >
          {t('projects.seeMore')}
          <ArrowUpRight aria-hidden="true" />
        </Button>
      </div>
    </Section>
  )
}

function ProjectCard({ repository }: { repository: Repository }) {
  const { t } = useTranslation()

  return (
    <li>
      <a
        href={repository.htmlUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="border-border bg-card hover:border-primary/40 group flex flex-col gap-1.5 rounded-lg border p-4 transition-colors"
      >
        <span className="flex items-center justify-between gap-3">
          <span className="text-foreground group-hover:text-highlight text-sm font-semibold transition-colors">
            {repository.name}
          </span>
          <ArrowUpRight
            className="text-muted-foreground group-hover:text-highlight size-4 shrink-0 transition-colors"
            aria-hidden="true"
          />
        </span>

        <span className="text-muted-foreground text-xs leading-relaxed">
          {repository.description ?? t('projects.noDescription')}
        </span>

        <span className="text-muted-foreground mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px]">
          {repository.language ? (
            <span className="flex items-center gap-1.5">
              <span
                className="bg-brand-contrast size-2 rounded-full"
                aria-hidden="true"
              />
              {repository.language}
            </span>
          ) : null}
          {repository.stars > 0 ? (
            <span className="flex items-center gap-1">
              <Star className="size-3" aria-hidden="true" />
              {t('projects.stars', { count: repository.stars })}
            </span>
          ) : null}
        </span>
      </a>
    </li>
  )
}

function ProjectsSkeleton() {
  return (
    <ul className="grid gap-2">
      {Array.from({ length: PROJECT_COUNT }).map((_, index) => (
        <li
          key={index}
          className="border-border bg-card flex flex-col gap-2 rounded-lg border p-4"
        >
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-20" />
        </li>
      ))}
    </ul>
  )
}
