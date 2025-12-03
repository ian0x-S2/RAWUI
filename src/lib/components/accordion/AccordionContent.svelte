<!-- src/lib/components/ui/accordion/AccordionContent.svelte -->
<script lang="ts">
 import { getAccordionItem, getAccordionRoot } from './ctx.svelte.js';
 import { slide } from 'svelte/transition';
 import { cn } from '$lib/utils';

 let { children, class: className = undefined, ...restProps } = $props();

 const root = getAccordionRoot();
 const item = getAccordionItem();

 let isOpen = $derived(root.isSelected(item.value));
</script>

{#if isOpen}
 <div
  transition:slide={{ duration: 200 }}
  class="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
 >
  <div class={cn('pt-0 pb-4', className)} {...restProps}>
   {@render children()}
  </div>
 </div>
{/if}
