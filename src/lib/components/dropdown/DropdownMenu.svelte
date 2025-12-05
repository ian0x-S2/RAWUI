<script lang="ts">
 import { type Snippet } from 'svelte';
 import { DropdownState, setDropdownRoot } from './ctx.svelte.js';
 import type { Placement } from '@floating-ui/dom';

 let { children, placement = 'bottom' }: { children: Snippet; placement?: Placement } =
  $props();

 const uid = $props.id();

 const state = new DropdownState({ baseId: uid, placement });

 setDropdownRoot(state);
</script>

{@render children()}
