import { LanguageSwitcher } from '@/components/language-switcher'
import { Logo } from '@/components/brand/logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { siteConfig } from '@/config/site'

export function Header() {
  return (
    <header className="bg-background/80 sticky top-0 z-40 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-5 sm:px-6">
        <a
          href="#top"
          className="text-foreground/70 hover:text-foreground rounded-md transition-colors"
          aria-label={siteConfig.name}
        >
          <Logo className="size-7" />
        </a>

        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
