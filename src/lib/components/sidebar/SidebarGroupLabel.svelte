<script lang="ts">
 import { cn } from '$lib/utils';
 import type { Snippet } from 'svelte';

 interface Props {
  children: Snippet;
  class?: string;
 }

 let { children, class: className }: Props = $props();
</script>

<div class={cn('px-2 py-1.5 text-xs font-semibold text-muted-foreground', className)}>
 {@render children()}
</div>
