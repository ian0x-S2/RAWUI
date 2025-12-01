<script lang="ts">
 import { getContext } from 'svelte';
 import { cn } from '../../utils/index.ts';
 import type { Snippet } from 'svelte';

 interface Props {
  children?: Snippet;
  class?: string;
  icon?: Snippet;
  label?: string;
 }

 let { children, class: className, icon, label }: Props = $props();

 // Obtém o contexto da sidebar para saber se está colapsada
 const sidebarContext = getContext<{
  isCollapsed: boolean;
  isMobile: boolean;
 }>('sidebar');

 // Define se está colapsado (apenas desktop)
 const isCollapsed = $derived(sidebarContext?.isCollapsed && !sidebarContext?.isMobile);

 const footerClasses = $derived(
  cn(
   // Base layout: mt-auto para ficar no fundo, border-t
   'flex items-center mt-auto border-t p-2',
   'transition-all duration-200 ease-linear overflow-hidden',

   // Se tiver icon/label, força linha. Se não, usa coluna (padrão container genérico)
   icon || label ? 'flex-row' : 'flex-col',

   // Lógica de colapso:
   // Colapsado: gap-0 e centralizado (modo ícone)
   // Expandido: gap-2 e alinhado à esquerda
   isCollapsed ? 'gap-0 justify-center px-0' : 'gap-2 justify-start',

   className
  )
 );
</script>

<div class={footerClasses}>
 {#if icon || label}
  {#if icon}
   <div class="flex aspect-square size-8 shrink-0 items-center justify-center rounded-md">
    {@render icon()}
   </div>
  {/if}

  {#if label}
   <span
    class={cn(
     'truncate font-semibold transition-all duration-200 ease-linear',
     // Esconde o texto suavemente quando colapsado
     isCollapsed ? 'w-0 opacity-0' : 'ml-1 w-auto opacity-100'
    )}
   >
    {label}
   </span>
  {/if}
 {/if}

 {#if children}
  <div class={cn('flex w-full', (icon || label) && 'ml-auto')}>
   {@render children()}
  </div>
 {/if}
</div>
