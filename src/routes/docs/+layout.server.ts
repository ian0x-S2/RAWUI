import type { LayoutServerLoad } from './$types';
import type { DocGroup } from '$lib/types/docs';

export const load: LayoutServerLoad = async ({ fetch }) => {
 const response = await fetch('/api/docs');
 let docsTree: DocGroup[] = [];

 if (response.ok) {
  docsTree = await response.json();
 }

 return {
  docsTree
 };
};
