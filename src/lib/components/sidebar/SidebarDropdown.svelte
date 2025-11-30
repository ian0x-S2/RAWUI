<script lang="ts">
 import { cn } from '$lib/utils';
 import type { Snippet } from 'svelte';

 interface Props {
  children: Snippet;
  label: string;
  icon?: Snippet;
  open?: boolean;
  class?: string;
 }

 let {
  children,
  label,
  icon,
  open = $bindable(false),
  class: className
 }: Props = $props();
</script>

<div class={cn('space-y-1', className)}>
 <button
  onclick={() => (open = !open)}
  class="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
 >
  <span class="flex items-center gap-3">
   {#if icon}
    {@render icon()}
   {/if}
   {label}
  </span>
  <svg
   class={cn('h-4 w-4 transition-transform', open && 'rotate-180')}
   fill="none"
   stroke="currentColor"
   viewBox="0 0 24 24"
  >
   <path
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="M19 9l-7 7-7-7"
   />
  </svg>
 </button>

 {#if open}
  <div class="ml-6 space-y-1 border-l pl-2">
   {@render children()}
  </div>
 {/if}
</div>
