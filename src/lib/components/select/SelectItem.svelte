<script lang="ts">
 import { getSelectContext } from './ctx.svelte.js';
 import { cn } from '$lib/utils';
 import { onMount, onDestroy } from 'svelte';
 import type { HTMLAttributes } from 'svelte/elements';
 import type { Snippet } from 'svelte';

 interface Props extends HTMLAttributes<HTMLDivElement> {
  value: string;
  label?: string;
  children: Snippet;
  class?: string;
  disabled?: boolean;
 }

 let {
  value,
  label,
  children,
  class: className,
  disabled = false,
  ...restProps
 }: Props = $props();

 const ctx = getSelectContext();
 let ref: HTMLElement | null = $state(null);

 onMount(() => {
  if (ref) {
   const text = label || ref.textContent || value;
   ctx.registerItem(value, text.trim(), ref);
  }
 });

 onDestroy(() => {
  ctx.unregisterItem(value);
 });

 function handleClick(e: MouseEvent) {
  e.preventDefault();
  if (disabled) return;
  const text = label || ref?.textContent || value;
  ctx.select(value, text.trim());
 }

 function handlePointerEnter() {
  if (disabled) return;
  if (!ctx.isKeyboardNav) {
   const index = ctx.items.findIndex((i) => i.value === value);
   if (index !== -1) {
    ctx.focusedIndex = index;
   }
  }
 }

 function handlePointerMove() {
  if (disabled) return;
  ctx.isKeyboardNav = false;
 }

 const isSelected = $derived(ctx.isSelected(value));
 const isFocused = $derived(ctx.focusedValue === value && ctx.open);
</script>

<div
 bind:this={ref}
 id="{ctx.baseId}-option-{value}"
 role="option"
 aria-selected={isSelected}
 aria-disabled={disabled}
 data-disabled={disabled || undefined}
 data-highlighted={isFocused || undefined}
 onclick={handleClick}
 onpointerenter={handlePointerEnter}
 onpointermove={handlePointerMove}
 class={cn(
  'relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none select-none',
  !disabled && 'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
  !disabled && !ctx.isKeyboardNav && 'hover:bg-accent hover:text-accent-foreground',
  disabled && 'pointer-events-none opacity-50',
  className
 )}
 {...restProps}
>
 {#if isSelected}
  <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
   <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="h-4 w-4"
   >
    <polyline points="20 6 9 17 4 12" />
   </svg>
  </span>
 {/if}

 {@render children()}
</div>
