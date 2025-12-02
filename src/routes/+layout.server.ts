import type { LayoutServerLoad } from './$types';
export const load: LayoutServerLoad = async ({ cookies }) => {
 // 1. Lê o cookie. Se não existir, define 'true' (aberto) como padrão.
 const cookieState = cookies.get('sidebar:state');

 // 2. Converte string "false" para boolean false. Qualquer outra coisa vira true.
 const sidebarOpen = cookieState === 'false' ? false : true;

 return {
  sidebarOpen
 };
};
