<script lang="ts">
 import { toast } from './ctx.svelte.js';
 import Toast from './Toast.svelte';
 import { cn } from '$lib/utils';
 import type { ToastPosition } from './types.js';
 import { browser } from '$app/environment';

 let {
  position = 'bottom-right',
  class: className = undefined,
  ...restProps
 }: {
  position?: ToastPosition;
  class?: string;
 } = $props();

 // Mapeamento de posições (CSS classes)
 const positionClasses: Record<ToastPosition, string> = {
  'top-left': 'top-0 left-0 items-start',
  'top-center': 'top-0 left-1/2 -translate-x-1/2 items-center',
  'top-right': 'top-0 right-0 items-end',
  'bottom-left': 'bottom-0 left-0 items-start',
  'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 items-center',
  'bottom-right': 'bottom-0 right-0 items-end'
 };

 // CORREÇÃO 2: Usar $derived para manter a reatividade de 'position'
 let isTop = $derived(position.startsWith('top'));

 // Se for Top, invertemos a ordem para que os novos apareçam no topo da pilha visual
 let displayToasts = $derived(isTop ? [...toast.toasts].reverse() : toast.toasts);
</script>

{#if browser}
 <!--
   CORREÇÃO 1: Adicionado 'pointer-events-none'.
   Isso permite clicar através da área vazia do Toaster e evita que o
   'onmouseenter' dispare quando o mouse está apenas na área vazia,
   o que pausava os toasts erradamente.
 -->
 <div
  role="region"
  aria-label="Notifications"
  tabindex="-1"
  class={cn(
   'pointer-events-none fixed z-[100] flex max-h-screen w-full flex-col p-4 sm:max-w-[420px]',
   positionClasses[position],
   className
  )}
  {...restProps}
 >
  <div class="flex w-full flex-col gap-2">
   {#each displayToasts as t (t.id)}
    <Toast data={t} />
   {/each}
  </div>
 </div>
{/if}
