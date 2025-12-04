<script lang="ts">
 import Highlight from 'svelte-highlight';
 import svelte from 'svelte-highlight/languages/xml';
 import typescript from 'svelte-highlight/languages/typescript';
 import javascript from 'svelte-highlight/languages/javascript';
 import bash from 'svelte-highlight/languages/bash';
 import css from 'svelte-highlight/languages/css';
 import { useTheme } from '$lib/components/theme-toggle/state/theme.svelte';

 type Language = 'svelte' | 'typescript' | 'javascript' | 'bash' | 'css';

 let { code, language = 'svelte' }: { code: string; language?: Language } = $props();

 const themeState = useTheme();

 const languageMap = {
  svelte,
  typescript,
  javascript,
  bash,
  css
 };

 let themeFileName = $derived(themeState.theme === 'dark' ? 'github-dark' : 'github');

 let lang = $derived(languageMap[language] || svelte);
</script>

<svelte:head>
 <link
  rel="stylesheet"
  href={`https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/${themeFileName}.min.css`}
 />
</svelte:head>

<div
 class="not-prose my-4 overflow-hidden rounded-lg border border-border bg-card p-0 font-medium"
>
 <Highlight language={lang} {code} />
</div>

<style>
 :global(.hljs) {
  padding: 1rem !important;
  background-color: hsl(var(--card)) !important;
  font-size: 0.875rem;
  line-height: 1.5rem;
  overflow-x: auto !important;
 }
</style>
