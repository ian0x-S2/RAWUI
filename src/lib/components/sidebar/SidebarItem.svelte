<script lang="ts">
 import { getContext } from 'svelte';
 import { cn } from '../../utils/index.ts';
 import type { Snippet } from 'svelte';

 interface Props {
  icon?: Snippet;
  label: string;
  href?: string;
  active?: boolean;
  onclick?: () => void;
  class?: string;
 }

 let { icon, label, href, active = false, onclick, class: className }: Props = $props();

 const sidebarContext = getContext<{
  isCollapsed: boolean;
  isMobile: boolean;
  close: () => void;
 }>('sidebar');

 const isCollapsed = $derived(sidebarContext?.isCollapsed && !sidebarContext?.isMobile);
 let showTooltip = $state(false);

 const itemClasses = $derived(
  cn(
   'group relative flex w-full items-center rounded-lg text-sm font-medium',
   'transition-all duration-200 ease-linear',
   'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
   'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',

   'p-2',
   isCollapsed ? 'justify-center' : 'justify-start',

   isCollapsed ? 'gap-0' : 'gap-3',

   active && 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold',

   className
  )
 );

 function handleClick() {
  onclick?.();
  if (sidebarContext?.isMobile && href) {
   sidebarContext.close();
  }
 }
</script>

{#snippet ItemContent()}
 {#if icon}
  <span class="flex size-5 shrink-0 items-center justify-center">
   {@render icon()}
  </span>
 {/if}

 <span
  class={cn(
   'overflow-hidden text-sm whitespace-nowrap',
   'transition-all duration-200 ease-linear',
   isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
  )}
 >
  {label}
 </span>

 {#if isCollapsed && showTooltip}
  <div
   class="pointer-events-none absolute left-full z-50 ml-2 rounded-md border bg-popover px-3 py-1.5 text-sm whitespace-nowrap text-popover-foreground shadow-md"
  >
   {label}
  </div>
 {/if}
{/snippet}

{#if href}
 <a
  {href}
  class={itemClasses}
  onclick={handleClick}
  onmouseenter={() => (showTooltip = true)}
  onmouseleave={() => (showTooltip = false)}
 >
  {@render ItemContent()}
 </a>
{:else}
 <button
  type="button"
  class={itemClasses}
  onclick={handleClick}
  onmouseenter={() => (showTooltip = true)}
  onmouseleave={() => (showTooltip = false)}
 >
  {@render ItemContent()}
 </button>
{/if}
