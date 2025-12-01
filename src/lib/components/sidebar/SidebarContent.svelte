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
   // AJUSTE 6: ease-linear + gap fixo
   'transition-all duration-200 ease-linear',

   // AJUSTE 7: gap-2 sempre (mais consistente)
   sidebarContext?.isCollapsed && !sidebarContext?.isMobile
    ? 'px-2 py-2 gap-2'
    : 'px-3 py-3 gap-2',

   className
  )
 );
</script>

<div class={contentClasses}>
 {@render children()}
</div>
