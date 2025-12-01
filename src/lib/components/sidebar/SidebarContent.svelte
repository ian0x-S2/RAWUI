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

 const sidebarContext = getContext<{
  isCollapsed: boolean;
  isMobile: boolean;
 }>('sidebar');

 const contentClasses = $derived(
  cn(
   'flex min-h-0 flex-1 flex-col gap-2 overflow-auto',
   // Transição suave do padding
   'transition-[padding] duration-300 ease-in-out',

   // Padrão: p-4 (16px). Colapsado: p-2 (8px).
   // Isso compensa a redução da sidebar
   sidebarContext?.isCollapsed && !sidebarContext?.isMobile ? 'p-2' : 'p-3',

   className
  )
 );
</script>

<div class={contentClasses}>
 {@render children()}
</div>
