import { error } from '@sveltejs/kit';
import { loadComponentFiles } from '$lib/utils/component-loader';
import type { DocMetadata } from '$lib/types/docs';

export const prerender = false;

const componentSources = import.meta.glob('/src/lib/components/**/*.{svelte,ts,js}', {
 query: '?raw',
 import: 'default'
}) as Record<string, () => Promise<string>>;

const modules = import.meta.glob('/src/docs/**/*.md');

// Carrega os módulos RAW (Texto puro para copy/paste/AI)
const rawModules = import.meta.glob('/src/docs/**/*.md', {
 query: '?raw',
 import: 'default'
});

export async function load({ params }) {
 const { slug } = params;

 let matchPath = '';

 for (const path in modules) {
  if (path.endsWith(`/${slug}.md`) || path.endsWith(`/${slug}/doc.md`)) {
   matchPath = path;
   break;
  }
 }

 if (!matchPath) {
  error(404, `Documentação não encontrada para: ${slug}`);
 }

 const resolver = modules[matchPath];
 const rawResolver = rawModules[matchPath];

 const [post, rawContent] = await Promise.all([
  resolver() as Promise<{ default: any; metadata: DocMetadata }>,
  rawResolver() as Promise<string>
 ]);

 const componentId = post.metadata?.componentId;
 const sourceFiles = componentId
  ? await loadComponentFiles(componentId, componentSources)
  : [];

 return {
  content: post.default,
  meta: post.metadata,
  raw: rawContent,
  sourceFiles
 };
}

export function entries() {
 const paths = Object.keys(modules);
 return paths.map((path) => {
  const parts = path.split('/');
  const filename = parts.pop();
  const folder = parts.pop();

  const slug = filename === 'doc.md' ? folder : filename?.replace('.md', '');

  return { slug };
 });
}
