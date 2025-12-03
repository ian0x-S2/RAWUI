<!-- src/lib/components/ui/dropdown-menu/DropdownContent.svelte -->
<script lang="ts">
 import { getContext } from 'svelte';
 import type { DropdownState } from './ctx.svelte.js';
 import { scale } from 'svelte/transition';
 import Portal from '$lib/components/portal/Portal.svelte';

 let { children, class: className = undefined, ...restProps } = $props();
 const root = getContext<DropdownState>('dropdown-root');
</script>

{#if root.isOpen}
 <Portal>
  <!-- O ...root.contentProps injeta o onkeydown e o role="menu" -->
  <div
   {...root.contentProps}
   {...restProps}
   transition:scale={{ duration: 100, start: 0.95 }}
   class="fixed z-50 min-w-32 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md {className}"
   style="width: max-content;"
  >
   {@render children()}
  </div>
 </Portal>
{/if}
