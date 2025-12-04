<!-- src/lib/components/ui/dialog/DialogContent.svelte -->
<script lang="ts">
 import { getContext } from 'svelte';
 import { fade } from 'svelte/transition';
 import { cubicOut } from 'svelte/easing';
 import { browser } from '$app/environment';
 import type { Attachment } from 'svelte/attachments';
 import type { TransitionConfig } from 'svelte/transition';
 import type { DialogState } from './ctx.svelte.js';
 import { cn } from '$lib/utils';
 import Portal from '$lib/components/portal/Portal.svelte';

 let { children, class: className = undefined, ...restProps } = $props();
 const root = getContext<DialogState>('dialog-root');

 const lockBodyScroll: Attachment = () => {
  if (!browser) return;
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  const originalOverflow = document.body.style.overflow;
  const originalPadding = document.body.style.paddingRight;
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = `${scrollbarWidth}px`;
  return () => {
   document.body.style.overflow = originalOverflow;
   document.body.style.paddingRight = originalPadding;
  };
 };

 const manageFocus: Attachment = (node) => {
  if (!browser) return;

  const el = node as HTMLElement;

  setTimeout(() => {
   el.focus();
  }, 10);

  const handleKeyDown = (e: KeyboardEvent) => {
   // FECHAR COM ESC
   if (e.key === 'Escape') {
    e.stopPropagation();
    root.close();
    return;
   }

   if (e.key === 'Tab') {
    const focusableEls = el.querySelectorAll(
     'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableEls.length === 0) {
     e.preventDefault();
     return;
    }

    const firstEl = focusableEls[0] as HTMLElement;
    const lastEl = focusableEls[focusableEls.length - 1] as HTMLElement;

    if (e.shiftKey) {
     if (document.activeElement === firstEl || document.activeElement === el) {
      e.preventDefault();
      lastEl.focus();
     }
    } else {
     if (document.activeElement === lastEl) {
      e.preventDefault();
      firstEl.focus();
     }
    }
   }
  };

  el.addEventListener('keydown', handleKeyDown);

  return () => {
   el.removeEventListener('keydown', handleKeyDown);
   root.triggerRef?.focus();
  };
 };

 function flyAndScale(
  node: Element,
  {
   y = 8,
   start = 0.96,
   duration = 200
  }: { y?: number; start?: number; duration?: number } = {}
 ): TransitionConfig {
  const style = getComputedStyle(node);
  const transform = style.transform === 'none' ? '' : style.transform;
  return {
   duration,
   easing: cubicOut,
   css: (t) => {
    const opacity = t;
    const scale = start + (1 - start) * t;
    const translateY = y * (1 - t);
    return `
          opacity: ${opacity};
          transform: ${transform} translate3d(0, ${translateY}px, 0) scale(${scale});
        `;
   }
  };
 }
</script>

<Portal>
 {#if root.isOpen}
  <div
   role="presentation"
   transition:fade={{ duration: 150 }}
   {@attach lockBodyScroll}
   onclick={root.close}
   class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
  ></div>

  <div
   class="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0"
  >
   <div
    role="dialog"
    id={root.baseId}
    aria-modal="true"
    aria-labelledby={root.titleId}
    aria-describedby={root.descriptionId}
    tabindex="-1"
    {@attach manageFocus}
    transition:flyAndScale={{ duration: 200 }}
    class={cn(
     'pointer-events-auto relative grid w-full max-w-lg gap-4 rounded-lg border bg-background p-6 shadow-lg outline-none md:w-full',
     className
    )}
    {...restProps}
   >
    {@render children()}

    <button
     onclick={root.close}
     class="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none"
    >
     <span class="h-4 w-4">
      <svg
       xmlns="http://www.w3.org/2000/svg"
       width="24"
       height="24"
       viewBox="0 0 24 24"
       fill="none"
       stroke="currentColor"
       stroke-width="2"
       stroke-linecap="round"
       stroke-linejoin="round"
       class="h-4 w-4"
      >
       <path d="M18 6 6 18" /><path d="m6 6 12 12" />
      </svg>
     </span>
     <span class="sr-only">Close</span>
    </button>
   </div>
  </div>
 {/if}
</Portal>
