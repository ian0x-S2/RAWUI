<!-- Sidebar.svelte -->
<script lang="ts">
 import { getContext, type Snippet } from 'svelte';
 import { cn } from '../../utils/index.ts';

 interface Props {
  children: Snippet;
  side?: 'left' | 'right';
  class?: string;
 }

 let { children, side = 'left', class: className }: Props = $props();

 // Obtém o contexto do Provider
 const context = getContext<{
  open: boolean;
  isMobile: boolean;
  variant: 'default' | 'collapsible';
  isCollapsed: boolean;
  close: () => void;
  toggle: () => void;
 }>('sidebar');

 if (!context) {
  throw new Error('Sidebar must be used within a SidebarProvider');
 }

 const { open, isMobile, variant } = $derived(context);

 // Computed para classes da sidebar
 const sidebarClasses = $derived(
  cn(
   'fixed z-50 h-full border-r bg-background transition-all duration-300',
   side === 'left' ? 'left-0' : 'right-0',
   // Mobile behavior (drawer)
   isMobile && [
    'w-64',
    open ? 'translate-x-0' : side === 'left' ? '-translate-x-full' : 'translate-x-full'
   ],
   // Desktop behavior
   !isMobile && [
    variant === 'default' && 'w-64 translate-x-0',
    variant === 'collapsible' && [open ? 'w-64' : 'w-16', 'translate-x-0']
   ],
   className
  )
 );
</script>

<!-- Backdrop para mobile -->
{#if isMobile && open}
 <button
  class="fixed inset-0 z-40 bg-black/80 md:hidden"
  onclick={() => context.close()}
  aria-label="Close sidebar"
 ></button>
{/if}

<!-- Sidebar -->
<aside class={sidebarClasses}>
 <div class="flex h-full flex-col overflow-y-auto">
  {@render children()}
 </div>
</aside>
