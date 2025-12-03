<script lang="ts">
 import { AccordionItemState, setAccordionItem } from './ctx.svelte.js';
 import { cn } from '$lib/utils';

 let {
  children,
  value,
  disabled = false,
  class: className = undefined,
  ...restProps
 } = $props();

 const itemState = new AccordionItemState(value, disabled);
 setAccordionItem(itemState);
</script>

<div class={cn('border-b', className)} {...restProps}>
 {@render children()}
</div>
