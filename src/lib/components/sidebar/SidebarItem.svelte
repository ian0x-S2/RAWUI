<script lang="ts">
 import type { Snippet } from 'svelte';
 import { cn } from '$lib/utils';
 import { getSidebarContext } from './ctx.svelte.js';
 import { scale, fade } from 'svelte/transition';
 import { cubicOut } from 'svelte/easing';

 interface Props {
  icon?: Snippet;
  label: string;
  href?: string;
  active?: boolean;
  onclick?: () => void;
  class?: string;
  labelClass?: string;
 }

 let {
  icon,
  label,
  href,
  active = false,
  onclick,
  class: className,
  labelClass
 }: Props = $props();

 const ctx = getSidebarContext();

 const isCollapsed = $derived(ctx.isCollapsed);
 let showTooltip = $state(false);

 const itemClasses = $derived(
  cn(
   'group relative flex w-full items-center rounded-lg text-sm font-medium',
   'transition-[background-color,color,gap,padding] duration-200 ease-out',
   'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
   'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
   'p-2',
   isCollapsed ? 'justify-center gap-0' : 'justify-start gap-3',
   active && 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold',
   className
  )
 );

 function handleClick() {
  onclick?.();
  if (ctx.isMobile && href) {
   ctx.close();
  }
 }
</script>

{#snippet ItemContent()}
 {#if icon}
  <span
   class={cn(
    'flex size-5 shrink-0 items-center justify-center',
    'transition-transform duration-200 ease-out',
    isCollapsed && 'scale-110'
   )}
  >
   {@render icon()}
  </span>
 {/if}

 <span
  class={cn(
   'overflow-hidden whitespace-nowrap',
   'transition-[width,opacity] duration-200 ease-out',
   isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100',
   labelClass
  )}
 >
  {label}
 </span>

 {#if isCollapsed && showTooltip}
  <div
   role="tooltip"
   class={cn(
    'pointer-events-none absolute left-full z-50 ml-3',
    'rounded-md border bg-popover px-3 py-1.5 text-sm whitespace-nowrap text-popover-foreground shadow-md'
   )}
   in:scale={{ duration: 150, start: 0.9, opacity: 0, easing: cubicOut }}
   out:fade={{ duration: 100 }}
  >
   {label}
  </div>
 {/if}
{/snippet}

{#if href}
 <a
  {href}
  class={itemClasses}
  data-active={active}
  data-sidebar="item"
  onclick={handleClick}
  onmouseenter={() => (showTooltip = true)}
  onmouseleave={() => (showTooltip = false)}
  onfocus={() => (showTooltip = true)}
  onblur={() => (showTooltip = false)}
 >
  {@render ItemContent()}
 </a>
{:else}
 <button
  type="button"
  class={itemClasses}
  data-active={active}
  data-sidebar="item"
  onclick={handleClick}
  onmouseenter={() => (showTooltip = true)}
  onmouseleave={() => (showTooltip = false)}
  onfocus={() => (showTooltip = true)}
  onblur={() => (showTooltip = false)}
 >
  {@render ItemContent()}
 </button>
{/if}
