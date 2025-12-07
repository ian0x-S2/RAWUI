<script lang="ts">
 import type { Snippet } from 'svelte';
 import type { HTMLAttributes } from 'svelte/elements';
 import { cn } from '$lib/utils';
 import { getSidebarContext } from './ctx.svelte.js';

 interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: Snippet;
  class?: string;
  icon?: Snippet;
  label?: string;
 }

 let { children, class: className, icon, label, ...restProps }: Props = $props();

 const ctx = getSidebarContext();
</script>

<div
 class={cn(
  'flex w-full shrink-0 items-center border-b p-3',
  'transition-[gap,justify-content,padding] duration-200 ease-out',
  ctx.isCollapsed ? 'justify-center gap-0' : 'justify-start gap-3',
  className
 )}
 data-sidebar="header"
 {...restProps}
>
 {#if icon || label}
  {#if icon}
   <div
    class={cn(
     'flex size-6 shrink-0 items-center justify-center',
     'transition-[margin] duration-200 ease-out',
     ctx.isCollapsed ? 'mr-0' : 'mr-0'
    )}
   >
    {@render icon()}
   </div>
  {/if}

  {#if label}
   <span
    class={cn(
     'truncate font-semibold',
     'transition-[width,opacity] duration-200 ease-out',
     ctx.isCollapsed ? 'w-0 overflow-hidden opacity-0' : 'w-auto opacity-100'
    )}
   >
    {label}
   </span>
  {/if}
 {/if}

 {#if children}
  <div
   class={cn(
    'flex',
    'transition-[width,opacity,margin] duration-200 ease-out',
    ctx.isCollapsed ? 'w-0 overflow-hidden opacity-0' : 'ml-auto w-auto opacity-100'
   )}
  >
   {@render children()}
  </div>
 {/if}
</div>
