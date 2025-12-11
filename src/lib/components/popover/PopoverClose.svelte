<script lang="ts">
 import { getPopoverContext } from './ctx.svelte.js';
 import { cn } from '$lib/utils';
 import type { HTMLButtonAttributes } from 'svelte/elements';
 import type { Snippet } from 'svelte';

 interface Props extends HTMLButtonAttributes {
  children?: Snippet;
  class?: string;
 }

 let { children, class: className, ...restProps }: Props = $props();
 const ctx = getPopoverContext();
</script>

<button
 type="button"
 onclick={ctx.close}
 class={cn(
  'absolute top-2 right-2 opacity-70 transition-opacity hover:opacity-100',
  className
 )}
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
   stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
  >
  <span class="sr-only">Close</span>
 {/if}
</button>
