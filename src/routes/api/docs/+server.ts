// src/routes/api/docs/+server.ts
import { json } from '@sveltejs/kit';
import type { DocItem, DocGroup } from '$lib/types/docs';

export async function GET() {
 const allFiles = import.meta.glob('/src/docs/**/*.md', { eager: true });
 const docs: DocItem[] = [];

 for (const path in allFiles) {
  const file = allFiles[path] as any;
  const metadata = file.metadata;

  if (!metadata || metadata.published === false) continue;

  // Lógica inteligente para pegar o slug:
  // Se for "src/docs/components/button/doc.md" -> slug = "button"
  // Se for "src/docs/guides/introduction.md" -> slug = "introduction"
  const pathParts = path.split('/');
  const filename = pathParts.pop(); // doc.md ou introduction.md
  const folder = pathParts.pop(); // button ou guides

  let slug = filename === 'doc.md' ? folder : filename?.replace('.md', '');

  if (!slug) continue;

  docs.push({
   slug,
   metadata: {
    ...metadata,
    // Define um grupo padrão se não houver
    group: metadata.group || 'Outros'
   }
  });
 }

 // Agrupamento
 const grouped = docs.reduce(
  (acc, doc) => {
   const groupName = doc.metadata.group;
   if (!acc[groupName]) {
    acc[groupName] = [];
   }
   acc[groupName].push(doc);
   return acc;
  },
  {} as Record<string, DocItem[]>
 );

 // Ordenação dos itens dentro dos grupos
 Object.keys(grouped).forEach((key) => {
  grouped[key].sort((a, b) => {
   // Prioriza 'order', depois alfabético
   const orderA = a.metadata.order ?? 99;
   const orderB = b.metadata.order ?? 99;
   if (orderA !== orderB) return orderA - orderB;
   return a.metadata.title.localeCompare(b.metadata.title);
  });
 });

 // Define a ordem dos Grupos na Sidebar
 const groupOrder = ['Começando', 'Componentes', 'Utilitários'];

 const result: DocGroup[] = Object.entries(grouped)
  .map(([groupName, items]) => ({ groupName, items }))
  .sort((a, b) => {
   const indexA = groupOrder.indexOf(a.groupName);
   const indexB = groupOrder.indexOf(b.groupName);
   // Se não estiver na lista groupOrder, vai para o final
   return (indexA === -1 ? 99 : indexA) - (indexB === -1 ? 99 : indexB);
  });

 return json(result);
}
