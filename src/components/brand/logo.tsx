import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

/**
 * The YL monogram: the Y's arms take the current text colour and its stem
 * continues into the L's foot in the brand amber — the same two-letter idea as
 * the original mark, redrawn as three strokes so it stays crisp at 16px.
 */
export function Logo({ className, ...props }: ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      aria-hidden="true"
      focusable="false"
      className={cn('size-8', className)}
      {...props}
    >
      <path d="M8.4 9.2 16 17.2" stroke="currentColor" />
      <path d="M23.6 9.2 16 17.2" stroke="currentColor" />
      <path d="M16 17.2v6.6h6.6" stroke="var(--brand-contrast)" />
    </svg>
  )
}

/** The monogram inside its sage badge — used where the mark needs to stand alone. */
export function LogoBadge({ className, ...props }: ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      className={cn('size-8', className)}
      {...props}
    >
      <circle cx="16" cy="16" r="16" fill="var(--brand-sage)" />
      <g
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
      >
        <path d="M8.4 9.2 16 17.2" stroke="#faf8f2" />
        <path d="M23.6 9.2 16 17.2" stroke="#faf8f2" />
        <path d="M16 17.2v6.6h6.6" stroke="#eeb933" />
      </g>
    </svg>
  )
}
