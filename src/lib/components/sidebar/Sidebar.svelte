<!-- Sidebar.svelte -->
<script lang="ts">
 import { getContext, type Snippet } from 'svelte';
 import { cn } from '../../utils/index.ts';
 // IMPORTANTE: Importamos as transições nativas do Svelte
 import { fade, fly } from 'svelte/transition';
 import { cubicOut } from 'svelte/easing';

 interface Props {
  children: Snippet;
  side?: 'left' | 'right';
  class?: string;
 }

 let { children, side = 'left', class: className }: Props = $props();

 const context = getContext<{
  open: boolean;
  isMobile: boolean;
  variant: 'default' | 'collapsible';
  close: () => void;
 }>('sidebar');

 const { open, isMobile, variant } = $derived(context);

 const widthStyle = $derived(
  open
   ? 'var(--sidebar-width)'
   : variant === 'collapsible'
     ? 'var(--sidebar-width-icon)'
     : '0px'
 );
</script>

{#if isMobile}
 <!-- ================================================= -->
 <!-- MOBILE IMPLEMENTATION (Com Animações Svelte)      -->
 <!-- ================================================= -->
 {#if open}
  <!-- Overlay com Fade Suave -->
  <button
   class="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden"
   onclick={() => context.close()}
   aria-label="Close sidebar"
   transition:fade={{ duration: 200 }}
  ></button>

  <!--
    Drawer com Fly (Deslizar)
    1. Mudamos w-[--sidebar-width] para w-[18rem] (maior no mobile)
    2. Usamos transition:fly para animar entrada e saída do DOM
  -->
  <aside
   class={cn(
    'fixed inset-y-0 z-50 h-full w-[18rem] border-r bg-background shadow-2xl',
    side === 'left' ? 'left-0' : 'right-0 border-r-0 border-l',
    className
   )}
   transition:fly={{
    x: side === 'left' ? -288 : 288, // Desliza 288px (18rem)
    duration: 300,
    easing: cubicOut
   }}
  >
   <div class="flex h-full w-full flex-col overflow-hidden">
    {@render children()}
   </div>
  </aside>
 {/if}
{:else}
 <!-- ================================================= -->
 <!-- DESKTOP IMPLEMENTATION (Ghost Gap)                -->
 <!-- ================================================= -->
 <div
  class="relative hidden bg-transparent transition-[width] duration-300 ease-linear md:block"
  style="width: {widthStyle}"
 >
  <div
   class={cn(
    'fixed inset-y-0 z-10 hidden h-svh border-r bg-background transition-[width] duration-300 ease-linear md:flex',
    side === 'left' ? 'left-0' : 'right-0 border-r-0 border-l',
    className
   )}
   style="width: {widthStyle}"
  >
   <div class="flex h-full w-full flex-col overflow-hidden">
    {@render children()}
   </div>
  </div>
 </div>
{/if}
