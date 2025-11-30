<script lang="ts">
 import { getContext, type Snippet } from 'svelte';
 import { cn } from '$lib/utils';

 interface Props {
  children: Snippet;
  href?: string;
  active?: boolean;
  onclick?: () => void;
  class?: string;
 }

 let { children, href, active = false, onclick, class: className }: Props = $props();

 const context = getContext<{ close: () => void }>('sidebar');

 const handleClick = () => {
  onclick?.();
  context?.close();
 };
</script>

{@render children()}
