<!-- Sidebar.svelte -->
<script lang="ts">
 import { getContext, type Snippet, onMount } from 'svelte';
 import { cn } from '../../utils/index.ts';

 interface Props {
  children: Snippet;
  side?: 'left' | 'right';
  class?: string;
 }

 let { children, side = 'left', class: className }: Props = $props();

 let mounted = $state(false);
 onMount(() => {
  mounted = true;
 });

 const context = getContext<{
  open: boolean;
  isMobile: boolean;
  variant: 'default' | 'collapsible';
  isCollapsed: boolean;
  close: () => void;
 }>('sidebar');

 if (!context) throw new Error('Sidebar must be used within a SidebarProvider');

 const { open, isMobile, variant } = $derived(context);

 const sidebarClasses = $derived(
  cn(
   'fixed z-50 flex h-full flex-col border-r bg-sidebar-background',
   // A curva de animação do Shadcn geralmente é linear ou ease-in-out suave
   // Adicionamos "will-change-transform" para performance
   mounted && 'transition-[width,transform] duration-300 ease-in-out',

   side === 'left' ? 'left-0 border-r' : 'right-0 border-l',

   // Mobile
   isMobile && [
    'w-[16rem]', // 256px
    open ? 'translate-x-0' : side === 'left' ? '-translate-x-full' : 'translate-x-full'
   ],

   // Desktop
   !isMobile && [
    'translate-x-0',
    variant === 'default' && [open ? 'w-[16rem]' : 'w-0 border-none overflow-hidden'],
    // Collapsed: w-[16rem] -> w-[3rem] (48px)
    // 48px é o padrão ideal para ícones centralizados (16px padding + 16px icon + 16px padding)
    variant === 'collapsible' && [open ? 'w-[16rem]' : 'w-[3rem]']
   ],
   className
  )
 );
</script>

{#if isMobile && open}
 <button
  class="fixed inset-0 z-40 bg-black/80 md:hidden"
  onclick={() => context.close()}
  aria-label="Close sidebar"
 ></button>
{/if}

<!--
  data-state e data-collapsed ajudam a estilizar se você usar CSS global,
  mas aqui garantem que o overflow funcione
-->
<aside
 class={sidebarClasses}
 data-state={open ? 'expanded' : 'collapsed'}
 data-collapsed={!isMobile && !open && variant === 'collapsible'}
>
 <div class="flex h-full w-full flex-col overflow-hidden">
  {@render children()}
 </div>
</aside>
