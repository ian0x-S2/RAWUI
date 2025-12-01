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

 const isCollapsed = $derived(sidebarContext?.isCollapsed && !sidebarContext?.isMobile);

 const labelClasses = $derived(
  cn(
   'flex items-center text-xs font-semibold text-muted-foreground uppercase tracking-wide  ease-in-out',
   // Animação de altura e padding para esconder suavemente
   isCollapsed ? 'h-0 py-0  opacity-0 overflow-hidden' : 'h-8 px-2 py-1.5 opacity-100 ',
   className
  )
 );
</script>

<div class={labelClasses}>
 <div class="overflow-hidden whitespace-nowrap">
  {@render children()}
 </div>
</div>
