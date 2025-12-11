<script lang="ts">
 import { onMount, onDestroy } from 'svelte';
 import { fly, fade } from 'svelte/transition';
 import { toast } from './ctx.svelte.js';
 import { ToastTimer } from './ctx.svelte.js';
 import type { ToastData } from './types.js';
 import { cn } from '$lib/utils';
 import { browser } from '$app/environment';

 let { data }: { data: ToastData } = $props();

 let timer: ToastTimer | undefined;
 let isHovering = $state(false);

 // Usamos um $effect para reagir a mudanças no `data` do toast.
 // Isso corrige o problema de `toast.promise` onde o tipo e a duração mudam.
 $effect(() => {
  if (!browser) return;

  // Se o timer já existe, limpa antes de criar um novo
  timer?.clear();

  // Cria um novo timer se o toast deve fechar automaticamente
  if (data.type !== 'loading' && data.duration !== Infinity) {
   timer = new ToastTimer(data.duration, () => toast.dismiss(data.id));
   if (!toast.isPaused && !isHovering) {
    timer.start();
   }
  }
 });

 // Este efeito é dedicado apenas a pausar e retomar o timer.
 // Ele reage ao hover do mouse e ao estado de pausa global.
 $effect(() => {
  if (!timer) return;
  if (toast.isPaused || isHovering) {
   timer.pause();
  } else {
   timer.resume();
  }
 });

 onMount(() => {
  data.onStatusChange?.('visible');
 });

 onDestroy(() => {
  timer?.clear();
  data.onStatusChange?.('unmounted');
 });

 const styles = {
  default: 'border-border bg-background text-foreground',
  success: 'border-border bg-background text-foreground',
  error:
   'group destructive border-destructive bg-destructive text-destructive-foreground',
  warning: 'border-border bg-background text-foreground',
  info: 'border-border bg-background text-foreground',
  loading: 'border-border bg-background text-foreground'
 };
</script>

<div
 role="status"
 aria-live={data.type === 'error' ? 'assertive' : 'polite'}
 aria-atomic="true"
 data-state="open"
 data-type={data.type}
 class={cn(
  // pointer-events-auto é crucial aqui porque o pai tem pointer-events-none
  'group pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-md border p-4 pr-8 shadow-lg transition-all',
  styles[data.type] || styles.default
 )}
 onmouseenter={() => (isHovering = true)}
 onmouseleave={() => (isHovering = false)}
 in:fly={{ y: 20, x: 0, duration: 300 }}
 out:fade={{ duration: 200 }}
>
 <!-- Conteúdo do Toast (mesmo do seu arquivo) -->
 <div class="shrink-0 pt-0.5">
  {#if data.icon}
   {@render data.icon()}
  {:else if data.type === 'loading'}
   <svg
    class="h-4 w-4 animate-spin"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
   >
    <circle
     class="opacity-25"
     cx="12"
     cy="12"
     r="10"
     stroke="currentColor"
     stroke-width="4"
    ></circle>
    <path
     class="opacity-75"
     fill="currentColor"
     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
   </svg>
  {:else if data.type === 'success'}
   <svg
    class="h-4 w-4 text-green-500"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    ><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg
   >
  {:else if data.type === 'error'}
   <svg
    class="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    ><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg
   >
  {:else if data.type === 'warning'}
   <svg
    class="h-4 w-4 text-yellow-500"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    ><path
     d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"
    /><path d="M12 9v4" /><path d="M12 17h.01" /></svg
   >
  {:else if data.type === 'info'}
   <svg
    class="h-4 w-4 text-blue-500"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    ><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg
   >
  {/if}
 </div>

 <div class="flex-1 space-y-1">
  {#if data.title}
   <div class="text-sm leading-none font-semibold tracking-tight">{data.title}</div>
  {/if}
  {#if data.description}
   <div
    class="group-[.destructive]:text-destructive-foreground/90 text-sm leading-relaxed text-muted-foreground opacity-90"
   >
    {data.description}
   </div>
  {/if}
  {#if data.component}
   <div class="mt-2">
    {@render data.component()}
   </div>
  {/if}

  {#if data.action || data.cancel}
   <div class="flex items-center gap-2 pt-2">
    {#if data.action}
     <button
      class="group-[.destructive]:hover:text-destructive-foreground inline-flex h-7 items-center justify-center rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors group-[.destructive]:border-destructive/30 hover:bg-accent hover:text-accent-foreground group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive/10 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
      onclick={data.action.onClick}
     >
      {data.action.label}
     </button>
    {/if}
    {#if data.cancel}
     <button
      class="group-[.destructive]:hover:text-destructive-foreground inline-flex h-7 items-center justify-center rounded-md bg-transparent px-3 text-xs font-medium transition-colors hover:bg-muted group-[.destructive]:hover:bg-destructive/10 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
      onclick={data.cancel.onClick}
     >
      {data.cancel.label}
     </button>
    {/if}
   </div>
  {/if}
 </div>

 {#if data.dismissible}
  <button
   type="button"
   class="group-[.destructive]:text-destructive-foreground group-[.destructive]:hover:text-destructive-foreground absolute top-1 right-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground focus:opacity-100 focus:ring-1 focus:outline-none group-[.destructive]:focus:ring-destructive group-[.destructive]:focus:ring-offset-destructive"
   onclick={() => toast.dismiss(data.id)}
   aria-label="Close"
  >
   <svg
    class="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
   >
  </button>
 {/if}
</div>
