<script lang="ts">
 import { tick } from 'svelte';

 type HeadingData = {
  id: string;
  text: string;
  element: HTMLElement;
 };

 let headings = $state<HeadingData[]>([]);
 let activeId = $state<string>('');

 let ticking = false;
 let isManualScrolling = false;

 async function updateHeadings() {
  await tick();

  const elements = Array.from(document.querySelectorAll('.prose h2')) as HTMLElement[];

  headings = elements
   .map((elem) => ({
    id: elem.id,
    text: elem.innerText,
    element: elem
   }))
   .filter((h) => h.id);

  if (!activeId) handleScroll();
 }

 function handleScroll() {
  if (ticking || isManualScrolling) return;

  ticking = true;
  requestAnimationFrame(() => {
   const scrollY = window.scrollY;
   const offset = 120;

   for (let i = headings.length - 1; i >= 0; i--) {
    const heading = headings[i];
    if (heading.element.offsetTop <= scrollY + offset) {
     activeId = heading.id;
     ticking = false;
     return;
    }
   }

   if (headings.length > 0 && scrollY < headings[0].element.offsetTop) {
    activeId = '';
   }
   ticking = false;
  });
 }

 function scrollToHeading(e: MouseEvent, id: string) {
  e.preventDefault();
  const element = document.getElementById(id);
  if (!element) return;

  isManualScrolling = true;

  activeId = id;

  window.history.pushState(null, '', `#${id}`);

  const y = element.getBoundingClientRect().top + window.scrollY - 80;

  window.scrollTo({ top: y, behavior: 'smooth' });

  setTimeout(() => {
   isManualScrolling = false;
  }, 1000);
 }

 $effect(() => {
  updateHeadings();
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleScroll);

  const observer = new MutationObserver(updateHeadings);
  const prose = document.querySelector('.prose');
  if (prose) {
   observer.observe(prose, { childList: true, subtree: true });
  }

  return () => {
   window.removeEventListener('scroll', handleScroll);
   window.removeEventListener('resize', handleScroll);
   observer.disconnect();
  };
 });
</script>

{#if headings.length > 0}
 <nav class="sticky top-24 hidden max-h-[calc(100vh-6rem)] w-64 overflow-y-auto lg:block">
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
