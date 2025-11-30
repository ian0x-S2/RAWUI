<!-- SidebarItem.svelte -->
<script lang="ts">
 import { getContext } from 'svelte';
 import { cn } from '../../utils/index.ts';
 import type { Snippet } from 'svelte';

 interface Props {
  icon?: Snippet;
  label: string;
  href?: string;
  active?: boolean;
  onclick?: () => void;
  class?: string;
 }

 let { icon, label, href, active = false, onclick, class: className }: Props = $props();

 // Obtém o contexto da sidebar
 const sidebarContext = getContext<{
  isCollapsed: boolean;
  isMobile: boolean;
  close: () => void;
 }>('sidebar');

 // Classes do item
 const itemClasses = $derived(
  cn(
   'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
   'hover:bg-accent hover:text-accent-foreground',
   'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
   active && 'bg-accent text-accent-foreground',

   // Se colapsada (Desktop e fechada no modo collapsible)
   sidebarContext?.isCollapsed && [
    'justify-center px-4 gap-0', // Remove gap e centraliza
    'w-fit mx-auto' // Garante que o botão ocupe a largura da sidebar colapsada
   ],
   className
  )
 );

 // Handler para clique
 function handleClick() {
  onclick?.();

  // Se estiver no mobile e tem href, fecha a sidebar
  if (sidebarContext?.isMobile && href) {
   sidebarContext.close();
  }
 }

 // Conteúdo do item
 const showLabel = $derived(!sidebarContext?.isCollapsed || sidebarContext?.isMobile);
</script>

{#if href}
 <a
  {href}
  class={itemClasses}
  onclick={handleClick}
  title={sidebarContext?.isCollapsed && !sidebarContext?.isMobile ? label : undefined}
 >
  {#if icon}
   <span class="shrink-0">
    {@render icon()}
   </span>
  {/if}
  {#if showLabel}
   <span class="truncate">{label}</span>
  {/if}
 </a>
{:else}
 <button
  type="button"
  class={itemClasses}
  onclick={handleClick}
  title={sidebarContext?.isCollapsed && !sidebarContext?.isMobile ? label : undefined}
 >
  {#if icon}
   <span class="shrink-0">
    {@render icon()}
   </span>
  {/if}
  {#if showLabel}
   <span class="truncate">{label}</span>
  {/if}
 </button>
{/if}
