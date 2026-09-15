import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { App } from '@/app'
import i18n from '@/i18n'
import { en } from '@/i18n/locales/en'
import { pt } from '@/i18n/locales/pt'

/**
 * Matches the element whose own text is exactly this string once the
 * markdown-lite emphasis markers are dropped. RichText turns `**x**` into a
 * <strong>, which splits the sentence across nodes and defeats a plain string
 * matcher.
 */
const richText = (value: string) => {
  const expected = value.replace(/\*\*/g, '')
  return (_content: string, element: Element | null) =>
    element?.textContent === expected
}

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({ ok: true, json: async () => [] }),
  )
})

describe('<App />', () => {
  it('renders one main landmark with every section', async () => {
    render(<App />)

    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()

    for (const command of [
      en.projects.command,
      en.stack.command,
      en.social.command,
      en.about.command,
      en.experience.command,
    ]) {
      expect(
        within(main).getByRole('heading', {
          level: 2,
          name: new RegExp(command.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
        }),
      ).toBeInTheDocument()
    }
  })

  it('exposes exactly one level-one heading', () => {
    render(<App />)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })

  it('offers a skip link as the first focusable element', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.tab()

    const skip = screen.getByRole('link', { name: en.a11y.skipToContent })
    expect(skip).toHaveFocus()
    expect(skip).toHaveAttribute('href', '#main')
  })

  it('switches the whole page to portuguese', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: en.a11y.changeLanguage }))
    await user.click(await screen.findByRole('menuitem', { name: /Português/ }))

    await waitFor(() => {
      expect(
        screen.getByText(richText(pt.about.paragraphs[0])),
      ).toBeInTheDocument()
    })

    expect(document.documentElement.lang).toBe('pt-BR')
    expect(document.title).toBe(pt.meta.title)

    await i18n.changeLanguage('en')
  })

  it('shows the first job by default and switches on tab click', async () => {
    const user = userEvent.setup()
    render(<App />)

    const [first, second] = en.experience.items

    expect(screen.getByText(richText(first.bullets[0]))).toBeInTheDocument()

    await user.click(screen.getByRole('tab', { name: second.company }))

    await waitFor(() => {
      expect(screen.getByText(richText(second.bullets[0]))).toBeInTheDocument()
    })
  })
})
