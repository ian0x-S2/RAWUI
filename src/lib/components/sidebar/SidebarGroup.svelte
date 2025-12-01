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

 const groupClasses = $derived(
  cn(
   'flex flex-col transition-all duration-200 ease-out',
   sidebarContext?.isCollapsed && !sidebarContext?.isMobile ? 'gap-1' : 'gap-1',
   className
  )
 );
</script>

<div class={groupClasses}>
 {@render children()}
</div>
