import { Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/use-theme'

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme()
  const { t } = useTranslation()

  const nextTheme = resolvedTheme === 'dark' ? 'themeLight' : 'themeDark'

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={t('a11y.toggleTheme', { theme: t(`a11y.${nextTheme}`) })}
      className="text-muted-foreground hover:text-foreground"
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="size-4" aria-hidden="true" />
      ) : (
        <Moon className="size-4" aria-hidden="true" />
      )}
    </Button>
  )
}
