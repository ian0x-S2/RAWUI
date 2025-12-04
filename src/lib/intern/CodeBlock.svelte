<script lang="ts">
	import Highlight from 'svelte-highlight';
	import svelte from 'svelte-highlight/languages/xml';
	import typescript from 'svelte-highlight/languages/typescript';
	import javascript from 'svelte-highlight/languages/javascript';
	import bash from 'svelte-highlight/languages/bash';
	import css from 'svelte-highlight/languages/css';
	import github from 'svelte-highlight/styles/github-dark';

	type Language = 'svelte' | 'typescript' | 'javascript' | 'bash' | 'css';

	let { code, language = 'svelte' }: { code: string; language?: Language } = $props();

	const languageMap = {
		svelte,
		typescript,
		javascript,
		bash,
		css
	};

	const lang = $derived(languageMap[language] || svelte);
</script>

<svelte:head>
	{@html github}
</svelte:head>

<div class="not-prose my-4 overflow-hidden rounded-lg border border-border">
	<Highlight language={lang} {code} />
</div>

<style>
	:global(.hljs) {
		padding: 1.5rem !important;
		background: hsl(var(--secondary)) !important;
		overflow-x: auto !important;
	}
</style>
