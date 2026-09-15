import { Popover as BasePopover } from '@base-ui/react/popover'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

const Popover = BasePopover.Root
const PopoverTrigger = BasePopover.Trigger
const PopoverTitle = BasePopover.Title
const PopoverDescription = BasePopover.Description

function PopoverContent({
  className,
  sideOffset = 8,
  align = 'center',
  ...props
}: ComponentProps<typeof BasePopover.Popup> & {
  sideOffset?: number
  align?: 'start' | 'center' | 'end'
}) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner
        className="z-50 outline-none"
        sideOffset={sideOffset}
        align={align}
      >
        <BasePopover.Popup
          data-slot="popover-content"
          className={cn(
            'bg-popover text-popover-foreground border-border w-72 max-w-[calc(100vw-2rem)] origin-[var(--transform-origin)] rounded-md border p-3.5 shadow-lg outline-none transition-[opacity,transform] duration-150 ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0',
            className,
          )}
          {...props}
        />
      </BasePopover.Positioner>
    </BasePopover.Portal>
  )
}

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
}
