<!-- src/lib/components/ui/dropdown-menu/trigger.svelte -->
<script lang="ts">
 import { getContext } from 'svelte';
 import type { DropdownState } from './ctx.svelte.js';

 let { children, ...restProps } = $props();
 const root = getContext<DropdownState>('dropdown-root');
</script>

<button {...root.triggerProps} {...restProps}>
 {@render children()}
</button>
