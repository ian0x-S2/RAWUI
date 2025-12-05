<script lang="ts">
 import type { Snippet } from 'svelte';
 import type { HTMLAttributes } from 'svelte/elements';
 import { cn } from '$lib/utils';
 import { getSidebarContext } from './ctx.svelte.js';

 interface Props extends HTMLAttributes<HTMLDivElement> {
  children: Snippet;
  class?: string;
 }

 let { children, class: className, ...restProps }: Props = $props();

 const ctx = getSidebarContext();
</script>

<div
 class={cn(
  'flex items-center px-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase',
  'transition-[max-height,padding,opacity] duration-200 ease-out',
  ctx.isCollapsed
   ? 'max-h-0 overflow-hidden py-0 opacity-0'
   : 'max-h-8 py-1.5 opacity-100',
  className
 )}
 data-sidebar="group-label"
 {...restProps}
>
 <div class="overflow-hidden whitespace-nowrap">
  {@render children()}
 </div>
</div>
