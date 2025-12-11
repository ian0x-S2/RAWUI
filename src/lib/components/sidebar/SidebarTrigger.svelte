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
   class="lucide lucide-panel-left-icon lucide-panel-left"
   ><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 3v18" /></svg
  >
 {/if}
</button>
