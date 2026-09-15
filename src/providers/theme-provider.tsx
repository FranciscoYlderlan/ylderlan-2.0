import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'

import { ThemeProviderContext, type Theme } from './theme-context'

const STORAGE_KEY = 'ylderlan-theme'

function readStoredTheme(): Theme | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === 'light' || stored === 'dark' || stored === 'system'
      ? stored
      : null
  } catch {
    return null
  }
}

function prefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
}: {
  children: ReactNode
  defaultTheme?: Theme
}) {
  const [theme, setThemeState] = useState<Theme>(
    () => readStoredTheme() ?? defaultTheme,
  )

  const resolvedTheme = useMemo(() => {
    if (theme !== 'system') return theme
    if (typeof window === 'undefined') return 'dark'
    return prefersDark() ? 'dark' : 'light'
  }, [theme])

  useEffect(() => {
    const root = document.documentElement

    function apply() {
      const next =
        theme === 'system' ? (prefersDark() ? 'dark' : 'light') : theme
      root.classList.toggle('dark', next === 'dark')
    }

    apply()

    if (theme !== 'system') return

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [theme])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Storage can be unavailable (private mode, blocked cookies) — the theme
      // still applies for this visit, it just is not remembered.
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(
      (theme === 'system' ? (prefersDark() ? 'dark' : 'light') : theme) ===
        'dark'
        ? 'light'
        : 'dark',
    )
  }, [setTheme, theme])

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme],
  )

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export { STORAGE_KEY as THEME_STORAGE_KEY }
