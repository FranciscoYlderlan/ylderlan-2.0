import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

const TONES = {
  mint: 'text-mint',
  violet: 'text-violet',
  sky: 'text-sky',
  rose: 'text-rose',
  amber: 'text-amber',
  muted: 'text-muted-foreground',
} as const

export type BadgeTone = keyof typeof TONES

/**
 * A two-tone chip in the shape of the flat-square shields in the profile
 * README: a dim label segment, then the value in the accent colour.
 */
export function Badge({
  label,
  children,
  tone = 'mint',
  className,
  ...props
}: Omit<ComponentProps<'span'>, 'children'> & {
  label?: string
  children: React.ReactNode
  tone?: BadgeTone
}) {
  return (
    <span
      className={cn(
        'border-border bg-terminal/60 inline-flex items-stretch overflow-hidden rounded-sm border text-[11px] leading-none',
        className,
      )}
      {...props}
    >
      {label ? (
        <span className="text-muted-foreground border-border border-r px-2 py-1">
          {label}
        </span>
      ) : null}
      <span className={cn('px-2 py-1', TONES[tone])}>{children}</span>
    </span>
  )
}
