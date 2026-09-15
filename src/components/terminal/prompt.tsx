import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

/**
 * A section heading written the way the profile README writes them:
 * a mint `$` prompt followed by the command that names the section.
 */
export function Prompt({
  command,
  as: Tag = 'h2',
  className,
  ...props
}: Omit<ComponentProps<'h2'>, 'children'> & {
  command: string
  as?: 'h1' | 'h2' | 'h3'
}) {
  return (
    <Tag
      className={cn(
        'text-foreground flex items-baseline gap-2 text-[15px] font-semibold tracking-tight sm:text-base',
        className,
      )}
      {...props}
    >
      <span className="text-prompt select-none" aria-hidden="true">
        $
      </span>
      <span className="min-w-0 break-words">{command}</span>
    </Tag>
  )
}

/** The `>` sub-prompt used for secondary lines. */
export function SubPrompt({
  children,
  className,
  ...props
}: ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'text-muted-foreground flex items-baseline gap-2 text-xs',
        className,
      )}
      {...props}
    >
      <span className="text-prompt/70 select-none" aria-hidden="true">
        &gt;
      </span>
      <span className="min-w-0">{children}</span>
    </p>
  )
}
