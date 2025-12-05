<script lang="ts">
 import type { HTMLAttributes } from 'svelte/elements';
 import { cn } from '$lib/utils';

 type Props = {
  class?: string;
 } & HTMLAttributes<HTMLDivElement>;

 let { class: className, ...restProps }: Props = $props();
</script>

<div class={cn('my-1 h-px bg-border', className)} {...restProps}></div>
