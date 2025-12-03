<!-- src/lib/components/ui/dropdown-menu/DropdownItem.svelte -->
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
 let el: HTMLElement;

 $effect(() => {
  if (el) return root.registerItem(el);
 });

 function handleClick(e: MouseEvent) {
  if (onclick) onclick(e);
  root.close();
 }
</script>

<div
 bind:this={el}
 role="menuitem"
 tabindex="-1"
 onclick={handleClick}
 data-orientation="vertical"
 {...restProps}
 class="relative my-1 flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 {className}"
>
 {@render children()}
</div>
