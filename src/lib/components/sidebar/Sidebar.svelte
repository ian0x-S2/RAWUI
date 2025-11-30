<!-- Sidebar.svelte -->
<script lang="ts">
 import { setContext, type Snippet } from 'svelte';
 import { cn } from '$lib/utils';

 interface Props {
  children: Snippet;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: 'left' | 'right';
  class?: string;
 }

 let {
  children,
  open = $bindable(false),
  onOpenChange,
  side = 'left',
  class: className
 }: Props = $props();

 // Context para compartilhar estado com items
 const context = {
  get open() {
   return open;
  },
  close: () => {
   open = false;
   onOpenChange?.(false);
  }
 };

 setContext('sidebar', context);

 // Controla scroll do body quando sidebar está aberta
 $effect(() => {
  if (open) {
   document.body.style.overflow = 'hidden';
  } else {
   document.body.style.overflow = '';
  }

  return () => {
   document.body.style.overflow = '';
  };
 });
</script>

<!-- Backdrop -->
{#if open}
 <button
  class="fixed inset-0 z-40 bg-black/80 lg:hidden"
  onclick={() => {
   open = false;
   onOpenChange?.(false);
  }}
  aria-label="Close sidebar"
 />
{/if}

<!-- Sidebar -->
<aside
 class={cn(
  'fixed z-50 h-full w-64 border-r bg-background transition-transform duration-300 lg:translate-x-0',
  side === 'left' ? 'left-0' : 'right-0',
  open ? 'translate-x-0' : side === 'left' ? '-translate-x-full' : 'translate-x-full',
  className
 )}
>
 <div class="flex h-full flex-col overflow-y-auto p-4">
  {@render children()}
 </div>
</aside>
