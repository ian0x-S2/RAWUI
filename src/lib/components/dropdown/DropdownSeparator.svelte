<!-- src/lib/components/ui/dropdown-menu/DropdownSeparator.svelte -->
<script lang="ts">
 import { cn } from '$lib/utils'; // <--- Importar cn
 let { class: className = undefined, ...restProps } = $props();
</script>

<div class={cn('my-1 h-px bg-border', className)} {...restProps}></div>
