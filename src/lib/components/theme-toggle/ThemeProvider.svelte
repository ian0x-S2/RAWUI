<script lang="ts">
 import { onMount, type Snippet } from 'svelte';
 import { browser } from '$app/environment';
 import {
  ThemeManager,
  createThemeContext
 } from '$lib/components/theme-toggle/state/theme.svelte';
 import { useLocalStorage } from '$lib/hooks/state/storage.svelte';

 interface Props {
  themes?: string[];
  forcedTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  enableColorScheme?: boolean;
  storageKey?: string;
  defaultTheme?: string;
  children?: Snippet;
 }

 let {
  themes = ['light', 'dark'],
  forcedTheme,
  enableSystem = true,
  disableTransitionOnChange = true,
  enableColorScheme = true,
  storageKey = 'theme',
  defaultTheme = enableSystem ? 'system' : 'light',
  children
 }: Props = $props();

 const storage = useLocalStorage<string>(storageKey, defaultTheme, {
  serializer: (v) => v,
  deserializer: (v) => v
 });

 const manager = new ThemeManager(storage, {
  themes: enableSystem ? [...themes, 'system'] : themes,
  enableSystem,
  forcedTheme,
  resolvedTheme: undefined,
  systemTheme: undefined
 });
 createThemeContext(manager);

 const MEDIA = '(prefers-color-scheme: dark)';

 const getSystemTheme = (e?: MediaQueryList | MediaQueryListEvent) => {
  if (!e && browser) e = window.matchMedia(MEDIA);
  if (!e) return 'light';
  const isDark = e.matches;
  return isDark ? 'dark' : 'light';
 };

 const disableAnimation = () => {
  const css = document.createElement('style');
  css.setAttribute('id', 'disable-theme-transition');
  css.appendChild(
   document.createTextNode(
    `*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
   )
  );
  document.head.appendChild(css);

  return () => {
   // Força reflow
   void window.getComputedStyle(document.body).opacity;

   requestAnimationFrame(() => {
    requestAnimationFrame(() => {
     const element = document.getElementById('disable-theme-transition');
     if (element) {
      document.head.removeChild(element);
     }
    });
   });
  };
 };

 const applyTheme = (theme: string | undefined) => {
  if (!browser || !theme) return;

  let resolved = theme;
  if (theme === 'system' && enableSystem) {
   resolved = getSystemTheme();
  }

  const enable = disableTransitionOnChange ? disableAnimation() : null;
  const d = document.documentElement;

  // Remove todas as classes de tema
  d.classList.remove(...themes);

  // Adiciona a classe correta
  if (resolved && themes.includes(resolved)) {
   d.classList.add(resolved);
  }

  if (enableColorScheme) {
   d.style.colorScheme = resolved === 'dark' ? 'dark' : 'light';
  }

  enable?.();
  manager._setResolvedTheme(resolved);
 };

 $effect(() => {
  const currentTheme = forcedTheme || manager.theme;

  if (currentTheme) {
   applyTheme(currentTheme);

   if (forcedTheme) {
    manager._setThemeState(forcedTheme);
   }
  }
 });

 onMount(() => {
  const media = window.matchMedia(MEDIA);
  manager._setSystemTheme(media.matches ? 'dark' : 'light');

  const handleMediaQuery = (e: MediaQueryListEvent | MediaQueryList) => {
   const resolved = getSystemTheme(e);
   manager._setSystemTheme(resolved === 'dark' ? 'dark' : 'light');

   if (manager.theme === 'system' && enableSystem && !forcedTheme) {
    applyTheme('system');
   }
  };

  media.addEventListener('change', handleMediaQuery);

  return () => {
   media.removeEventListener('change', handleMediaQuery);
  };
 });
</script>

{@render children?.()}
