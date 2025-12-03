<!-- src/lib/components/ui/dialog/DialogContent.svelte -->
<script lang="ts">
 import { getContext } from 'svelte';
 import { fade, fly } from 'svelte/transition';
 import { cubicOut } from 'svelte/easing';
 import type { DialogState } from './ctx.svelte.js';
 import { cn } from '$lib/utils';
 import Portal from '$lib/components/portal/Portal.svelte';

 let { children, class: className = undefined, ...restProps } = $props();
 const root = getContext<DialogState>('dialog-root');

 $effect(() => {
  if (root.isOpen) {
   document.body.style.overflow = 'hidden';
   document.body.style.paddingRight = 'var(--scrollbar-width, 0px)';
  } else {
   document.body.style.overflow = '';
   document.body.style.paddingRight = '';
  }
  return () => {
   document.body.style.overflow = '';
   document.body.style.paddingRight = '';
  };
 });

 function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') root.close();
 }

 function contentRef(node: HTMLElement) {
  node.focus();
 }
</script>

<svelte:window onkeydown={handleKeydown} />

<Portal>
 {#if root.isOpen}
  <!-- Overlay / Backdrop -->
  <div
   role="presentation"
   transition:fade={{ duration: 150 }}
   onclick={root.close}
   class="fixed inset-0 z-50 bg-black/80 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0"
  ></div>

  <!-- Content Wrapper -->
  <div class="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
   <!-- Modal Box -->
   <div
    use:contentRef
    role="dialog"
    id={root.baseId}
    aria-modal="true"
    aria-labelledby={root.titleId}
    aria-describedby={root.descriptionId}
    tabindex="-1"
    transition:fly={{ duration: 200, y: 3, opacity: 0, easing: cubicOut }}
    class={cn(
     'pointer-events-auto relative grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg sm:rounded-lg md:w-full',
     className
    )}
    {...restProps}
   >
    {@render children()}

    <button
     onclick={root.close}
     class="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
    >
     <span class="h-4 w-4">X</span>
     <span class="sr-only">Close</span>
    </button>
   </div>
  </div>
 {/if}
</Portal>
