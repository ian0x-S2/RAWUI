<!-- src/lib/components/ui/dropdown-menu/DropdownTrigger.svelte -->
<script lang="ts">
 import { getContext, type Snippet } from 'svelte';
 import type { DropdownState } from './ctx.svelte.js';
 import { cn } from '$lib/utils';
 import type { VariantProps } from 'class-variance-authority';
 import { buttonVariants } from '$lib/components/button/Button.svelte';
 import type { HTMLButtonAttributes } from 'svelte/elements';

 type ButtonVariantProps = VariantProps<typeof buttonVariants>;

 let {
  children,
  class: className = undefined,
  variant = 'outline',
  size = 'default',
  ...restProps
 }: {
  children: Snippet;
  class?: string;
  variant?: ButtonVariantProps['variant'];
  size?: ButtonVariantProps['size'];
 } & HTMLButtonAttributes = $props();

 const root = getContext<DropdownState>('dropdown-root');
</script>

<button
 class={cn(buttonVariants({ variant, size }), className)}
 {...root.triggerProps}
 {...restProps}
>
 {@render children()}
</button>
