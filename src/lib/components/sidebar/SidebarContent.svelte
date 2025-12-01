<script lang="ts">
 import { getContext } from 'svelte';
 import { cn } from '../../utils/index.ts';
 import type { Snippet } from 'svelte';

 interface Props {
  children: Snippet;
  class?: string;
 }

 let { children, class: className }: Props = $props();

 const sidebarContext = getContext<{
  isCollapsed: boolean;
  isMobile: boolean;
 }>('sidebar');

 const contentClasses = $derived(
  cn(
   'flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden',
   'transition-all duration-200 ease-out',

   // Padding otimizado: menos espaço quando colapsado
   sidebarContext?.isCollapsed && !sidebarContext?.isMobile
    ? 'px-2 py-2 gap-1'
    : 'px-3 py-3 gap-2',

   className
  )
 );
</script>

<div class={contentClasses}>
 {@render children()}
</div>
