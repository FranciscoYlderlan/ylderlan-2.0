import { Avatar as BaseAvatar } from '@base-ui/react/avatar'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

function Avatar({ className, ...props }: ComponentProps<typeof BaseAvatar.Root>) {
  return (
    <BaseAvatar.Root
      data-slot="avatar"
      className={cn(
        'bg-muted relative inline-flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full align-middle select-none',
        className,
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: ComponentProps<typeof BaseAvatar.Image>) {
  return (
    <BaseAvatar.Image
      data-slot="avatar-image"
      className={cn('size-full object-cover', className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  delay = 400,
  ...props
}: ComponentProps<typeof BaseAvatar.Fallback>) {
  return (
    <BaseAvatar.Fallback
      data-slot="avatar-fallback"
      delay={delay}
      className={cn(
        'text-muted-foreground flex size-full items-center justify-center text-xs font-medium',
        className,
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
