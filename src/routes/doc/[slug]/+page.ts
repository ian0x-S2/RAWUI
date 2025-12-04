// src/routes/doc/[slug]/+page.ts
import { error } from '@sveltejs/kit';

export const prerender = true;

export async function load({ params }) {
 const { slug } = params;

 // 1. Mapeia todos os arquivos .md dentro de src/docs
 // eager: false (padrão) retorna uma função que carrega o módulo
 const modules = import.meta.glob('/src/docs/**/*.md');

 // 2. Constrói o caminho esperado: src/docs/dropdown/doc.md
 const path = `/src/docs/${slug}/doc.md`;

 // 3. Busca o importador correspondente ao caminho
 const resolver = modules[path];

 if (!resolver) {
  // Dica de debug: mostre as chaves disponíveis se der 404
  // console.log('Caminhos disponíveis:', Object.keys(modules));
  error(404, `Documentação não encontrada para: ${slug}`);
 }

 // 4. Carrega o componente e os metadados
 const post = (await resolver()) as any;

 return {
  // Agora ISSO funciona, pois não precisa virar JSON
  content: post.default,
  meta: post.metadata
 };
}

// Gera as rotas estáticas para o build
export function entries() {
 // Pega todas as chaves (caminhos dos arquivos)
 const modules = import.meta.glob('/src/docs/**/*.md');
 const paths = Object.keys(modules);

 // Transforma ['/src/docs/dropdown/doc.md', ...] em [{ slug: 'dropdown' }, ...]
 return paths.map((path) => {
  const parts = path.split('/');
  // O slug é a penúltima parte (ex: 'dropdown' em '.../dropdown/doc.md')
  const slug = parts[parts.length - 2];
  return { slug };
 });
}
