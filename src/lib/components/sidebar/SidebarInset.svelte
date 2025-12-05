<script lang="ts">
 import type { Snippet } from 'svelte';
 import type { HTMLAttributes } from 'svelte/elements';
 import { cn } from '$lib/utils';

 interface Props extends HTMLAttributes<HTMLElement> {
  children: Snippet;
  class?: string;
 }

 let { children, class: className, ...restProps }: Props = $props();
</script>

<main
 class={cn('relative flex min-h-screen flex-1 flex-col bg-background', className)}
 style="order: 2;"
 data-sidebar="inset"
 {...restProps}
>
 {@render children()}
</main>
