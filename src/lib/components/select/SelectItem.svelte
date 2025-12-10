<script lang="ts">
 import { getSelectContext } from './ctx.svelte.js';
 import { cn } from '$lib/utils';
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

 // Action: Maneira segura de registrar o item sem causar loops infinitos de reatividade
 function register(node: HTMLElement) {
  const textLabel = label || node.textContent || value;

  const cleanup = ctx.registerItem({
   value,
   label: textLabel.trim(),
   element: node,
   disabled
  });

  return {
   destroy: cleanup
  };
 }

 function handleClick(e: MouseEvent) {
  e.preventDefault();
  e.stopPropagation(); // Importante para evitar fechar ao clicar
  if (disabled) return;
  ctx.select(value);
 }

 function handlePointerMove(e: PointerEvent) {
  if (e.pointerType !== 'mouse' || disabled) return;
  if (ctx.isKeyboardNav) ctx.isKeyboardNav = false;
  if (ctx.highlightedValue !== value) ctx.highlightedValue = value;
 }

 const isSelected = $derived(ctx.isSelected(value));
 const isHighlighted = $derived(ctx.highlightedValue === value);
</script>

<div
 use:register
 id="{ctx.baseId}-option-{value}"
 role="option"
 aria-selected={isSelected}
 aria-disabled={disabled}
 data-disabled={disabled || undefined}
 data-highlighted={isHighlighted || undefined}
 onclick={handleClick}
 onpointermove={handlePointerMove}
 class={cn(
  'relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none select-none',
  'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
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
