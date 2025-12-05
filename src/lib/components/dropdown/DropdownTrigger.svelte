<script lang="ts">
 import { type Snippet } from 'svelte';
 import type { HTMLButtonAttributes } from 'svelte/elements';
 import { getDropdownRoot } from './ctx.svelte.js';
 import { cn } from '$lib/utils';
 import type { VariantProps } from 'class-variance-authority';
 import { buttonVariants } from '$lib/components/button/Button.svelte';

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

 const root = getDropdownRoot();
</script>

<button
 class={cn(buttonVariants({ variant, size }), className)}
 {...root.triggerProps}
 {...restProps}
>
 {@render children()}
</button>
