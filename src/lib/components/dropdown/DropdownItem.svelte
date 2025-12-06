<script lang="ts">
 import { type Snippet } from 'svelte';
 import type { HTMLAttributes } from 'svelte/elements';
 import { getDropdownRoot } from './ctx.svelte.js';
 import { cn } from '$lib/utils';

 type Props = {
  children: Snippet;
  class?: string;
  onclick?: (e: MouseEvent) => void;
 } & HTMLAttributes<HTMLDivElement>;

 let { children, class: className, onclick, ...restProps }: Props = $props();

 const root = getDropdownRoot();

 let el: HTMLElement;

 $effect(() => {
  if (el) return root.registerItem(el);
 });

 function handleClick(e: MouseEvent) {
  if (onclick) onclick(e);
  root.close();
 }

 function handlePointerEnter() {
  if (!root.isKeyboardNav) {
   el?.focus();
  }
 }

 function handlePointerMove() {
  root.isKeyboardNav = false;
 }

 function handleFocus() {
  if (root.isKeyboardNav) {
   root.closeAllSubmenus();
  }
 }
</script>

<div
 bind:this={el}
 role="menuitem"
 tabindex="-1"
 onclick={handleClick}
 onpointerenter={handlePointerEnter}
 onpointermove={handlePointerMove}
 onfocus={handleFocus}
 data-orientation="vertical"
 {...restProps}
 class={cn(
  'relative my-1 flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [div:not([data-keyboard-nav])_&]:hover:bg-accent [div:not([data-keyboard-nav])_&]:hover:text-accent-foreground',
  className
 )}
>
 {@render children()}
</div>
