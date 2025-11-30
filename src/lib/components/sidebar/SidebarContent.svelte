<script lang="ts">
 import { cn } from '$lib/utils';
 import type { Snippet } from 'svelte';

 interface Props {
  children: Snippet;
  class?: string;
 }

 let { children, class: className }: Props = $props();
</script>

<div class={cn('flex-1 space-y-1', className)}>
 {@render children()}
</div>
