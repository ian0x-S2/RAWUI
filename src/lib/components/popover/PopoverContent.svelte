<script lang="ts">
 import { getPopoverContext } from './ctx.svelte.js';
 import { cn } from '$lib/utils';
 import { scale } from 'svelte/transition';
 import Portal from '$lib/components/portal/Portal.svelte';
 import type { HTMLAttributes } from 'svelte/elements';
 import type { Snippet } from 'svelte';

 interface Props extends HTMLAttributes<HTMLDivElement> {
  children: Snippet;
  class?: string;
 }

 let { children, class: className, ...restProps }: Props = $props();
 const ctx = getPopoverContext();
</script>

<Portal>
 {#if ctx.open}
  <div
   transition:scale={{ duration: 150, start: 0.95 }}
   class={cn(
    'min-w-[200px] rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none',
    className
   )}
   {...ctx.contentProps}
   {...restProps}
  >
   {@render children()}
  </div>
 {/if}
</Portal>
