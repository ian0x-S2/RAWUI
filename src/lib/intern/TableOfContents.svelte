<script lang="ts">
 import { tick } from 'svelte';

 // Estado
 let headings = $state<{ id: string; text: string; depth: number }[]>([]);
 let activeId = $state<string>('');
 let isScrolling = $state(false);

 // Função segura para ler o DOM
 async function updateHeadings() {
  // Espera o Svelte terminar qualquer atualização pendente no DOM
  await tick();

  // Pequeno delay adicional para garantir que o markdown foi processado
  await new Promise((resolve) => setTimeout(resolve, 50));

  const elements = Array.from(document.querySelectorAll('.prose h2'));

  headings = elements
   .map((elem) => ({
    id: elem.id,
    text: (elem as HTMLElement).innerText,
    depth: Number(elem.tagName.substring(1))
   }))
   // BLINDAGEM: Filtra apenas itens que realmente tenham um ID
   .filter((h) => h.id && h.id.length > 0);
 }

 function handleClick(e: MouseEvent, id: string) {
  e.preventDefault();
  const element = document.getElementById(id);

  if (element) {
   // Marca que estamos fazendo scroll programático
   isScrolling = true;
   activeId = id;

   element.scrollIntoView({ behavior: 'smooth', block: 'start' });
   window.history.pushState(null, '', `#${id}`);

   // Desabilita o flag após a animação terminar
   setTimeout(() => {
    isScrolling = false;
   }, 1000);
  }
 }

 function handleScroll() {
  // Ignora scroll events durante navegação programática
  if (isScrolling) return;

  const scrollY = window.scrollY;
  const offset = 150;

  // Só tenta buscar se tivermos headings válidos
  if (headings.length === 0) return;

  for (const heading of headings) {
   // Proteção extra: verifica se o ID existe antes de buscar
   if (!heading.id) continue;

   const element = document.getElementById(heading.id);

   if (element && element.offsetTop - offset <= scrollY) {
    activeId = heading.id;
   }
  }
 }

 $effect(() => {
  updateHeadings();
  window.addEventListener('scroll', handleScroll);

  // Observa mudanças no DOM para detectar quando headings são adicionados
  const observer = new MutationObserver(() => {
   updateHeadings();
  });

  // Observa a div .prose por mudanças
  const proseElement = document.querySelector('.prose');
  if (proseElement) {
   observer.observe(proseElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['id']
   });
  }

  // Retry: Tenta novamente após 200ms caso não encontre headings
  const retryTimeout = setTimeout(() => {
   if (headings.length === 0) {
    updateHeadings();
   }
  }, 200);

  return () => {
   window.removeEventListener('scroll', handleScroll);
   observer.disconnect();
   clearTimeout(retryTimeout);
  };
 });
</script>

{#if headings.length > 0}
 <nav class="sticky top-24 hidden max-h-[calc(100vh-6rem)] w-64 overflow-y-auto lg:block">
  <h4 class="mb-4 text-sm font-semibold text-foreground">Nesta página</h4>

  <ul class="space-y-2 text-sm">
   {#each headings as heading (heading.id)}
    <li>
     <a
      href="#{heading.id}"
      class="block transition-all duration-200 ease-in-out hover:text-foreground
						{activeId === heading.id
       ? '-ml-0.5 border-l-2 border-primary pl-2 font-medium text-foreground'
       : 'text-muted-foreground'}"
      onclick={(e) => handleClick(e, heading.id)}
     >
      {heading.text}
     </a>
    </li>
   {/each}
  </ul>
 </nav>
{/if}
