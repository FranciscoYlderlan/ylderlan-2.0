import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/utils'

type SectionProps = ComponentProps<'section'> & {
  title?: ReactNode
  children: ReactNode
}

export function Section({ title, children, className, ...props }: SectionProps) {
  return (
    <section className={cn('scroll-mt-20 py-8 sm:py-10', className)} {...props}>
      {title ? (
        <h2 className="text-foreground mb-5 text-lg font-bold tracking-tight sm:text-xl">
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  )
}
