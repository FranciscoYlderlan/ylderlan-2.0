import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

/**
 * A row that loops forever and stops while the pointer is over it or while
 * anything inside it has keyboard focus.
 *
 * The track holds the children twice: the animation travels exactly half its
 * width, so the second copy lands where the first started and the seam never
 * shows. The duplicate is hidden from assistive tech — `Marquee` is decorative
 * and the section renders a plain, static list alongside it for screen readers
 * and for anyone who asked for reduced motion.
 */
export function Marquee({
  children,
  reverse = false,
  durationSeconds = 40,
  className,
}: {
  children: ReactNode
  reverse?: boolean
  durationSeconds?: number
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'marquee relative flex overflow-hidden',
        '[mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]',
        className,
      )}
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          className={cn(
            'flex w-max shrink-0 gap-2 pr-2',
            reverse ? 'animate-marquee-reverse' : 'animate-marquee',
          )}
          style={{ animationDuration: `${durationSeconds}s` }}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
