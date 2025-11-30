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

 const sidebarContext = getContext<{
  isCollapsed: boolean;
  isMobile: boolean;
  close: () => void;
 }>('sidebar');

 const isCollapsed = $derived(sidebarContext?.isCollapsed && !sidebarContext?.isMobile);

 // Classes do container do item
 const itemClasses = $derived(
  cn(
   // BASE:
   'group relative flex w-full items-center rounded-md border border-transparent p-2 text-sm font-medium transition-all duration-200 ease-in-out outline-none ring-sidebar-ring',
   'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
   'active:bg-sidebar-accent active:text-sidebar-accent-foreground',
   'disabled:pointer-events-none disabled:opacity-50',
   'aria-disabled:pointer-events-none aria-disabled:opacity-50',
   // ESTADOS:
   active && 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold',

   // AQUI ESTÁ O SEGREDO DO SHADCN:
   // Animamos o GAP.
   // Expandido: gap-2 (ou gap-3).
   // Colapsado: gap-0 (o texto cola no ícone, mas como o texto tem width 0, ele some).
   isCollapsed ? 'gap-0 justify-center' : 'gap-3 justify-start',

   className
  )
 );

 function handleClick() {
  onclick?.();
  if (sidebarContext?.isMobile && href) {
   sidebarContext.close();
  }
 }
</script>

{#snippet ItemContent()}
 {#if icon}
  <!-- O ícone mantém tamanho fixo (size-4 = 16px) e nunca encolhe (shrink-0) -->
  <span class="flex size-4 shrink-0 items-center justify-center">
   {@render icon()}
  </span>
 {/if}

 <span
  class={cn(
   'overflow-hidden whitespace-nowrap transition-all duration-200 ease-in-out',
   // Transição suave do texto
   isCollapsed
    ? 'max-w-0 opacity-0' // Texto some completamente
    : 'max-w-[200px] opacity-100' // Texto aparece
  )}
 >
  {label}
 </span>
{/snippet}

{#if href}
 <a
  {href}
  class={itemClasses}
  onclick={handleClick}
  title={isCollapsed ? label : undefined}
 >
  {@render ItemContent()}
 </a>
{:else}
 <button
  type="button"
  class={itemClasses}
  onclick={handleClick}
  title={isCollapsed ? label : undefined}
 >
  {@render ItemContent()}
 </button>
{/if}
