import { json } from '@sveltejs/kit';

// 1. Interface para os metadados (Frontmatter) do seu Markdown
interface DocMetadata {
 title?: string;
 date?: string; // Opcional, pois nem toda doc tem data
 published?: boolean;
 [key: string]: any;
}

// 2. Interface do objeto que será retornado para o frontend
export interface Doc {
 slug: string;
 metadata: DocMetadata;
}

// 3. Interface interna para o arquivo carregado pelo Vite/Mdsvex
interface MdsvexFile {
 default: unknown; // O Componente Svelte (não enviamos isso no JSON)
 metadata: DocMetadata;
}

async function getDocs(): Promise<Doc[]> {
 const docs: Doc[] = [];

 // Carrega todos os arquivos .md
 const paths = import.meta.glob('/src/docs/*.md', {
  eager: true
 });

 for (const path in paths) {
  const file = paths[path] as MdsvexFile;

  // Pega o nome do arquivo (ex: 'intro.md' -> 'intro')
  const slug = path.split('/').pop()?.replace('.md', '');

  // Validações de segurança
  if (!file || !file.metadata || !slug) continue;

  // Se tiver a flag published: false, pula este arquivo
  if (file.metadata.published === false) continue;

  // Monta o objeto SEM o conteúdo do componente
  const doc: Doc = {
   slug,
   metadata: file.metadata
  };

  docs.push(doc);
 }

 // Ordena por data (se houver) ou mantém a ordem
 return docs.sort((a, b) => {
  const dateA = new Date(a.metadata.date ?? 0).getTime();
  const dateB = new Date(b.metadata.date ?? 0).getTime();
  return dateB - dateA; // Mais recentes primeiro
 });
}

export async function GET() {
 const docs = await getDocs();
 return json(docs);
}
