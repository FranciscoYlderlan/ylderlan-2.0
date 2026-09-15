import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { useTheme } from '@/hooks/use-theme'
import { ThemeProvider, THEME_STORAGE_KEY } from '@/providers/theme-provider'

function Probe() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme()

  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button onClick={toggleTheme}>toggle</button>
      <button onClick={() => setTheme('light')}>light</button>
    </div>
  )
}

function stubPrefersDark(matches: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
      onchange: null,
    })),
  )
}

describe('ThemeProvider', () => {
  it('follows the system preference by default', () => {
    stubPrefersDark(true)

    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )

    expect(screen.getByTestId('theme')).toHaveTextContent('system')
    expect(screen.getByTestId('resolved')).toHaveTextContent('dark')
    expect(document.documentElement).toHaveClass('dark')
  })

  it('does not apply the dark class when the system prefers light', () => {
    stubPrefersDark(false)

    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )

    expect(document.documentElement).not.toHaveClass('dark')
  })

  it('toggles between light and dark and persists the choice', async () => {
    stubPrefersDark(false)
    const user = userEvent.setup()

    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'toggle' }))

    expect(document.documentElement).toHaveClass('dark')
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark')

    await user.click(screen.getByRole('button', { name: 'toggle' }))

    expect(document.documentElement).not.toHaveClass('dark')
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('light')
  })

  it('restores the stored theme on mount', () => {
    stubPrefersDark(false)
    window.localStorage.setItem(THEME_STORAGE_KEY, 'dark')

    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )

    expect(screen.getByTestId('theme')).toHaveTextContent('dark')
    expect(document.documentElement).toHaveClass('dark')
  })

  it('still renders when storage throws', async () => {
    stubPrefersDark(false)
    const setItem = vi
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(() => {
        throw new Error('blocked')
      })
    const user = userEvent.setup()

    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )

    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'light' }))
    })

    expect(screen.getByTestId('resolved')).toHaveTextContent('light')
    setItem.mockRestore()
  })

  it('refuses to render consumers outside the provider', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => render(<Probe />)).toThrow(/ThemeProvider/)

    error.mockRestore()
  })
})
