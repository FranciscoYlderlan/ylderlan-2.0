import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Projects } from '@/components/sections/projects'
import { siteConfig } from '@/config/site'
import i18n from '@/i18n'
import { en } from '@/i18n/locales/en'

function payload(count: number) {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    name: `project-${index}`,
    description: index === 0 ? null : `Description ${index}.`,
    html_url: `https://github.com/x/project-${index}`,
    homepage: null,
    language: 'TypeScript',
    stargazers_count: index,
    topics: [],
    pushed_at: '2026-09-01T00:00:00Z',
    fork: false,
    archived: false,
    private: false,
  }))
}

describe('<Projects />', () => {
  it('shows at most five repositories once loaded', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => payload(9) }),
    )

    render(<Projects />)

    await waitFor(() => {
      expect(screen.getByText('project-1')).toBeInTheDocument()
    })

    expect(screen.getAllByRole('listitem')).toHaveLength(5)
  })

  it('falls back to a placeholder when a repository has no description', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => payload(1) }),
    )

    render(<Projects />)

    await waitFor(() => {
      expect(screen.getByText(en.projects.noDescription)).toBeInTheDocument()
    })
  })

  it('always links to the full repository list', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => payload(2) }),
    )

    render(<Projects />)

    expect(
      screen.getByRole('link', { name: new RegExp(en.projects.seeMore, 'i') }),
    ).toHaveAttribute('href', siteConfig.links.githubRepositories)
  })

  it('offers a retry when GitHub fails', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: false, status: 503, json: async () => ({}) })
      .mockResolvedValue({ ok: true, json: async () => payload(3) })
    vi.stubGlobal('fetch', fetchMock)

    const user = userEvent.setup()
    render(<Projects />)

    await waitFor(() => {
      expect(screen.getByText(en.projects.error)).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: en.projects.retry }))

    await waitFor(() => {
      expect(screen.getByText('project-0')).toBeInTheDocument()
    })

    error.mockRestore()
  })

  it('renders the section title in the active language', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => payload(1) }),
    )

    await i18n.changeLanguage('pt')
    render(<Projects />)

    expect(
      screen.getByRole('heading', { name: 'Hoje, eu construo coisas assim:' }),
    ).toBeInTheDocument()

    await i18n.changeLanguage('en')
  })
})
