<script lang="ts">
 import { onMount } from 'svelte';
 import { browser } from '$app/environment';
 import {
  ThemeManager,
  createThemeContext
 } from '$lib/components/theme-toggle/state/theme.svelte';
 import { script } from './script.ts';
 import type { Attribute } from './types.ts';
 import { useLocalStorage } from '$lib/hooks/state/storage.svelte';

 interface Props {
  themes?: string[];
  forcedTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  enableColorScheme?: boolean;
  storageKey?: string;
  defaultTheme?: string;
  attribute?: Attribute | Attribute[];
  value?: { [themeName: string]: string };
  nonce?: string;
  children?: import('svelte').Snippet;
 }

 let {
  themes = ['light', 'dark'],
  forcedTheme,
  enableSystem = true,
  disableTransitionOnChange = false,
  enableColorScheme = true,
  storageKey = 'theme',
  defaultTheme = enableSystem ? 'system' : 'light',
  attribute = 'data-theme',
  value,
  nonce,
  children
 }: Props = $props();

 // --- 1. INTEGRAÇÃO COM SEU CUSTOM HOOK ---
 // Usamos serializer/deserializer identidade para evitar aspas duplas do JSON
 const storage = useLocalStorage<string>(storageKey, defaultTheme, {
  serializer: (v) => v,
  deserializer: (v) => v
 });

 // --- 2. SETUP DO GERENCIADOR ---
 const manager = new ThemeManager(storage, {
  themes: enableSystem ? [...themes, 'system'] : themes,
  enableSystem,
  forcedTheme,
  resolvedTheme: undefined, // ou uma string inicial se preferir
  systemTheme: undefined // ou getSystemTheme() se quiser inicializar já
 });
 createThemeContext(manager);

 // --- HELPERS (Mantidos) ---
 const MEDIA = '(prefers-color-scheme: dark)';

 const getSystemTheme = (e?: MediaQueryList | MediaQueryListEvent) => {
  if (!e && browser) e = window.matchMedia(MEDIA);
  if (!e) return 'light';
  const isDark = e.matches;
  return isDark ? 'dark' : 'light';
 };

 const disableAnimation = () => {
  const css = document.createElement('style');
  if (nonce) css.setAttribute('nonce', nonce);
  css.appendChild(
   document.createTextNode(
    `*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
   )
  );
  document.head.appendChild(css);

  return () => {
   (() => window.getComputedStyle(document.body))();
   setTimeout(() => {
    document.head.removeChild(css);
   }, 1);
  };
 };

 // --- LÓGICA DOM (applyTheme) ---
 const applyTheme = (theme: string | undefined) => {
  if (!browser || !theme) return;

  let resolved = theme;
  if (theme === 'system' && enableSystem) {
   resolved = getSystemTheme();
  }

  const name = value ? value[resolved] : resolved;
  const enable = disableTransitionOnChange ? disableAnimation() : null;
  const d = document.documentElement;

  const attrs = Array.isArray(attribute) ? attribute : [attribute];
  const attrValues = !value ? themes : Object.values(value);

  const handleAttribute = (attr: Attribute) => {
   if (attr === 'class') {
    d.classList.remove(...attrValues);
    if (name) d.classList.add(name);
   } else if (attr.startsWith('data-')) {
    if (name) {
     d.setAttribute(attr, name);
    } else {
     d.removeAttribute(attr);
    }
   }
  };

  attrs.forEach(handleAttribute);

  if (enableColorScheme) {
   const fallback = themes.includes(defaultTheme) ? defaultTheme : null;
   const colorScheme = themes.includes(resolved) ? resolved : fallback;
   d.style.colorScheme = colorScheme || 'light';
  }

  enable?.();
  manager._setResolvedTheme(resolved);
 };

 // --- EFEITOS ---

 // 1. Reagir a mudanças no valor do Storage (Seu hook cuida da atualização do valor)
 // Aqui nós apenas aplicamos o efeito visual no DOM quando o valor muda.
 $effect(() => {
  const currentTheme = manager.theme; // Isso é reativo via useStorage -> storage.value

  if (currentTheme && !forcedTheme) {
   applyTheme(currentTheme);
  }
 });

 // 2. Forced Theme logic
 $effect(() => {
  if (forcedTheme) {
   applyTheme(forcedTheme);
   // Atualiza o storage para ficar sincronizado, caso o forcedTheme mude dinamicamente
   manager._setThemeState(forcedTheme);
  }
 });

 // 3. Listeners de Sistema
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
  // NOTA: Removemos os listeners de 'storage' daqui, pois useStorage já faz isso!

  return () => {
   media.removeEventListener('change', handleMediaQuery);
  };
 });

 // --- SCRIPT BLOCKER ---
 const scriptArgs = JSON.stringify([
  attribute,
  storageKey,
  defaultTheme,
  forcedTheme,
  themes,
  value,
  enableSystem,
  enableColorScheme
 ]).slice(1, -1);

 const scriptSrc = `(${script.toString()})(${scriptArgs})`;
</script>

<svelte:head>
 <!-- eslint-disable-next-line svelte/no-at-html-tags -->
 {@html `<script nonce="${nonce || ''}">${scriptSrc}</script>`}
</svelte:head>

{@render children?.()}
