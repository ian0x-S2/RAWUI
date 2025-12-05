<script lang="ts">
 import { onDestroy, type Snippet } from 'svelte';
 import { cn } from '$lib/utils';
 import { SidebarState, setSidebarContext, type SidebarVariant } from './ctx.svelte.js';

 interface Props {
  children: Snippet;
  open?: boolean;
  variant?: SidebarVariant;
  class?: string;
 }

 let {
  children,
  open: initialOpen = true,
  variant = 'default',
  class: className
 }: Props = $props();

 const state = new SidebarState({
  defaultOpen: initialOpen,
  variant
 });

 setSidebarContext(state);

 onDestroy(() => {
  state.destroy();
 });
</script>

<div
 class={cn(
  'group/sidebar-wrapper flex min-h-svh w-full has-[data-variant=inset]:bg-sidebar',
  className
 )}
 style="
		--sidebar-width: 16rem;
		--sidebar-width-icon: 3.5rem;
		--sidebar-width-floating: 18rem;
		--sidebar-transition-duration: 300ms;
		--sidebar-transition-easing: cubic-bezier(0.32, 0.72, 0, 1);
	"
>
 {@render children()}
</div>
