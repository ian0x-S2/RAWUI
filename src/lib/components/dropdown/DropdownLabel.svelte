<script lang="ts">
 import { type Snippet } from 'svelte';
 import type { HTMLAttributes } from 'svelte/elements';
 import { cn } from '$lib/utils';

 type Props = {
  children: Snippet;
  class?: string;
 } & HTMLAttributes<HTMLDivElement>;

 let { children, class: className, ...restProps }: Props = $props();
</script>

<div
 class={cn('px-2 py-1.5 text-sm font-semibold text-muted-foreground', className)}
 {...restProps}
>
 {@render children()}
</div>
