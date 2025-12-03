<script lang="ts">
 import { getContext } from 'svelte';
 import type { DialogState } from './ctx.svelte.js';
 import { cn } from '$lib/utils';

 let { children, class: className = undefined, ...rest } = $props();
 const root = getContext<DialogState>('dialog-root');
</script>

<h2
 id={root.titleId}
 class={cn('text-lg leading-none font-semibold tracking-tight', className)}
 {...rest}
>
 {@render children()}
</h2>
