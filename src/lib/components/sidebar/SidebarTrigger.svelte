<script lang="ts">
 import type { Snippet } from 'svelte';
 import type { HTMLButtonAttributes } from 'svelte/elements';
 import { cn } from '$lib/utils';
 import { getSidebarContext } from './ctx.svelte.js';

 interface Props extends HTMLButtonAttributes {
  class?: string;
  children?: Snippet;
 }

 let { class: className, children, ...restProps }: Props = $props();

 const ctx = getSidebarContext();
</script>

<button
 class={cn(
  'inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm font-medium shadow-sm',
  'transition-colors duration-200',
  'hover:bg-accent hover:text-accent-foreground',
  'focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
  'disabled:pointer-events-none disabled:opacity-50',
  className
 )}
 {...ctx.triggerProps}
 {...restProps}
>
 {#if children}
  {@render children()}
 {:else}
  <svg
   xmlns="http://www.w3.org/2000/svg"
   width="16"
   height="16"
   viewBox="0 0 24 24"
   fill="none"
   stroke="currentColor"
   stroke-width="2"
   stroke-linecap="round"
   stroke-linejoin="round"
   class="transition-transform duration-200"
  >
   <line x1="3" y1="6" x2="21" y2="6"></line>
   <line x1="3" y1="12" x2="21" y2="12"></line>
   <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
 {/if}
</button>
