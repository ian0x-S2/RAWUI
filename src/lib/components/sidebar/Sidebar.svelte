<script lang="ts">
 import { getContext, type Snippet } from 'svelte';
 import { cn } from '../../utils/index.ts';
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

 // Transição mais suave com cubic-bezier personalizado
 const transitionTiming = 'cubic-bezier(0.32, 0.72, 0, 1)';

 const widthStyle = $derived(
  open
   ? 'var(--sidebar-width)'
   : variant === 'collapsible'
     ? 'var(--sidebar-width-icon)'
     : '0px'
 );
</script>

{#if isMobile}
 {#if open}
  <button
   class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
   onclick={() => context.close()}
   aria-label="Close sidebar"
   transition:fade={{ duration: 250, easing: cubicOut }}
  ></button>

  <aside
   class={cn(
    'fixed inset-y-0 z-50 h-full w-[18rem] border-r bg-background shadow-lg',
    side === 'left' ? 'left-0' : 'right-0 border-r-0 border-l',
    className
   )}
   transition:fly={{
    x: side === 'left' ? -288 : 288,
    duration: 280,
    easing: cubicOut
   }}
  >
   <div class="flex h-full w-full flex-col overflow-hidden">
    {@render children()}
   </div>
  </aside>
 {/if}
{:else}
 <!-- DESKTOP -->
 <div
  class="relative hidden bg-transparent md:block"
  style="width: {widthStyle}; transition: width 280ms {transitionTiming};"
 ></div>

 <div
  class={cn(
   'fixed inset-y-0 z-10 hidden h-svh border-r bg-background md:flex',
   side === 'left' ? 'left-0' : 'right-0 border-r-0 border-l',
   className
  )}
  style="width: {widthStyle}; transition: width 280ms {transitionTiming};"
 >
  <div class="flex h-full w-full flex-col overflow-hidden">
   {@render children()}
  </div>
 </div>
{/if}
