<script lang="ts">
 import { getContext, type Snippet } from 'svelte';
 import { cn } from '../../utils/index.ts';

 interface Props {
  children: Snippet;
  class?: string;
 }

 let { children, class: className }: Props = $props();

 const context = getContext<{
  open: boolean;
  isMobile: boolean;
  variant: 'default' | 'collapsible';
 }>('sidebar');

 const offsetClass = $derived.by(() => {
  if (!context) return '';
  if (context.isMobile) return '';

  if (context.variant === 'default') {
   return 'md:ml-64';
  }

  if (context.variant === 'collapsible') {
   return context.open ? 'md:ml-64' : 'md:ml-16';
  }

  return '';
 });
</script>

<main
 class={cn(
  'flex flex-1 flex-col transition-all duration-300 ease-in-out',
  offsetClass,
  className
 )}
>
 {@render children()}
</main>
