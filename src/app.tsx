import { useTranslation } from 'react-i18next'

import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { About } from '@/components/sections/about'
import { Experience } from '@/components/sections/experience'
import { Hero } from '@/components/sections/hero'
import { Projects } from '@/components/sections/projects'
import { Stack } from '@/components/sections/stack'
import { Social } from '@/components/sections/social'
import { useDocumentMetadata } from '@/hooks/use-document-metadata'
import { ThemeProvider } from '@/providers/theme-provider'

function Page() {
  const { t } = useTranslation()

  useDocumentMetadata()

  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#main"
        className="bg-primary text-primary-foreground sr-only rounded-md px-4 py-2 text-sm focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50"
      >
        {t('a11y.skipToContent')}
      </a>

      <Header />

      <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-5 sm:px-6">
        <Hero />
        <Projects />
        <Stack />
        <Social />
        <About />
        <Experience />
      </main>

      <div className="mx-auto w-full max-w-3xl px-5 sm:px-6">
        <Footer />
      </div>
    </div>
  )
}

export function App() {
  return (
    <ThemeProvider>
      <Page />
    </ThemeProvider>
  )
}
