<!-- lib/components/sidebar/SidebarHeader.svelte -->
<script lang="ts">
 import { getContext } from 'svelte';
 import { cn } from '../../utils/index.ts';
 import type { Snippet } from 'svelte';

 interface Props {
  children?: Snippet;
  class?: string;
  icon?: Snippet;
  label?: string;
 }

 let { children, class: className, icon, label }: Props = $props();

 const sidebarContext = getContext<{
  isCollapsed: boolean;
  isMobile: boolean;
 }>('sidebar');

 const isCollapsed = $derived(sidebarContext?.isCollapsed && !sidebarContext?.isMobile);

 const headerClasses = $derived(
  cn(
   'flex items-center border-b p-2',
   'transition-all duration-200 ease-linear overflow-hidden',
   icon || label ? 'flex-row' : 'flex-col',
   isCollapsed ? 'gap-0 justify-center' : 'gap-2 justify-start',
   className
  )
 );
</script>

<div class={headerClasses}>
 {#if icon || label}
  {#if icon}
   <div class="flex aspect-square size-8 shrink-0 items-center justify-center rounded-md">
    {@render icon()}
   </div>
  {/if}

  {#if label}
   <span
    class={cn(
     'truncate font-semibold transition-all duration-200 ease-linear',
     isCollapsed ? 'w-0 opacity-0' : 'ml-1 w-auto opacity-100'
    )}
   >
    {label}
   </span>
  {/if}
 {/if}

 {#if children}
  <div class={cn('flex w-full', (icon || label) && 'ml-auto')}>
   {@render children()}
  </div>
 {/if}
</div>
