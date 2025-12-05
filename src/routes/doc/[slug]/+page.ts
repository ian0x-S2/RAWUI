// src/routes/doc/[slug]/+page.ts
import { error } from '@sveltejs/kit';
import { loadComponentFiles } from '$lib/utils/component-loader';

export const prerender = true;

// Glob all component source files at build time
const componentSources = import.meta.glob('/src/lib/components/**/*.{svelte,ts,js}', {
 query: '?raw',
 import: 'default'
}) as Record<string, () => Promise<string>>;

export async function load({ params }) {
 const { slug } = params;
 const path = `/src/docs/${slug}/doc.md`;

 // 1. Carrega o Componente e Metadados (Compilado pelo Mdsvex)
 const modules = import.meta.glob('/src/docs/**/*.md');

 // 2. Carrega o TEXTO PURO (?raw) para o modo AI/Robot
 // 'import: default' garante que pegamos a string direta
 const rawModules = import.meta.glob('/src/docs/**/*.md', {
  query: '?raw',
  import: 'default'
 });

 const resolver = modules[path];
 const rawResolver = rawModules[path];

 if (!resolver || !rawResolver) {
  error(404, `Documentação não encontrada para: ${slug}`);
 }

 // Executa as promessas em paralelo
 const [post, rawContent] = await Promise.all([
  resolver() as Promise<any>,
  rawResolver() as Promise<string>
 ]);

 // 3. Carrega o código-fonte do componente se componentId estiver definido
 const componentId = post.metadata?.componentId;
 const sourceFiles = componentId
  ? await loadComponentFiles(componentId, componentSources)
  : [];

 return {
  content: post.default, // O componente Svelte
  meta: post.metadata, // Frontmatter
  raw: rawContent, // A string do Markdown
  sourceFiles // Array de arquivos fonte do componente
 };
}

// Mantive sua função entries igual
export function entries() {
 const modules = import.meta.glob('/src/docs/**/*.md');
 const paths = Object.keys(modules);
 return paths.map((path) => {
  const parts = path.split('/');
  const slug = parts[parts.length - 2];
  return { slug };
 });
}
