<script lang="ts">
 import { getCollapsibleContext } from './ctx.svelte.js';
 import { cn } from '$lib/utils';
 import type { HTMLButtonAttributes } from 'svelte/elements';
 import type { Snippet } from 'svelte';

 interface Props extends HTMLButtonAttributes {
  children: Snippet;
  class?: string;
 }

 let { children, class: className, ...restProps }: Props = $props();
 const ctx = getCollapsibleContext();
</script>

<button class={cn(className)} {...ctx.triggerProps} {...restProps}>
 {@render children()}
</button>
