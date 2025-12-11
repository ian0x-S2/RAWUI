<script lang="ts">
 import { setCollapsibleContext } from './ctx.svelte.js';
 import { cn } from '$lib/utils';
 import type { HTMLAttributes } from 'svelte/elements';
 import type { Snippet } from 'svelte';

 interface Props extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: Snippet;
  class?: string;
 }

 let {
  open = $bindable(false),
  disabled = false,
  onOpenChange,
  children,
  class: className,
  ...restProps
 }: Props = $props();

 const baseId = $props.id();

 const ctx = setCollapsibleContext({
  baseId,
  get open() {
   return open;
  },
  set open(v) {
   open = v;
   onOpenChange?.(v);
  },
  get disabled() {
   return disabled;
  }
 });
</script>

<div
 data-state={ctx.open ? 'open' : 'closed'}
 data-disabled={ctx.disabled ? '' : undefined}
 class={cn(className)}
 {...restProps}
>
 {@render children()}
</div>
