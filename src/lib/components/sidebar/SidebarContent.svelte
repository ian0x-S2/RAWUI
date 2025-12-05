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
  'flex min-h-0 flex-1 flex-col gap-2 overflow-x-hidden overflow-y-auto',
  'transition-[padding] duration-200 ease-out',
  ctx.isCollapsed ? 'px-2 py-2' : 'px-2 py-3',
  className
 )}
 data-sidebar="content"
 {...restProps}
>
 {@render children()}
</div>
