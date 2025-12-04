<!-- src/lib/components/ui/dropdown-menu/DropdownContent.svelte -->
<script lang="ts">
 import { getContext } from 'svelte';
 import { scale } from 'svelte/transition';
 import type { DropdownState } from './ctx.svelte.js';
 import Portal from '$lib/components/portal/Portal.svelte';
 import { cn } from '$lib/utils'; // <--- Importar cn

 let { children, class: className = undefined, ...restProps } = $props();
 const root = getContext<DropdownState>('dropdown-root');
</script>

<Portal>
 {#if root.isOpen}
  <div
   {...root.contentProps}
   {...restProps}
   transition:scale={{ duration: 100, start: 0.95 }}
   class={cn(
    ' fixed z-50 min-w-32 overflow-hidden rounded-md border border-border  bg-popover p-1 text-popover-foreground shadow-md',
    className
   )}
   style="width: max-content;"
  >
   {@render children()}
  </div>
 {/if}
</Portal>
