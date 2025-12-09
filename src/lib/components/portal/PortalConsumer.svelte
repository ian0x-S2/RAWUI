<script lang="ts">
 import { setContext } from 'svelte';

 let { children, context } = $props();

 if (context) {
  for (const [key, value] of context) {
   setContext(key, value);
  }
 }
</script>

{#if children}
 {@render children()}
{/if}
