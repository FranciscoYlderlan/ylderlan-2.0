import { Menu as BaseMenu } from '@base-ui/react/menu'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

const Menu = BaseMenu.Root
const MenuPortal = BaseMenu.Portal

function MenuTrigger({
  className,
  ...props
}: ComponentProps<typeof BaseMenu.Trigger>) {
  return (
    <BaseMenu.Trigger
      data-slot="menu-trigger"
      className={cn(
        "text-muted-foreground hover:text-foreground hover:bg-muted data-popup-open:bg-muted data-popup-open:text-foreground inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-md px-2.5 text-xs transition-colors outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function MenuPopup({
  className,
  sideOffset = 8,
  align = 'end',
  ...props
}: ComponentProps<typeof BaseMenu.Popup> & {
  sideOffset?: number
  align?: 'start' | 'center' | 'end'
}) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner
        className="z-50 outline-none"
        sideOffset={sideOffset}
        align={align}
      >
        <BaseMenu.Popup
          data-slot="menu-popup"
          className={cn(
            'bg-popover text-popover-foreground border-border min-w-36 origin-[var(--transform-origin)] rounded-lg border p-1 shadow-lg outline-none transition-[opacity,transform] duration-150 ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0',
            className,
          )}
          {...props}
        />
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  )
}

function MenuItem({ className, ...props }: ComponentProps<typeof BaseMenu.Item>) {
  return (
    <BaseMenu.Item
      data-slot="menu-item"
      className={cn(
        "data-highlighted:bg-muted data-highlighted:text-foreground flex cursor-pointer items-center justify-between gap-3 rounded-md px-2.5 py-2 text-xs outline-none select-none [&_svg:not([class*='size-'])]:size-3.5",
        className,
      )}
      {...props}
    />
  )
}

export { Menu, MenuPortal, MenuTrigger, MenuPopup, MenuItem }
