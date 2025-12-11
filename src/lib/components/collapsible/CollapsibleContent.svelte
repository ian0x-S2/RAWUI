<script lang="ts">
 import { getCollapsibleContext } from './ctx.svelte.js';
 import { cn } from '$lib/utils';
 import { slide } from 'svelte/transition';
 import type { HTMLAttributes } from 'svelte/elements';
 import type { Snippet } from 'svelte';
 import type { SlideParams } from 'svelte/transition';

 interface Props extends HTMLAttributes<HTMLDivElement> {
  children: Snippet;
  class?: string;
  transition?: SlideParams;
 }

 let {
  children,
  class: className,
  transition = { duration: 300 },
  ...restProps
 }: Props = $props();

 const ctx = getCollapsibleContext();
</script>

{#if ctx.open}
 <div
  transition:slide={transition}
  class={cn('overflow-hidden', className)}
  {...ctx.contentProps}
  {...restProps}
 >
  {@render children()}
 </div>
{/if}
