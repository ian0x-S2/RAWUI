<script lang="ts">
 import { toast as globalToast } from './ctx.svelte.js';
 import Toast from './Toast.svelte';
 import { cn } from '$lib/utils';
 import type { ToastPosition } from './types.js';
 import type { ToastState } from './ctx.svelte.js';
 import { browser } from '$app/environment';

 let {
  position = 'bottom-right',
  toastState = globalToast,
  class: className = undefined,
  ...restProps
 }: {
  position?: ToastPosition;
  toastState?: ToastState;
  class?: string;
 } = $props();

 const positionClasses: Record<ToastPosition, string> = {
  'top-left': 'top-0 left-0 items-start',
  'top-center': 'top-0 left-1/2 -translate-x-1/2 items-center',
  'top-right': 'top-0 right-0 items-end',
  'bottom-left': 'bottom-0 left-0 items-start',
  'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 items-center',
  'bottom-right': 'bottom-0 right-0 items-end'
 };

 let isTop = $derived(position.startsWith('top'));

 let displayToasts = $derived(
  isTop ? [...toastState.toasts].reverse() : toastState.toasts
 );
</script>

{#if browser}
 <div
  role="region"
  aria-label="Notifications"
  tabindex="-1"
  class={cn(
   'pointer-events-none fixed z-99 flex max-h-screen w-full flex-col p-4 sm:max-w-[420px]',
   positionClasses[position],
   className
  )}
  {...restProps}
 >
  <div class="flex w-full flex-col gap-2">
   {#each displayToasts as t (t.id)}
    <Toast data={t} {toastState} {position} />
   {/each}
  </div>
 </div>
{/if}
