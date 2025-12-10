<script lang="ts">
 import { getSelectContext } from './ctx.svelte.js';
 import { cn } from '$lib/utils';

 interface Props {
  placeholder?: string;
  class?: string;
 }

 let { placeholder = 'Selecione...', class: className }: Props = $props();
 const ctx = getSelectContext();

 const displayText = $derived.by(() => {
  const values = ctx.selectedValues;
  if (values.length === 0) return null;

  if (ctx.multiple && values.length > 1) {
   return `${values.length} selecionados`;
  }

  // Tenta pegar o label do item registrado
  const label = ctx.selectedLabel;

  // Se achou, retorna. Se não (ainda não montou os SelectItems), retorna o valor bruto como fallback
  return label || values[0];
 });
</script>

<span class={cn('pointer-events-none block truncate', className)}>
 {#if displayText}
  {displayText}
 {:else}
  <span class="text-muted-foreground">{placeholder}</span>
 {/if}
</span>
