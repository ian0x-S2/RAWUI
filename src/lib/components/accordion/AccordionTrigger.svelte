<script lang="ts">
 import { getAccordionItem, getAccordionRoot } from './ctx.svelte.js';
 import { cn } from '$lib/utils';
 import type { Snippet } from 'svelte';
 import type { HTMLButtonAttributes } from 'svelte/elements';

 type AccordionTriggerProps = {
  children: Snippet;
  icon?: Snippet;
  class?: string;
 };

 type Props = AccordionTriggerProps & HTMLButtonAttributes;

 let { children, icon, class: className = undefined, ...restProps }: Props = $props();

 const root = getAccordionRoot();
 const item = getAccordionItem();

 let isOpen = $derived(root.isSelected(item.value));
</script>

<h3 class="flex">
 <button
  type="button"
  onclick={() => !item.disabled && root.toggle(item.value)}
  disabled={item.disabled}
  aria-expanded={isOpen}
  data-state={isOpen ? 'open' : 'closed'}
  class={cn(
   'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline',
   '[&[data-state=open]>svg]:rotate-180',
   className
  )}
  {...restProps}
 >
  {@render children()}

  {#if icon}
   {@render icon()}
  {:else}
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
    class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
   >
    <path d="m6 9 6 6 6-6" />
   </svg>
  {/if}
 </button>
</h3>
