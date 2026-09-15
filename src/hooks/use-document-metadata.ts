import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

/** Keeps <html lang>, the document title and the meta description in sync with i18n. */
export function useDocumentMetadata() {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const language = i18n.resolvedLanguage ?? 'en'
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en'
    document.title = t('meta.title')

    const description = t('meta.description')

    for (const selector of [
      'meta[name="description"]',
      'meta[property="og:description"]',
      'meta[name="twitter:description"]',
    ]) {
      document.querySelector(selector)?.setAttribute('content', description)
    }

    for (const selector of [
      'meta[property="og:title"]',
      'meta[name="twitter:title"]',
    ]) {
      document.querySelector(selector)?.setAttribute('content', t('meta.title'))
    }

    document
      .querySelector('meta[property="og:locale"]')
      ?.setAttribute('content', language === 'pt' ? 'pt_BR' : 'en_US')
  }, [t, i18n.resolvedLanguage])
}
