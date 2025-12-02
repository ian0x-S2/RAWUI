<script lang="ts">
 import { setContext } from 'svelte';
 import type { Snippet } from 'svelte';
 import { browser } from '$app/environment';
 import { cn } from '../../utils/index.ts';

 interface Props {
  children: Snippet;
  // Recebe o valor inicial do servidor (Cookies)
  open?: boolean;
  variant?: 'default' | 'collapsible';
  class?: string;
 }

 let {
  children,
  open: initialOpen = true,
  variant = 'default',
  class: className
 }: Props = $props();

 let open = $state(initialOpen);
 let mobileOpen = $state(false);
 let isMobile = $state(false);

 function setCookie(value: boolean) {
  if (browser) {
   const maxAge = 60 * 60 * 24 * 7; // 7 dias
   document.cookie = `sidebar:state=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
  }
 }

 if (browser) {
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  isMobile = mediaQuery.matches;

  mediaQuery.addEventListener('change', (e) => {
   isMobile = e.matches;
  });
 }

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
   if (isMobile) {
    mobileOpen = value;
   } else {
    open = value;
    setCookie(value); // Salva no cookie ao alterar
   }
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
  close: () => {
   if (isMobile) mobileOpen = false;
   else {
    open = false;
    setCookie(false);
   }
  },
  toggle: () => {
   if (isMobile) mobileOpen = !mobileOpen;
   else {
    open = !open;
    setCookie(open);
   }
  }
 };

 setContext('sidebar', context);
</script>

<div
 class={cn(
  'group/sidebar-wrapper flex min-h-svh w-full has-[data-variant=inset]:bg-sidebar',
  className
 )}
 style="--sidebar-width: 16rem; --sidebar-width-icon: 3.5rem;"
>
 {@render children()}
</div>
