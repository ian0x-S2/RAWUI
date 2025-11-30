<!-- SidebarProvider.svelte -->
<script lang="ts">
 import { setContext } from 'svelte';
 import type { Snippet } from 'svelte';
 import { browser } from '$app/environment';

 interface Props {
  children: Snippet;
  defaultOpen?: boolean;
  variant?: 'default' | 'collapsible';
 }

 let { children, defaultOpen = true, variant = 'default' }: Props = $props();

 // Estado da sidebar
 let open = $state(defaultOpen);
 let mobileOpen = $state(false);

 // Detectar se estamos no mobile
 let isMobile = $state(false);

 if (browser) {
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  isMobile = mediaQuery.matches;

  mediaQuery.addEventListener('change', (e) => {
   isMobile = e.matches;
  });
 }

 // Controla scroll do body quando sidebar está aberta no mobile
 $effect(() => {
  if (isMobile && mobileOpen) {
   document.body.style.overflow = 'hidden';
  } else {
   document.body.style.overflow = '';
  }

  return () => {
   document.body.style.overflow = '';
  };
 });

 // Context para compartilhar com todos os componentes
 const context = {
  get open() {
   return isMobile ? mobileOpen : open;
  },
  set open(value: boolean) {
   if (isMobile) {
    mobileOpen = value;
   } else {
    open = value;
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
   if (isMobile) {
    mobileOpen = false;
   } else {
    open = false;
   }
  },
  toggle: () => {
   if (isMobile) {
    mobileOpen = !mobileOpen;
   } else {
    open = !open;
   }
  }
 };

 setContext('sidebar', context);
</script>

{@render children()}
