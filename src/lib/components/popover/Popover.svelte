<script lang="ts">
 import { setPopoverContext } from './ctx.svelte.js';
 import type { HTMLAttributes } from 'svelte/elements';
 import type { Snippet } from 'svelte';
 import type { Placement } from '@floating-ui/dom';

 interface Props extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  modal?: boolean;
  placement?: Placement;
  offset?: number;
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: Snippet;
 }

 let {
  open = $bindable(false),
  modal = false,
  placement = 'bottom',
  offset = 8,
  closeOnOutsideClick = true,
  closeOnEscape = true,
  onOpenChange,
  children
 }: Props = $props();

 const baseId = $props.id();

 setPopoverContext({
  baseId,
  get open() {
   return open;
  },
  set open(v) {
   open = v;
   onOpenChange?.(v);
  },
  get modal() {
   return modal;
  },
  get placement() {
   return placement;
  },
  get offset() {
   return offset;
  },
  get closeOnOutsideClick() {
   return closeOnOutsideClick;
  },
  get closeOnEscape() {
   return closeOnEscape;
  }
 });
</script>

{@render children()}
