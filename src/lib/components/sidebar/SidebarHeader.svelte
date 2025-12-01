<!-- SidebarHeader.svelte -->
<script lang="ts">
 import { getContext } from 'svelte';
 import { cn } from '../../utils/index.ts';
 import type { Snippet } from 'svelte';

 interface Props {
  children?: Snippet;
  class?: string;
  // Novas props para o modo "Icon/Logo"
  icon?: Snippet;
  label?: string;
 }

 let { children, class: className, icon, label }: Props = $props();

 // Obtém o contexto da sidebar para saber se está colapsada
 const sidebarContext = getContext<{
  isCollapsed: boolean;
  isMobile: boolean;
 }>('sidebar');

 const isCollapsed = $derived(sidebarContext?.isCollapsed && !sidebarContext?.isMobile);

 const headerClasses = $derived(
  cn(
   'flex items-center border-b p-2', // Mantemos p-2 sempre para evitar o "pulo"
   'transition-all duration-300 ease-in-out overflow-hidden', // Adiciona transição suave

   // Lógica de Layout:
   // Se tiver ícone/label (Modo Logo), comporta-se como linha.
   // Se for conteúdo genérico (children), mantém flex-col padrão, exceto se colapsado onde centralizamos.
   icon || label ? 'flex-row' : 'flex-col',

   // Animação do Gap
   isCollapsed ? 'gap-0 justify-center' : 'gap-3 justify-start',

   className
  )
 );
</script>

<div class={headerClasses}>
 {#if icon || label}
  <!-- Modo Ícone / Logo (Igual ao SidebarItem) -->
  {#if icon}
   <div class="flex size-8 shrink-0 items-center justify-center rounded-md">
    {@render icon()}
   </div>
  {/if}

  {#if label}
   <span
    class={cn(
     'font-semibold tracking-tight whitespace-nowrap transition-all duration-300 ease-in-out',
     // O segredo da transição suave do texto:
     isCollapsed ? 'w-0 max-w-0 opacity-0' : 'w-auto max-w-[200px] opacity-100'
    )}
   >
    {label}
   </span>
  {/if}
 {/if}

 <!-- Mantém compatibilidade com conteúdo customizado -->
 {#if children}
  <div
   class={cn(
    'flex w-full transition-all duration-300',
    (icon || label) && 'ml-auto', // Se misturar logo com children, empurra children
    !(icon || label) && 'flex-col space-y-2' // Comportamento original
   )}
  >
   {@render children()}
  </div>
 {/if}
</div>
