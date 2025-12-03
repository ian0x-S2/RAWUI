<script lang="ts">
 import type { Snippet } from 'svelte';
 import { AccordionState, setAccordionRoot, type AccordionType } from './ctx.svelte.js';
 import type { HTMLAttributes } from 'svelte/elements';

 type Props = {
  type?: AccordionType;
  value?: string | string[];
  children: Snippet;
  class?: string;
 } & HTMLAttributes<HTMLDivElement>;

 let {
  children,
  type = 'single',
  value = $bindable(),
  class: className = undefined,
  ...restProps
 }: Props = $props();

 const rootState = new AccordionState(type, value);
 setAccordionRoot(rootState);

 $effect(() => {
  value = rootState.value;
 });

 $effect(() => {
  if (value !== undefined && value !== rootState.value) {
   rootState.value = value;
  }
 });
</script>

<div class={className} {...restProps}>
 {@render children()}
</div>
