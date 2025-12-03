<!-- src/lib/components/ui/dropdown-menu/root.svelte -->
<script lang="ts">
 import { setContext, type Snippet } from 'svelte';
 import { DropdownState } from './ctx.svelte.js';
 import type { Placement } from '@floating-ui/dom';

 let { children, placement = 'bottom' }: { children: Snippet; placement?: Placement } =
  $props();

 // Gera ID único estável (Server & Client)
 const uid = $props.id();

 const state = new DropdownState({ baseId: uid, placement });

 setContext('dropdown-root', state);
</script>

{@render children()}
