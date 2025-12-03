<!-- src/lib/components/ui/dropdown-menu/item.svelte -->
<script lang="ts">
 import { getContext } from 'svelte';
 import type { DropdownState } from './ctx.svelte.js';

 let {
  children,
  class: className = undefined,
  onclick = undefined,
  ...restProps
 } = $props();
 const root = getContext<DropdownState>('dropdown-root');

 function handleClick(e: MouseEvent) {
  root.close();
  if (onclick) onclick(e);
 }
</script>

<div
 role="menuitem"
 tabindex="0"
 onclick={handleClick}
 onkeydown={(e) => e.key === 'Enter' && handleClick(e as any)}
 {...restProps}
 class="relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 {className}"
>
 {@render children()}
</div>
