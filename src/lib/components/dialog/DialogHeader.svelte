<script lang="ts">
 import { cn } from '$lib/utils';
 let { children, class: className = undefined, ...rest } = $props();
</script>

<div
 class={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}
 {...rest}
>
 {@render children()}
</div>
