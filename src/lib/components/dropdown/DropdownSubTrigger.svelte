<script lang="ts">
 import { type Snippet } from 'svelte';
 import type { HTMLAttributes } from 'svelte/elements';
 import { getDropdownRoot, getDropdownSub } from './ctx.svelte.js';
 import { cn } from '$lib/utils';

 type Props = {
  children: Snippet;
  class?: string;
 } & HTMLAttributes<HTMLDivElement>;

 let { children, class: className, ...restProps }: Props = $props();

 const root = getDropdownRoot();
 const sub = getDropdownSub();

 let el: HTMLElement;

 $effect(() => {
  if (el) return root.registerItem(el);
 });

 function handlePointerEnter() {
  if (!root.isKeyboardNav) {
   el?.focus();
  }
  sub.open();
 }

 function handlePointerMove() {
  root.isKeyboardNav = false;
 }
</script>

<div
 bind:this={el}
 {...sub.triggerProps}
 {...restProps}
 onpointerenter={handlePointerEnter}
 onpointermove={handlePointerMove}
 class={cn(
  'relative my-1 flex cursor-default items-center justify-between rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [div:not([data-keyboard-nav])_&]:hover:bg-accent [div:not([data-keyboard-nav])_&]:hover:text-accent-foreground',
  className
 )}
>
 {@render children()}
 <svg
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class="ml-auto"
 >
  <path d="m9 18 6-6-6-6" />
 </svg>
</div>
