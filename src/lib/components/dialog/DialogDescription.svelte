<script lang="ts">
 import { getContext } from 'svelte';
 import type { DialogState } from './ctx.svelte.js';
 import { cn } from '$lib/utils';

 let { children, class: className = undefined, ...rest } = $props();
 const root = getContext<DialogState>('dialog-root');
</script>

<p
 id={root.descriptionId}
 class={cn('text-sm text-muted-foreground', className)}
 {...rest}
>
 {@render children()}
</p>
