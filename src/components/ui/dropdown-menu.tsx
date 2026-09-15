import { Menu } from '@base-ui/react/menu'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

const DropdownMenu = Menu.Root
const DropdownMenuPortal = Menu.Portal
const DropdownMenuGroup = Menu.Group

function DropdownMenuTrigger({
  className,
  ...props
}: ComponentProps<typeof Menu.Trigger>) {
  return (
    <Menu.Trigger
      data-slot="dropdown-menu-trigger"
      className={cn(
        "text-muted-foreground hover:bg-muted hover:text-foreground data-popup-open:bg-muted data-popup-open:text-foreground inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-sm px-2.5 text-[11px] transition-colors outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&_svg:not([class*='size-'])]:size-3.5",
        className,
      )}
      {...props}
    />
  )
}

function DropdownMenuContent({
  className,
  sideOffset = 8,
  align = 'end',
  ...props
}: ComponentProps<typeof Menu.Popup> & {
  sideOffset?: number
  align?: 'start' | 'center' | 'end'
}) {
  return (
    <Menu.Portal>
      <Menu.Positioner
        className="z-50 outline-none"
        sideOffset={sideOffset}
        align={align}
      >
        <Menu.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            'bg-popover text-popover-foreground border-border min-w-36 origin-[var(--transform-origin)] rounded-md border p-1 shadow-lg outline-none transition-[opacity,transform] duration-150 ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0',
            className,
          )}
          {...props}
        />
      </Menu.Positioner>
    </Menu.Portal>
  )
}

function DropdownMenuItem({
  className,
  ...props
}: ComponentProps<typeof Menu.Item>) {
  return (
    <Menu.Item
      data-slot="dropdown-menu-item"
      className={cn(
        "data-highlighted:bg-muted data-highlighted:text-foreground flex cursor-pointer items-center justify-between gap-3 rounded-sm px-2.5 py-1.5 text-[11px] outline-none select-none [&_svg:not([class*='size-'])]:size-3.5",
        className,
      )}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: ComponentProps<typeof Menu.Separator>) {
  return (
    <Menu.Separator
      data-slot="dropdown-menu-separator"
      className={cn('bg-border mx-1 my-1 h-px', className)}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
}
