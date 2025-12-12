<script lang="ts">
 import { onMount, onDestroy, type Snippet } from 'svelte';
 import { fly, fade, scale } from 'svelte/transition';
 import { toast as globalToast } from './ctx.svelte.js';
 import { ToastTimer } from './ctx.svelte.js';
 import type { ToastData, ToastOptions } from './types.js';
 import type { ToastState } from './ctx.svelte.js';
 import type { ToastPosition } from './types.js';
 import { cn } from '$lib/utils';
 import { browser } from '$app/environment';

 let {
  data,
  toastState = globalToast,
  position = 'bottom-right'
 }: {
  data: ToastData;
  toastState?: ToastState;
  position?: ToastPosition;
 } = $props();

 let timer: ToastTimer | undefined;
 let isHovering = $state(false);

 // Determinar direção da animação baseada na posição
 const animationConfig = $derived.by(() => {
  const [vertical, horizontal] = position.split('-');

  let inX = 0;
  let inY = 0;
  let outX = 0;
  let outY = 0;

  // Animação de entrada e saída baseada na posição horizontal
  if (horizontal === 'left') {
   inX = -100; // Entra da esquerda
   outX = -100; // Sai para esquerda
  } else if (horizontal === 'right') {
   inX = 100; // Entra da direita
   outX = 100; // Sai para direita
  } else if (horizontal === 'center') {
   // Para center, anima verticalmente
   if (vertical === 'top') {
    inY = -100;
    outY = -100;
   } else {
    inY = 100;
    outY = 100;
   }
  }

  return {
   in: { x: inX, y: inY },
   out: { x: outX, y: outY }
  };
 });

 function startTimer(duration: number) {
  if (!browser) return;
  timer?.clear();
  if (duration !== Infinity) {
   timer = new ToastTimer(duration, () => toastState.dismiss(data.id));
   if (!toastState.isPaused && !isHovering) {
    timer.start();
   }
  }
 }

 $effect(() => {
  if (!data.promise && data.type !== 'loading' && data.duration !== Infinity) {
   startTimer(data.duration);
  }
 });

 // Pause/Resume logic
 $effect(() => {
  if (!timer) return;
  if (toastState.isPaused || isHovering) {
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

 function resolveOptions(opts: any, result?: any): ToastOptions {
  const resolved = typeof opts === 'function' ? opts(result) : opts;
  return typeof resolved === 'string' ? { title: resolved } : resolved;
 }

 function triggerDismiss(node: HTMLElement) {
  startTimer(3000);
 }
</script>

{#snippet content(tData: ToastOptions, type: string)}
 <div class="shrink-0 pt-0.5">
  {#if tData.icon}
   {@render tData.icon()}
  {:else}
   <!-- Icons... -->
   {#if type === 'loading'}
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
   {:else if type === 'success'}
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
   {:else if type === 'error'}
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
   {:else if type === 'warning'}
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
   {:else if type === 'info'}
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
  {/if}
 </div>

 <div class="flex-1 space-y-1">
  {#if tData.title}
   <div class="text-sm leading-none font-semibold tracking-tight">{tData.title}</div>
  {/if}
  {#if tData.description}
   <div
    class="group-[.destructive]:text-destructive-foreground/90 text-sm leading-relaxed text-muted-foreground opacity-90"
   >
    {tData.description}
   </div>
  {/if}
  {#if tData.component}
   <div class="mt-2">
    {@render tData.component()}
   </div>
  {/if}

  {#if tData.action || tData.cancel}
   <div class="flex items-center gap-2 pt-2">
    {#if tData.action}
     <button
      class="group-[.destructive]:hover:text-destructive-foreground inline-flex h-7 items-center justify-center rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors group-[.destructive]:border-destructive/30 hover:bg-accent hover:text-accent-foreground group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive/10 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
      onclick={tData.action.onClick}
     >
      {tData.action.label}
     </button>
    {/if}
    {#if tData.cancel}
     <button
      class="group-[.destructive]:hover:text-destructive-foreground inline-flex h-7 items-center justify-center rounded-md bg-transparent px-3 text-xs font-medium transition-colors hover:bg-muted group-[.destructive]:hover:bg-destructive/10 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
      onclick={tData.cancel.onClick}
     >
      {tData.cancel.label}
     </button>
    {/if}
   </div>
  {/if}
 </div>

 {#if tData.dismissible ?? true}
  <button
   type="button"
   class="group-[.destructive]:text-destructive-foreground group-[.destructive]:hover:text-destructive-foreground absolute top-1 right-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground focus:opacity-100 focus:ring-1 focus:outline-none group-[.destructive]:focus:ring-destructive group-[.destructive]:focus:ring-offset-destructive"
   onclick={() => toastState.dismiss(data.id)}
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
{/snippet}

{#if data.promise && data.promiseData}
 {#await data.promise}
  <!-- PENDING -->
  {#key 'loading'}
   <div
    role="status"
    aria-live="polite"
    aria-atomic="true"
    data-state="open"
    data-type="loading"
    class={cn(
     'group pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-md border p-4 pr-8 shadow-lg transition-all',
     styles.loading
    )}
    onmouseenter={() => (isHovering = true)}
    onmouseleave={() => (isHovering = false)}
    in:fly|global={{ ...animationConfig.in, duration: 300 }}
    out:scale|global={{ start: 0.95, opacity: 0, duration: 150 }}
   >
    {@render content(resolveOptions(data.promiseData.loading), 'loading')}
   </div>
  {/key}
 {:then result}
  {@const successOpts = resolveOptions(data.promiseData.success, result)}
  {#key 'success'}
   <div
    {@attach triggerDismiss}
    role="status"
    aria-live="polite"
    aria-atomic="true"
    data-state="open"
    data-type="success"
    class={cn(
     'group pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-md border p-4 pr-8 shadow-lg transition-all',
     styles.success
    )}
    onmouseenter={() => (isHovering = true)}
    onmouseleave={() => (isHovering = false)}
    in:scale|global={{ start: 0.8, opacity: 0, duration: 300 }}
    out:fly|global={{ ...animationConfig.out, duration: 200 }}
   >
    {@render content(successOpts, 'success')}
   </div>
  {/key}
 {:catch error}
  {@const errorOpts = resolveOptions(data.promiseData.error, error)}
  {#key 'error'}
   <div
    {@attach triggerDismiss}
    role="status"
    aria-live="assertive"
    aria-atomic="true"
    data-state="open"
    data-type="error"
    class={cn(
     'group pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-md border p-4 pr-8 shadow-lg transition-all',
     styles.error
    )}
    onmouseenter={() => (isHovering = true)}
    onmouseleave={() => (isHovering = false)}
    in:scale|global={{ start: 0.8, opacity: 0, duration: 300 }}
    out:fly|global={{ ...animationConfig.out, duration: 200 }}
   >
    {@render content(errorOpts, 'error')}
   </div>
  {/key}
 {/await}
{:else}
 <div
  role="status"
  aria-live={data.type === 'error' ? 'assertive' : 'polite'}
  aria-atomic="true"
  data-state="open"
  data-type={data.type}
  class={cn(
   'group pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-md border p-4 pr-8 shadow-lg transition-all',
   styles[data.type] || styles.default
  )}
  onmouseenter={() => (isHovering = true)}
  onmouseleave={() => (isHovering = false)}
  in:fly|global={{ ...animationConfig.in, duration: 300 }}
  out:fly|global={{ ...animationConfig.out, duration: 200 }}
 >
  {@render content(data, data.type)}
 </div>
{/if}
