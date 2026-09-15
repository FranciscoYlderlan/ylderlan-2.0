import { Check, Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  LANGUAGE_LABELS,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from '@/i18n'

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const current = i18n.resolvedLanguage as SupportedLanguage

  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label={t('a11y.changeLanguage')}>
        <Languages aria-hidden="true" />
        <span className="uppercase">{current}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {SUPPORTED_LANGUAGES.map((language) => (
          <DropdownMenuItem
            key={language}
            onClick={() => void i18n.changeLanguage(language)}
          >
            <span>{LANGUAGE_LABELS[language]}</span>
            {language === current ? (
              <Check className="text-mint" aria-hidden="true" />
            ) : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
