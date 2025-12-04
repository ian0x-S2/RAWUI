<!-- src/lib/components/ui/dropdown-menu/DropdownLabel.svelte -->
<script lang="ts">
 import { cn } from '$lib/utils'; // <--- Importar cn
 let { children, class: className = undefined, ...restProps } = $props();
</script>

<div
 class={cn('px-2 py-1.5 text-sm font-semibold text-muted-foreground', className)}
 {...restProps}
>
 {@render children()}
</div>
