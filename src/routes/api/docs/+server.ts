import { json } from '@sveltejs/kit';
import type { DocItem, DocGroup } from '$lib/types/docs';

export async function GET() {
 const allFiles = import.meta.glob('/src/docs/**/*.md', { eager: true });
 const docs: DocItem[] = [];

 for (const path in allFiles) {
  const file = allFiles[path] as any;
  const metadata = file.metadata;

  if (!metadata || metadata.published === false) continue;

  const pathParts = path.split('/');
  const filename = pathParts.pop();
  const folder = pathParts.pop();

  let slug = filename === 'doc.md' ? folder : filename?.replace('.md', '');

  if (!slug) continue;

  docs.push({
   slug,
   metadata: {
    ...metadata,
    group: metadata.group || 'Outros'
   }
  });
 }

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

 Object.keys(grouped).forEach((key) => {
  grouped[key].sort((a, b) => {
   const orderA = a.metadata.order ?? 99;
   const orderB = b.metadata.order ?? 99;
   if (orderA !== orderB) return orderA - orderB;
   return a.metadata.title.localeCompare(b.metadata.title);
  });
 });

 const groupOrder = ['Getting Started', 'Components', 'Utils'];

 const result: DocGroup[] = Object.entries(grouped)
  .map(([groupName, items]) => ({ groupName, items }))
  .sort((a, b) => {
   const indexA = groupOrder.indexOf(a.groupName);
   const indexB = groupOrder.indexOf(b.groupName);
   return (indexA === -1 ? 99 : indexA) - (indexB === -1 ? 99 : indexB);
  });

 return json(result);
}
