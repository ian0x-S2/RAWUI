<script lang="ts">
 import { type Snippet } from 'svelte';
 import type { HTMLAttributes } from 'svelte/elements';
 import { getDropdownRoot, getDropdownSub } from './ctx.svelte.js';
 import { cn } from '$lib/utils';

 type Props = {
  children: Snippet;
  class?: string;
  onclick?: (e: MouseEvent) => void;
  disabled?: boolean;
 } & HTMLAttributes<HTMLDivElement>;

 let {
  children,
  class: className,
  onclick,
  disabled = false,
  ...restProps
 }: Props = $props();

 const root = getDropdownRoot();
 const sub = getDropdownSub();

 let el: HTMLElement;

 $effect(() => {
  if (el) return sub.registerItem(el);
 });

 function handleClick(e: MouseEvent) {
  if (disabled) {
   e.preventDefault();
   e.stopPropagation();
   return;
  }
  if (onclick) onclick(e);
  sub.close();
  root.close();
 }

 function syncFocus() {
  if (disabled) return;
  if (root.isKeyboardNav) root.isKeyboardNav = false;

  if (document.activeElement !== el) {
   el?.focus({ preventScroll: true });
  }
 }

 function handlePointerMove(e: PointerEvent) {
  if (e.pointerType !== 'mouse') return;
  syncFocus();
 }

 function handlePointerEnter(e: PointerEvent) {
  if (e.pointerType !== 'mouse') return;
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
 data-orientation="vertical"
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
