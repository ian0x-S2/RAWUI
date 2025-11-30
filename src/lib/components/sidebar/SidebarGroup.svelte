<!-- SidebarGroup.svelte -->
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

 const groupClasses = $derived(cn('space-y-1', className));
</script>

<div class={groupClasses}>
 {@render children()}
</div>
