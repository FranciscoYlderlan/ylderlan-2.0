import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'

import '@fontsource-variable/jetbrains-mono'
import '@fontsource/exo-2/600.css'

import { App } from '@/app'

import '@/i18n'
import './index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element with id "root" was not found in the document.')
}

createRoot(rootElement).render(
  <StrictMode>
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </StrictMode>,
)
