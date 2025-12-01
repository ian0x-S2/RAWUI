<script lang="ts">
 import { getContext } from 'svelte';
 import { cn } from '../../utils/index.ts';
 import type { Snippet } from 'svelte';

 interface Props {
  children?: Snippet;
  class?: string;
  icon?: Snippet;
  label?: string;
 }

 let { children, class: className, icon, label }: Props = $props();

 const sidebarContext = getContext<{
  isCollapsed: boolean;
  isMobile: boolean;
 }>('sidebar');

 const isCollapsed = $derived(sidebarContext?.isCollapsed && !sidebarContext?.isMobile);

 const footerClasses = $derived(
  cn(
   'flex w-full items-center border-t mt-auto shrink-0',
   'transition-all duration-200 ease-out',

   // Padding e layout responsivos
   isCollapsed ? 'p-3 justify-center' : 'p-3 justify-start',
   isCollapsed ? 'gap-0' : 'gap-3',

   className
  )
 );
</script>

<div class={footerClasses}>
 {#if icon || label}
  {#if icon}
   <div class="flex size-8 shrink-0 items-center justify-center rounded-lg">
    {@render icon()}
   </div>
  {/if}

  {#if label}
   <span
    class={cn(
     'truncate text-sm font-semibold',
     'transition-all duration-200 ease-out',
     isCollapsed ? 'w-0 overflow-hidden opacity-0' : 'w-auto opacity-100'
    )}
   >
    {label}
   </span>
  {/if}
 {/if}

 {#if children}
  <div
   class={cn(
    'flex transition-all duration-200 ease-out',
    isCollapsed ? 'w-0 overflow-hidden opacity-0' : 'ml-auto w-auto opacity-100'
   )}
  >
   {@render children()}
  </div>
 {/if}
</div>
