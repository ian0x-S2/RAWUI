// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
 // Lógica global (Theme, Sidebar State, Auth)
 const cookieState = cookies.get('sidebar:state');
 const sidebarOpen = cookieState === 'false' ? false : true;

 return {
  sidebarOpen
 };
};
