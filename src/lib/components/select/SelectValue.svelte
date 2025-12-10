<script lang="ts">
 import { getSelectContext } from './ctx.svelte.js';
 import { cn } from '$lib/utils';

 interface Props {
  placeholder?: string;
  class?: string;
 }

 let { placeholder = 'Selecione...', class: className }: Props = $props();
 const ctx = getSelectContext();

 const displayValue = $derived(() => {
  if (ctx.multiple) {
   const values = ctx.selectedValues;
   if (values.length === 0) return null;
   if (values.length === 1) return ctx.labelMap[values[0]];
   return `${values.length} selecionados`;
  }
  return ctx.selectedLabel;
 });
</script>

<span class={cn('pointer-events-none block truncate', className)}>
 {#if displayValue()}
  {displayValue()}
 {:else}
  <span class="text-muted-foreground">{placeholder}</span>
 {/if}
</span>
