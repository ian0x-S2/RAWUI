<script lang="ts">
 import { tick } from 'svelte';

 type HeadingData = {
  id: string;
  text: string;
  element: HTMLElement;
 };

 let headings = $state<HeadingData[]>([]);
 let activeId = $state<string>('');
 let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
 let isManualScrolling = false;

 async function updateHeadings() {
  await tick();
  const elements = Array.from(document.querySelectorAll('.prose h2')) as HTMLElement[];

  const idCounts = new Map<string, number>();

  headings = elements
   .map((elem) => {
    let id = elem.id;
    const text = elem.innerText;

    if (!id) return null;

    // Se o ID já existe, adicionar um sufixo
    if (idCounts.has(id)) {
     const count = idCounts.get(id)! + 1;
     idCounts.set(id, count);
     id = `${id}-${count}`;
     // Atualizar o ID do elemento também
     elem.id = id;
    } else {
     idCounts.set(id, 0);
    }

    return {
     id,
     text,
     element: elem
    };
   })
   .filter((h): h is HeadingData => h !== null);

  if (!activeId && headings.length > 0) {
   handleScroll();
  }
 }

 function handleScroll() {
  if (isManualScrolling || headings.length === 0) return;

  const scrollY = window.scrollY;
  const offset = 120;
  let newActiveId = '';

  for (let i = headings.length - 1; i >= 0; i--) {
   const heading = headings[i];
   const rect = heading.element.getBoundingClientRect();
   const elementTop = rect.top + scrollY;

   if (elementTop <= scrollY + offset) {
    newActiveId = heading.id;
    break;
   }
  }

  if (newActiveId !== activeId) {
   activeId = newActiveId;
  }
 }

 function scrollToHeading(e: MouseEvent, id: string) {
  e.preventDefault();
  const element = document.getElementById(id);
  if (!element) return;

  if (scrollTimeout) {
   clearTimeout(scrollTimeout);
  }

  isManualScrolling = true;
  activeId = id;

  window.history.pushState(null, '', `#${id}`);

  const y = element.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top: y, behavior: 'smooth' });

  scrollTimeout = setTimeout(() => {
   isManualScrolling = false;
   handleScroll();
  }, 1200);
 }

 $effect(() => {
  updateHeadings();

  let rafId: number;
  const throttledScroll = () => {
   if (rafId) return;
   rafId = requestAnimationFrame(() => {
    handleScroll();
    rafId = 0;
   });
  };

  window.addEventListener('scroll', throttledScroll, { passive: true });
  window.addEventListener('resize', updateHeadings);

  const observer = new MutationObserver(updateHeadings);
  const prose = document.querySelector('.prose');
  if (prose) {
   observer.observe(prose, { childList: true, subtree: true });
  }

  return () => {
   window.removeEventListener('scroll', throttledScroll);
   window.removeEventListener('resize', updateHeadings);
   observer.disconnect();
   if (scrollTimeout) clearTimeout(scrollTimeout);
   if (rafId) cancelAnimationFrame(rafId);
  };
 });
</script>

{#if headings.length > 0}
 <nav class="fixed top-35 hidden max-h-[calc(100vh-6rem)] w-64 overflow-y-auto lg:block">
  <h4 class="mb-4 text-sm font-semibold tracking-tight text-foreground">Nesta página</h4>
  <ul class="space-y-0.5 border-l border-border/60 text-sm">
   {#each headings as heading (heading.id)}
    <li>
     <a
      href="#{heading.id}"
      onclick={(e) => scrollToHeading(e, heading.id)}
      class="
             -ml-px block border-l-2 py-1.5 pl-4 transition-colors duration-200 ease-in-out
             hover:text-foreground
             {activeId === heading.id
       ? 'border-primary text-primary'
       : 'border-transparent text-muted-foreground hover:border-border'}
           "
     >
      {heading.text}
     </a>
    </li>
   {/each}
  </ul>
 </nav>
{/if}
