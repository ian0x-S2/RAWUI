<script lang="ts">
 import { type Snippet } from 'svelte';
 import { scale } from 'svelte/transition';
 import type { HTMLAttributes } from 'svelte/elements';
 import { getDropdownRoot } from './ctx.svelte.js';
 import Portal from '$lib/components/portal/Portal.svelte';
 import { cn } from '$lib/utils';

 type Props = {
  children: Snippet;
  class?: string;
 } & HTMLAttributes<HTMLDivElement>;

 let { children, class: className, ...restProps }: Props = $props();

 const root = getDropdownRoot();
</script>

<Portal>
 {#if root.isOpen}
  <div
   {...root.contentProps}
   {...restProps}
   data-keyboard-nav={root.isKeyboardNav}
   transition:scale={{ duration: 100, start: 0.95 }}
   class={cn(
    'fixed z-50 min-w-32 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md',
    className
   )}
   style="width: max-content;"
  >
   {@render children()}
  </div>
 {/if}
</Portal>
