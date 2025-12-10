<script lang="ts" generics="Multiple extends boolean = false">
 import { setSelectContext } from './ctx.svelte.js';
 import type { Snippet } from 'svelte';

 interface Props {
  children: Snippet;
  value?: Multiple extends true ? string[] : string;
  onValueChange?: (value: Multiple extends true ? string[] : string) => void;
  multiple?: Multiple;
 }

 let {
  children,
  value = $bindable([] as any),
  onValueChange,
  multiple = false as Multiple
 }: Props = $props();

 const baseId = $props.id();

 setSelectContext(value, baseId, multiple, (newValue) => {
  value = newValue;
  onValueChange?.(newValue);
 });
</script>

{@render children()}
