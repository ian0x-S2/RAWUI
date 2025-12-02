<script lang="ts">
 import { cn } from '../../utils/index.ts';
 import type { Snippet } from 'svelte';

 interface Props {
  children: Snippet;
  class?: string;
 }

 let { children, class: className }: Props = $props();
</script>

<main
 class={cn('relative flex min-h-screen flex-1 flex-col bg-background', className)}
 style="order: 2;"
>
 {@render children()}
</main>
