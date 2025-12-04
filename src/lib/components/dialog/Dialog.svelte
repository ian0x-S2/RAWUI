<!-- src/lib/components/ui/dialog/Dialog.svelte -->
<script lang="ts">
 import { setContext } from 'svelte';
 import { DialogState } from './ctx.svelte.js';

 let { children, open = $bindable(false) } = $props();

 // Gera um ID único e consistente (Server/Client) para esta instância
 const id = $props.id();

 const dialogState = new DialogState(id, open);

 // Sincronia reativa
 $effect(() => {
  open = dialogState.isOpen;
 });

 $effect(() => {
  if (open !== dialogState.isOpen) dialogState.isOpen = open;
 });

 setContext('dialog-root', dialogState);
</script>

{@render children()}
