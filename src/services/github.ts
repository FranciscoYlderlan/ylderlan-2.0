import { GITHUB_USERNAME } from '@/config/site'

const API_ROOT = 'https://api.github.com'
const CACHE_KEY = 'ylderlan-github-repositories'
const CACHE_TTL_MS = 30 * 60 * 1000

export type Repository = {
  id: number
  name: string
  description: string | null
  htmlUrl: string
  homepage: string | null
  language: string | null
  stars: number
  topics: string[]
  pushedAt: string
}

type GitHubRepositoryPayload = {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  topics?: string[]
  pushed_at: string
  fork: boolean
  archived: boolean
  private: boolean
}

type CacheEntry = {
  savedAt: number
  repositories: Repository[]
}

function toRepository(payload: GitHubRepositoryPayload): Repository {
  return {
    id: payload.id,
    name: payload.name,
    description: payload.description,
    htmlUrl: payload.html_url,
    homepage: payload.homepage,
    language: payload.language,
    stars: payload.stargazers_count,
    topics: payload.topics ?? [],
    pushedAt: payload.pushed_at,
  }
}

function readCache(): Repository[] | null {
  try {
    const raw = window.sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null

    const entry = JSON.parse(raw) as CacheEntry
    if (Date.now() - entry.savedAt > CACHE_TTL_MS) return null

    return entry.repositories
  } catch {
    return null
  }
}

function writeCache(repositories: Repository[]) {
  try {
    const entry: CacheEntry = { savedAt: Date.now(), repositories }
    window.sessionStorage.setItem(CACHE_KEY, JSON.stringify(entry))
  } catch {
    // Session storage can be unavailable; the list simply refetches next time.
  }
}

/**
 * Latest public repositories, ordered by most recent push.
 *
 * The unauthenticated GitHub API allows 60 requests per hour per IP, so the
 * result is cached in session storage — a visitor scrolling the page or
 * switching languages never spends a second request.
 */
export async function fetchLatestRepositories(
  limit = 5,
  signal?: AbortSignal,
): Promise<Repository[]> {
  const cached = readCache()
  if (cached) return cached.slice(0, limit)

  const url = new URL(`${API_ROOT}/users/${GITHUB_USERNAME}/repos`)
  url.searchParams.set('sort', 'pushed')
  url.searchParams.set('direction', 'desc')
  url.searchParams.set('type', 'owner')
  url.searchParams.set('per_page', '30')

  const response = await fetch(url, {
    signal,
    headers: { Accept: 'application/vnd.github+json' },
  })

  if (!response.ok) {
    throw new Error(`GitHub responded with ${response.status}.`)
  }

  const payload = (await response.json()) as GitHubRepositoryPayload[]

  const repositories = payload
    .filter((repo) => !repo.fork && !repo.archived && !repo.private)
    // The profile README repository is not a project.
    .filter((repo) => repo.name.toLowerCase() !== GITHUB_USERNAME.toLowerCase())
    .map(toRepository)

  writeCache(repositories)

  return repositories.slice(0, limit)
}
