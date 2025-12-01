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

 const sidebarClasses = $derived(
  cn(
   // BASE:
   'fixed z-50 flex h-full flex-col border-r bg-background transition-all duration-300 ease-in-out',

   side === 'left' ? 'left-0' : 'right-0 border-l border-r-0',

   // MOBILE:
   isMobile && [
    'w-[16rem]', // 256px
    open ? 'translate-x-0' : side === 'left' ? '-translate-x-full' : 'translate-x-full'
   ],

   // DESKTOP:
   !isMobile && [
    // Essa lógica de translate via CSS (md:) ajuda a evitar o glitch inicial
    side === 'left'
     ? '-translate-x-full md:translate-x-0'
     : 'translate-x-full md:translate-x-0',

    // Variante Default
    variant === 'default' && [open ? 'w-[16rem]' : 'w-0 border-none overflow-hidden'],

    // Variante Collapsible (Modo Ícone)
    // AQUI ESTÁ A MUDANÇA: w-16 -> w-[4-3rem] (48px)
    // 48px é ideal para centralizar ícones sem sobrar muito espaço
    variant === 'collapsible' && [open ? 'w-[16rem]' : 'w-[4rem]']
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
<aside
 class={sidebarClasses}
 data-state={open ? 'expanded' : 'collapsed'}
 data-collapsed={!isMobile && !open && variant === 'collapsible'}
>
 <!-- overflow-hidden é importante para o texto não vazar durante a animação -->
 <div class="flex h-full w-full flex-col overflow-hidden">
  {@render children()}
 </div>
</aside>
