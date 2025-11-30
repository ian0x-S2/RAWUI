<script lang="ts">
 import { cn } from '$lib/utils';
 import type { Snippet } from 'svelte';

 interface Props {
  children: Snippet;
  class?: string;
 }

 let { children, class: className }: Props = $props();
</script>

<div class={cn('mt-auto space-y-2 pt-4', className)}>
 {@render children()}
</div>
