<script lang="ts">
 import { getContext, type Snippet } from 'svelte';
 import type { DialogState } from './ctx.svelte.js';
 import { cn } from '$lib/utils';
 import { buttonVariants } from '$lib/components/button/Button.svelte';
 import type { HTMLButtonAttributes } from 'svelte/elements';
 import type { VariantProps } from 'class-variance-authority';

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

 const root = getContext<DialogState>('dialog-root');

 function handleClick(e: MouseEvent) {
  root.triggerRef = e.currentTarget as HTMLElement;
  root.toggle();
 }
</script>

<button
 type="button"
 class={cn(buttonVariants({ variant, size }), className)}
 aria-haspopup="dialog"
 aria-expanded={root.isOpen}
 aria-controls={root.baseId}
 onclick={handleClick}
 {...restProps}
>
 {@render children()}
</button>
