import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

function Tabs({ className, ...props }: ComponentProps<typeof BaseTabs.Root>) {
  return (
    <BaseTabs.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-3', className)}
      {...props}
    />
  )
}

function TabsList({ className, ...props }: ComponentProps<typeof BaseTabs.List>) {
  return (
    <BaseTabs.List
      data-slot="tabs-list"
      className={cn('relative flex items-stretch', className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: ComponentProps<typeof BaseTabs.Tab>) {
  return (
    <BaseTabs.Tab
      data-slot="tabs-trigger"
      className={cn(
        'text-muted-foreground hover:text-foreground data-active:text-foreground relative cursor-pointer rounded-sm px-3 py-2 text-left text-xs whitespace-nowrap transition-colors outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: ComponentProps<typeof BaseTabs.Panel>) {
  return (
    <BaseTabs.Panel
      data-slot="tabs-content"
      className={cn('outline-none', className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
