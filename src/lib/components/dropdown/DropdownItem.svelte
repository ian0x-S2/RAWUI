<script lang="ts">
 import { type Snippet } from 'svelte';
 import type { HTMLAttributes } from 'svelte/elements';
 import { getDropdownRoot } from './ctx.svelte.js';
 import { cn } from '$lib/utils';

 type Props = {
  children: Snippet;
  class?: string;
  onclick?: (e: MouseEvent) => void;
  closeOnSelect?: boolean;
  disabled?: boolean;
  href?: string;
 } & HTMLAttributes<HTMLDivElement>;

 let {
  children,
  class: className,
  onclick,
  closeOnSelect = true,
  disabled = false,
  href,
  ...restProps
 }: Props = $props();

 const root = getDropdownRoot();
 let el: HTMLElement;

 $effect(() => {
  if (el) return root.registerItem(el);
 });

 function handleClick(e: MouseEvent) {
  if (disabled) {
   e.preventDefault();
   e.stopPropagation();
   return;
  }
  if (onclick) onclick(e);
  if (closeOnSelect) root.close();
 }

 function syncFocus() {
  if (disabled) return;

  if (root.isKeyboardNav) {
   root.isKeyboardNav = false;
  }

  if (document.activeElement !== el) {
   el?.focus({ preventScroll: true });
  }
 }

 function handlePointerMove(e: PointerEvent) {
  if (e.pointerType !== 'mouse') return;

  root.closeAllSubmenus();

  syncFocus();
 }

 function handlePointerEnter(e: PointerEvent) {
  if (e.pointerType !== 'mouse') return;

  root.closeAllSubmenus();
  syncFocus();
 }
</script>

<div
 bind:this={el}
 role="menuitem"
 tabindex="-1"
 onclick={handleClick}
 onpointerenter={handlePointerEnter}
 onpointermove={handlePointerMove}
 aria-disabled={disabled ? 'true' : undefined}
 data-disabled={disabled ? '' : undefined}
 {...restProps}
 class={cn(
  'relative my-1 flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none',
  'focus:bg-accent focus:text-accent-foreground',
  'data-disabled:pointer-events-none data-disabled:opacity-50',
  className
 )}
>
 {@render children()}
</div>
