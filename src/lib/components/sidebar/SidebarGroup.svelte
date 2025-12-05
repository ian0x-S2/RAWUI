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
  'flex flex-col gap-1',
  'transition-[gap] duration-200 ease-out',
  ctx.isCollapsed && 'gap-0.5',
  className
 )}
 data-sidebar="group"
 {...restProps}
>
 {@render children()}
</div>
