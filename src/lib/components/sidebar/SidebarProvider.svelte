<!-- lib/components/sidebar/SidebarProvider.svelte -->
<script lang="ts">
 import { setContext } from 'svelte';
 import type { Snippet } from 'svelte';
 import { browser } from '$app/environment';
 import { cn } from '../../utils/index.ts';

 interface Props {
  children: Snippet;
  defaultOpen?: boolean;
  variant?: 'default' | 'collapsible';
  class?: string;
 }

 let {
  children,
  defaultOpen = true,
  variant = 'default',
  class: className
 }: Props = $props();

 let open = $state(defaultOpen);
 let mobileOpen = $state(false);
 let isMobile = $state(false);

 if (browser) {
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  isMobile = mediaQuery.matches;

  mediaQuery.addEventListener('change', (e) => {
   isMobile = e.matches;
  });
 }

 // Bloqueia scroll no mobile quando aberto
 $effect(() => {
  if (isMobile && mobileOpen) {
   document.body.style.overflow = 'hidden';
  } else {
   document.body.style.overflow = '';
  }
 });

 const context = {
  get open() {
   return isMobile ? mobileOpen : open;
  },
  set open(value: boolean) {
   if (isMobile) mobileOpen = value;
   else open = value;
  },
  get isMobile() {
   return isMobile;
  },
  get variant() {
   return variant;
  },
  get isCollapsed() {
   return variant === 'collapsible' && !open && !isMobile;
  },
  close: () => (isMobile ? (mobileOpen = false) : (open = false)),
  toggle: () => (isMobile ? (mobileOpen = !mobileOpen) : (open = !open))
 };

 setContext('sidebar', context);
</script>

<!--
  Container Principal:
  Define as variáveis de largura aqui.
  --sidebar-width: 16rem (256px)
  --sidebar-width-icon: 4rem
-->
<div
 class={cn(
  'group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar',
  className
 )}
 style="--sidebar-width: 16rem; --sidebar-width-icon: 4rem;"
>
 {@render children()}
</div>
