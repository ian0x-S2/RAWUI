<!-- SidebarContent.svelte -->
<script lang="ts">
 import { getContext } from 'svelte';
 import { cn } from '../../utils/index.ts';
 import type { Snippet } from 'svelte';

 interface Props {
  children: Snippet;
  class?: string;
 }

 let { children, class: className }: Props = $props();

 // Obtém o contexto da sidebar para saber se está colapsada
 const sidebarContext = getContext<{
  isCollapsed: boolean;
  isMobile: boolean;
 }>('sidebar');

 const contentClasses = $derived(
  cn(
   'flex-1 overflow-y-auto p-4',
   // Se colapsada no desktop, reduz padding lateral
   sidebarContext?.isCollapsed && !sidebarContext?.isMobile && 'px-2',
   className
  )
 );
</script>

<div class={contentClasses}>
 {@render children()}
</div>
