<script lang="ts">
 import { getAccordionItem, getAccordionRoot } from './ctx.svelte.js';
 import { cn } from '$lib/utils';

 let { children, class: className = undefined, ...restProps } = $props();

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
   'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
   className
  )}
  {...restProps}
 >
  {@render children()}

  <span class="h-4 w-4 shrink-0 transition-transform duration-200"> + </span>
 </button>
</h3>
