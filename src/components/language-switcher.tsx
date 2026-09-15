import { Check, Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Menu, MenuItem, MenuPopup, MenuTrigger } from '@/components/ui/menu'
import {
  LANGUAGE_LABELS,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from '@/i18n'

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const current = i18n.resolvedLanguage as SupportedLanguage

  return (
    <Menu>
      <MenuTrigger aria-label={t('a11y.changeLanguage')}>
        <Languages aria-hidden="true" />
        <span className="uppercase">{current}</span>
      </MenuTrigger>
      <MenuPopup>
        {SUPPORTED_LANGUAGES.map((language) => (
          <MenuItem
            key={language}
            onClick={() => void i18n.changeLanguage(language)}
          >
            <span>{LANGUAGE_LABELS[language]}</span>
            {language === current ? (
              <Check className="text-highlight" aria-hidden="true" />
            ) : null}
          </MenuItem>
        ))}
      </MenuPopup>
    </Menu>
  )
}
