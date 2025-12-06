import { error } from '@sveltejs/kit';
import { loadComponentFiles } from '$lib/utils/component-loader';
import type { DocMetadata } from '$lib/types/docs';

export const prerender = true;

// Glob component sources (mantido igual)
const componentSources = import.meta.glob('/src/lib/components/**/*.{svelte,ts,js}', {
 query: '?raw',
 import: 'default'
}) as Record<string, () => Promise<string>>;

// Carrega os módulos do Mdsvex (Componente + Metadata)
const modules = import.meta.glob('/src/docs/**/*.md');

// Carrega os módulos RAW (Texto puro para copy/paste/AI)
const rawModules = import.meta.glob('/src/docs/**/*.md', {
 query: '?raw',
 import: 'default'
});

export async function load({ params }) {
 const { slug } = params;

 // Lógica de busca flexível:
 // Procura por uma chave no objeto 'modules' que corresponda ao slug
 let matchPath = '';

 for (const path in modules) {
  // Verifica: /src/docs/guides/intro.md (termina em /intro.md)
  // Verifica: /src/docs/components/button/doc.md (termina em /button/doc.md)
  if (path.endsWith(`/${slug}.md`) || path.endsWith(`/${slug}/doc.md`)) {
   matchPath = path;
   break;
  }
 }

 if (!matchPath) {
  error(404, `Documentação não encontrada para: ${slug}`);
 }

 // Pega os resolvers corretos
 const resolver = modules[matchPath];
 const rawResolver = rawModules[matchPath];

 // Executa em paralelo
 const [post, rawContent] = await Promise.all([
  resolver() as Promise<{ default: any; metadata: DocMetadata }>,
  rawResolver() as Promise<string>
 ]);

 // Carrega source files se houver componentId
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

// Entradas para Prerenderização (SSG)
export function entries() {
 const paths = Object.keys(modules);
 return paths.map((path) => {
  const parts = path.split('/');
  const filename = parts.pop();
  const folder = parts.pop();

  // Mesma lógica de extração do slug da API
  const slug = filename === 'doc.md' ? folder : filename?.replace('.md', '');

  return { slug };
 });
}
