<!-- SidebarGroupLabel.svelte -->
<script lang="ts">
 import { getContext } from 'svelte';
 import { cn } from '$lib/utils';
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

 // Se estiver colapsada no desktop, não mostra o label
 const shouldShow = $derived(!sidebarContext?.isCollapsed || sidebarContext?.isMobile);

 const labelClasses = $derived(
  cn(
   'px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide',
   className
  )
 );
</script>

{#if shouldShow}
 <div class={labelClasses}>
  {@render children()}
 </div>
{/if}
