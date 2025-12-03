<!-- src/lib/components/ui/dialog/Dialog.svelte -->
<script lang="ts">
 import { setContext } from 'svelte';
 import { DialogState } from './ctx.svelte.js';

 let { children, open = $bindable(false) } = $props();

 const uid = $props.id();
 const dialogState = new DialogState(uid, open);

 // Sincronia bidirecional
 $effect(() => {
  open = dialogState.isOpen;
 });

 $effect(() => {
  if (open !== dialogState.isOpen) dialogState.isOpen = open;
 });

 setContext('dialog-root', dialogState);
</script>

{@render children()}
