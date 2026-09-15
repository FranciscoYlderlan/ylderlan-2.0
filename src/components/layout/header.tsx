import { LanguageSwitcher } from '@/components/language-switcher'
import { Logo } from '@/components/brand/logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { siteConfig } from '@/config/site'

export function Header() {
  return (
    <header className="bg-background/85 border-border sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between gap-3 px-5 sm:px-6">
        <a
          href="#top"
          className="text-foreground/80 hover:text-foreground flex items-center gap-2 rounded-sm transition-colors"
          aria-label={siteConfig.name}
        >
          <Logo className="size-6" />
          <span className="text-muted-foreground hidden text-xs sm:inline">
            ~/ylderlan
          </span>
        </a>

        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
