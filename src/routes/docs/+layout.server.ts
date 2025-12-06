// src/routes/doc/+layout.server.ts
import type { LayoutServerLoad } from './$types';
import type { DocGroup } from '$lib/types/docs';

export const load: LayoutServerLoad = async ({ fetch }) => {
 // 1. Opcional: Pegar dados do pai se precisar (await parent())
 // mas aqui não precisamos explicitamente pois o Svelte faz merge no frontend

 // 2. Fetch específico desta área
 const response = await fetch('/api/docs');
 let docsTree: DocGroup[] = [];

 if (response.ok) {
  docsTree = await response.json();
 }

 return {
  docsTree // Retorna APENAS o que é novo para esta rota
 };
};
