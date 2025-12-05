<script lang="ts">
 import type { Snippet } from 'svelte';
 import { cn } from '$lib/utils';
 import { fade, fly } from 'svelte/transition';
 import { cubicOut } from 'svelte/easing';
 import { getSidebarContext, type SidebarSide } from './ctx.svelte.js';

 interface Props {
  children: Snippet;
  side?: SidebarSide;
  class?: string;
 }

 let { children, side = 'left', class: className }: Props = $props();

 const ctx = getSidebarContext();
</script>

{#if ctx.isMobile}
 {#if ctx.isOpen}
  <button
   class={cn(
    'fixed inset-0 z-40 bg-black/50 md:hidden',
    'transition-[backdrop-filter] duration-300'
   )}
   style="backdrop-filter: blur(4px);"
   {...ctx.overlayProps}
   transition:fade={{ duration: 200, easing: cubicOut }}
  ></button>

  <aside
   class={cn(
    'fixed inset-y-0 z-50 flex h-full w-[280px] max-w-[85vw] flex-col overflow-hidden bg-sidebar shadow-xl',
    side === 'left'
     ? 'left-0 border-r border-sidebar-border'
     : 'right-0 border-l border-sidebar-border',
    className
   )}
   {...ctx.sidebarProps}
   transition:fly={{
    x: side === 'left' ? -300 : 300,
    duration: 300,
    easing: cubicOut
   }}
  >
   {@render children()}
  </aside>
 {/if}
{:else}
 {#if !ctx.isFloating}
  <div
   class="relative hidden bg-transparent md:block"
   style="
				width: {ctx.spacerWidth};
				transition: width var(--sidebar-transition-duration) var(--sidebar-transition-easing);
				order: {side === 'left' ? 1 : 3};
			"
   aria-hidden="true"
  ></div>
 {/if}

 {#if ctx.isFloating}
  {#if ctx.isOpen}
   <button
    class="fixed inset-0 z-40 hidden bg-black/30 md:block"
    style="backdrop-filter: blur(2px);"
    {...ctx.overlayProps}
    transition:fade={{ duration: 200, easing: cubicOut }}
   ></button>

   <aside
    class={cn(
     'fixed z-50 hidden flex-col overflow-hidden rounded-lg border border-sidebar-border bg-sidebar shadow-2xl md:flex',
     side === 'left' ? 'left-4' : 'right-4',
     className
    )}
    style="
					width: var(--sidebar-width-floating, 18rem);
					top: 1rem;
					bottom: 1rem;
				"
    {...ctx.sidebarProps}
    transition:fly={{
     x: side === 'left' ? -320 : 320,
     duration: 300,
     easing: cubicOut
    }}
   >
    {@render children()}
   </aside>
  {/if}
 {:else}
  <aside
   class={cn(
    'fixed inset-y-0 z-10 hidden h-svh flex-col overflow-hidden bg-sidebar md:flex',
    'will-change-[width]',
    side === 'left'
     ? 'left-0 border-r border-sidebar-border'
     : 'right-0 border-l border-sidebar-border',
    className
   )}
   style="
				width: {ctx.sidebarWidth};
				transition: width var(--sidebar-transition-duration) var(--sidebar-transition-easing);
			"
   {...ctx.sidebarProps}
  >
   {@render children()}
  </aside>
 {/if}
{/if}
