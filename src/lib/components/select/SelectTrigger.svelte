<script lang="ts">
 import { getSelectContext } from './ctx.svelte.js';
 import { cn } from '$lib/utils';
 import type { HTMLButtonAttributes } from 'svelte/elements';
 import type { Snippet } from 'svelte';

 interface Props extends HTMLButtonAttributes {
  children?: Snippet;
  class?: string;
 }

 let { children, class: className, ...restProps }: Props = $props();
 const ctx = getSelectContext();

 // Apenas para fechar ao clicar fora
 function clickOutside(node: HTMLElement) {
  const handleClick = (e: Event) => {
   const target = e.target as Node;
   if (ctx.open && !node.contains(target) && !ctx.contentEl?.contains(target)) {
    ctx.close();
   }
  };
  document.addEventListener('pointerdown', handleClick);
  return {
   destroy() {
    document.removeEventListener('pointerdown', handleClick);
   }
  };
 }
</script>

<div class="relative inline-block w-full" use:clickOutside>
 <button
  class={cn(
   'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
   className
  )}
  {...ctx.triggerProps}
  {...restProps}
 >
  {@render children?.()}
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
   class="h-4 w-4 opacity-50 transition-transform duration-200"
   style="transform: rotate({ctx.open ? '180deg' : '0deg'})"
  >
   <path d="m6 9 6 6 6-6" />
  </svg>
 </button>
</div>
