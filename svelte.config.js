import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
/** @type {import('@sveltejs/kit').Config} */

const mdsvexOptions = {
 extensions: ['.md'],
 rehypePlugins: [rehypeSlug]
};

const config = {
 // Consult https://svelte.dev/docs/kit/integrations
 // for more information about preprocessors

 preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
 extensions: ['.svelte', '.svx', '.md'],
 kit: {
  // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
  // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
  // See https://svelte.dev/docs/kit/adapters for more information about adapters.
  adapter: adapter()
 }
};

export default config;
