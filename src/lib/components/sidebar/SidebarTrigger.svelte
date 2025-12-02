<!-- SidebarTrigger.svelte -->
<script lang="ts">
 import { getContext } from 'svelte';
 import { cn } from '../../utils/index.ts';

 interface Props {
  class?: string;
  children?: import('svelte').Snippet;
 }

 let { class: className, children }: Props = $props();

 const sidebarContext = getContext<{
  toggle: () => void;
  isMobile: boolean;
  variant: 'default' | 'collapsible';
 }>('sidebar');

 function handleClick() {
  if (sidebarContext) {
   sidebarContext.toggle();
  }
 }
</script>

{#if sidebarContext}
 <button
  type="button"
  onclick={handleClick}
  class={cn(
   'inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
   className
  )}
  aria-label="Toggle sidebar"
 >
  {#if children}
   {@render children()}
  {:else}
   <!-- Ícone hamburguer padrão -->
   <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
   >
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
   </svg>
  {/if}
 </button>
{/if}
