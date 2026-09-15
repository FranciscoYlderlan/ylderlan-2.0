import { Button as BaseButton } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

/**
 * Terminal-flavoured buttons: square-ish corners like the flat-square badges
 * in the profile README, monospace labels, mint as the action colour.
 */
const buttonVariants = cva(
  [
    'group/button inline-flex shrink-0 items-center justify-center gap-2',
    'rounded-sm font-mono font-medium whitespace-nowrap',
    'transition-[color,background-color,border-color,box-shadow,translate] duration-150',
    'outline-none select-none',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
    'data-disabled:pointer-events-none data-disabled:opacity-50',
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5",
  ].join(' '),
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:brightness-110 active:brightness-95',
        outline:
          'border border-border bg-card text-foreground hover:border-mint hover:text-mint active:translate-y-px',
        ghost:
          'text-muted-foreground hover:bg-muted hover:text-foreground active:translate-y-px',
        link: 'text-mint underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-3.5 text-xs tracking-tight',
        sm: 'h-8 gap-1.5 px-3 text-[11px] tracking-tight',
        lg: 'h-11 px-5 text-sm',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

type ButtonProps = ComponentProps<typeof BaseButton> &
  VariantProps<typeof buttonVariants>

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <BaseButton
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
export type { ButtonProps }
