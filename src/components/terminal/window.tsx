import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/utils'

/**
 * A framed block that reads as a terminal pane: a chrome bar carrying the
 * "file name", then the content on the terminal surface.
 */
export function TerminalWindow({
  title,
  children,
  className,
  bodyClassName,
  /** Set when the body scrolls sideways, so keyboard users can reach it. */
  scrollable = false,
  scrollLabel,
  ...props
}: Omit<ComponentProps<'div'>, 'title'> & {
  title: ReactNode
  bodyClassName?: string
  scrollable?: boolean
  scrollLabel?: string
}) {
  return (
    <div
      className={cn(
        'border-border bg-terminal overflow-hidden rounded-md border',
        className,
      )}
      {...props}
    >
      <div className="bg-terminal-chrome border-border flex items-center gap-2 border-b px-3 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="bg-rose/70 size-2 rounded-full" />
          <span className="bg-amber/70 size-2 rounded-full" />
          <span className="bg-mint/70 size-2 rounded-full" />
        </span>
        <span className="text-muted-foreground truncate text-[11px]">
          {title}
        </span>
      </div>
      <div
        className={cn('p-4 text-xs leading-relaxed', bodyClassName)}
        {...(scrollable
          ? { tabIndex: 0, role: 'region', 'aria-label': scrollLabel }
          : {})}
      >
        {children}
      </div>
    </div>
  )
}
