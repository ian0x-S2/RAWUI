<!-- SidebarHeader.svelte -->
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

 const headerClasses = $derived(
  cn(
   'flex flex-col space-y-2 p-2 border-b',
   // Se colapsada no desktop, reduz padding lateral
   sidebarContext?.isCollapsed && !sidebarContext?.isMobile && 'px-0',
   className
  )
 );
</script>

<div class={headerClasses}>
 {@render children()}
</div>
