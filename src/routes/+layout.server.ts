import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
 const cookieState = cookies.get('sidebar:state');
 const sidebarOpen = cookieState === 'false' ? false : true;

 return {
  sidebarOpen
 };
};
