<!-- src/lib/components/portal/PortalConsumer.svelte -->
<script lang="ts">
 import { setContext } from 'svelte';

 let { children, context } = $props();

 // Restaura todos os contextos
 if (context) {
  for (const [key, value] of context) {
   setContext(key, value);
  }
 }
</script>

{#if children}
 {@render children()}
{/if}
