import { describe, expect, it } from 'vitest'

import i18n, { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '@/i18n'
import { en } from '@/i18n/locales/en'
import { pt } from '@/i18n/locales/pt'

/** Flattens a translation bundle into dot-separated leaf paths. */
function keyPaths(value: unknown, prefix = ''): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => keyPaths(item, `${prefix}[${index}]`))
  }

  if (value !== null && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) =>
      keyPaths(child, prefix ? `${prefix}.${key}` : key),
    )
  }

  return [prefix]
}

describe('i18n', () => {
  it('falls back to english', () => {
    expect(DEFAULT_LANGUAGE).toBe('en')
    expect(i18n.options.fallbackLng).toEqual(['en'])
  })

  it('supports exactly portuguese and english', () => {
    expect([...SUPPORTED_LANGUAGES].sort()).toEqual(['en', 'pt'])
  })

  it('resolves regional portuguese onto the pt bundle', async () => {
    await i18n.changeLanguage('pt-BR')
    expect(i18n.resolvedLanguage).toBe('pt')
    expect(i18n.t('hero.greeting')).toBe(pt.hero.greeting)
    await i18n.changeLanguage('en')
  })

  it('renders an unknown language in english', async () => {
    await i18n.changeLanguage('de')
    expect(i18n.t('hero.greeting')).toBe(en.hero.greeting)
    await i18n.changeLanguage('en')
  })

  it('keeps both bundles structurally identical', () => {
    expect(keyPaths(pt)).toEqual(keyPaths(en))
  })

  it('keeps the experience ids aligned across locales', () => {
    expect(pt.experience.items.map((item) => item.id)).toEqual(
      en.experience.items.map((item) => item.id),
    )
  })
})
