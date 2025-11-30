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
   'fixed z-50 h-full border-r bg-background transition-all duration-300',
   side === 'left' ? 'left-0' : 'right-0',

   // --- Lógica Mobile ---
   isMobile && [
    'w-64',
    open ? 'translate-x-0' : side === 'left' ? '-translate-x-full' : 'translate-x-full'
   ],

   // --- Lógica Desktop ---
   !isMobile && [
    // Previne glitch de carregamento (assume estado inicial 'aberto' se for desktop padrão)
    // Mas permite fechar dinamicamente

    // Variant: Default (Pode abrir/fechar completamente)
    variant === 'default' && [
     open ? 'w-64 translate-x-0' : 'w-0 -translate-x-full border-none overflow-hidden' // Esconde e remove largura
    ],

    // Variant: Collapsible (Alterna entre largo e ícone)
    variant === 'collapsible' && [
     'translate-x-0', // Sempre visível em posição
     open ? 'w-64' : 'w-16'
    ]
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
 <div class="flex h-full flex-col overflow-x-hidden overflow-y-auto">
  {@render children()}
 </div>
</aside>
