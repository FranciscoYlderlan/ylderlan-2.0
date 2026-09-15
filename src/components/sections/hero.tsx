import { useTranslation } from 'react-i18next'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { featuredCompanies } from '@/config/site'

export function Hero() {
  const { t } = useTranslation()

  return (
    <section id="top" className="pt-6 pb-4 sm:pt-10">
      <div className="flex items-center gap-4">
        <Avatar className="ring-border size-16 shrink-0 ring-1 sm:size-20">
          <AvatarImage
            src="/avatar-320.webp"
            srcSet="/avatar-160.webp 160w, /avatar-320.webp 320w"
            sizes="80px"
            width={320}
            height={320}
            alt={t('a11y.avatarAlt')}
            loading="eager"
            decoding="async"
          />
          <AvatarFallback>YL</AvatarFallback>
        </Avatar>

        <div>
          <p className="text-muted-foreground text-sm">{t('hero.greeting')}</p>
          <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            {t('hero.name')}
          </h1>
        </div>
      </div>

      <p className="text-muted-foreground mt-6 text-sm leading-relaxed sm:text-base">
        {t('hero.companiesIntro')}{' '}
        {featuredCompanies.map((company, index) => (
          <span key={company.id}>
            <span className={`${company.className} font-medium`}>
              {company.name}
            </span>
            {index < featuredCompanies.length - 2
              ? t('hero.listSeparator')
              : null}
            {index === featuredCompanies.length - 2
              ? t('hero.listLastSeparator')
              : null}
          </span>
        ))}
        {t('hero.companiesOutro')}
      </p>
    </section>
  )
}
