import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { GITHUB_USERNAME } from '@/config/site'
import { fetchLatestRepositories } from '@/services/github'

function repository(overrides: Record<string, unknown> = {}) {
  return {
    id: Math.random(),
    name: 'a-project',
    description: 'Something useful.',
    html_url: 'https://github.com/x/a-project',
    homepage: null,
    language: 'TypeScript',
    stargazers_count: 3,
    topics: ['cli'],
    pushed_at: '2026-09-01T00:00:00Z',
    fork: false,
    archived: false,
    private: false,
    ...overrides,
  }
}

describe('fetchLatestRepositories', () => {
  beforeEach(() => {
    window.sessionStorage.clear()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('requests the most recently pushed repositories', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [repository()],
    })
    vi.stubGlobal('fetch', fetchMock)

    await fetchLatestRepositories()

    const requested = new URL(String(fetchMock.mock.calls[0][0]))
    expect(requested.pathname).toBe(`/users/${GITHUB_USERNAME}/repos`)
    expect(requested.searchParams.get('sort')).toBe('pushed')
    expect(requested.searchParams.get('direction')).toBe('desc')
  })

  it('maps the payload onto the view model', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [repository({ id: 1, name: 'mapped' })],
      }),
    )

    const [result] = await fetchLatestRepositories()

    expect(result).toEqual({
      id: 1,
      name: 'mapped',
      description: 'Something useful.',
      htmlUrl: 'https://github.com/x/a-project',
      homepage: null,
      language: 'TypeScript',
      stars: 3,
      topics: ['cli'],
      pushedAt: '2026-09-01T00:00:00Z',
    })
  })

  it('drops forks, archived repositories and the profile readme', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [
          repository({ id: 1, name: 'keep-me' }),
          repository({ id: 2, name: 'a-fork', fork: true }),
          repository({ id: 3, name: 'old', archived: true }),
          repository({ id: 4, name: GITHUB_USERNAME }),
        ],
      }),
    )

    const result = await fetchLatestRepositories()

    expect(result.map((item) => item.name)).toEqual(['keep-me'])
  })

  it('returns at most the requested number of repositories', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () =>
          Array.from({ length: 12 }, (_, index) =>
            repository({ id: index, name: `project-${index}` }),
          ),
      }),
    )

    expect(await fetchLatestRepositories(5)).toHaveLength(5)
  })

  it('serves the second call from the session cache', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [repository({ id: 1, name: 'cached' })],
    })
    vi.stubGlobal('fetch', fetchMock)

    await fetchLatestRepositories()
    await fetchLatestRepositories()

    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('throws when GitHub rejects the request', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 403, json: async () => ({}) }),
    )

    await expect(fetchLatestRepositories()).rejects.toThrow('403')
  })
})
