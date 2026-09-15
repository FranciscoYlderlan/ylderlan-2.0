import { useTranslation } from 'react-i18next'

import { LogoBadge } from '@/components/brand/logo'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-border mt-4 border-t py-10">
      <div className="text-muted-foreground flex flex-col items-center gap-3 text-center text-[11px] leading-relaxed">
        <LogoBadge className="size-7 rounded-md" />
        <p className="text-prompt">{t('footer.exit')}</p>
        <p>{t('footer.builtWith')}</p>
        <p>{t('footer.rights')}</p>
      </div>
    </footer>
  )
}
