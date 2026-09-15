import type { ComponentProps, ReactNode } from 'react'

import { Prompt } from '@/components/terminal/prompt'
import { cn } from '@/lib/utils'

type SectionProps = ComponentProps<'section'> & {
  /** The shell command that names the section, without the `$`. */
  command?: string
  children: ReactNode
}

export function Section({
  command,
  children,
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn('scroll-mt-20 py-9 sm:py-12', className)}
      {...props}
    >
      {command ? <Prompt command={command} className="mb-5" /> : null}
      {children}
    </section>
  )
}
