<script lang="ts">
 import { getSelectContext } from './ctx.svelte.js';
 import { cn } from '$lib/utils';
 import { fly } from 'svelte/transition';
 import type { HTMLAttributes } from 'svelte/elements';
 import type { Snippet } from 'svelte';
 import Portal from '$lib/components/portal/Portal.svelte'; // Supondo que você tenha um Portal

 interface Props extends HTMLAttributes<HTMLDivElement> {
  children: Snippet;
  class?: string;
 }

 let { children, class: className, ...restProps }: Props = $props();
 const ctx = getSelectContext();
</script>

<Portal>
 {#if ctx.open}
  <div
   class={cn(
    'z-50 max-h-[300px] overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md focus:outline-none',
    className
   )}
   transition:fly={{ y: -5, duration: 150 }}
   {...ctx.contentProps}
   {...restProps}
  >
   <div class="p-1">
    {@render children()}
   </div>
  </div>
 {/if}
</Portal>
