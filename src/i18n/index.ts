import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import { en } from './locales/en'
import { pt } from './locales/pt'

export const DEFAULT_LANGUAGE = 'en' as const
export const SUPPORTED_LANGUAGES = ['en', 'pt'] as const
export const LANGUAGE_STORAGE_KEY = 'ylderlan-language'

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

export const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  en: 'English',
  pt: 'Português',
}

export const resources = {
  en: { translation: en },
  pt: { translation: pt },
} as const

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    // English is the fallback: anything we cannot resolve renders in English.
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: [...SUPPORTED_LANGUAGES],
    // Maps pt-BR and pt-PT onto the single `pt` bundle.
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: LANGUAGE_STORAGE_KEY,
      caches: ['localStorage'],
    },
    interpolation: {
      // React already escapes rendered values.
      escapeValue: false,
    },
    returnObjects: true,
  })

export default i18n
