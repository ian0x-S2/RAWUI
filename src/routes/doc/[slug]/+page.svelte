<!-- src/routes/doc/[slug]/+page.svelte -->
<script lang="ts">
 import type { PageData } from './$types';
 import TableOfContents from '$lib/intern/TableOfContents.svelte';

 // Rune para pegar os dados
 let { data }: { data: PageData } = $props();
</script>

<!-- Container Principal com largura máxima e padding -->
<div class="container mx-auto max-w-7xl px-4 py-6 md:py-10">
 <!-- Layout Grid: 1 coluna no mobile, 2 colunas no desktop (Conteúdo + TOC) -->
 <div class="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_240px] xl:gap-14">
  <!-- COLUNA DA ESQUERDA: Conteúdo -->
  <main class="min-w-0">
   <!-- Cabeçalho do Artigo -->
   <div class="mb-6 space-y-2 border-b pb-4">
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
     {data.meta?.title ?? 'Sem Título'}
    </h1>

    {#if data.meta?.description}
     <p class="text-xl text-muted-foreground">
      {data.meta.description}
     </p>
    {/if}
   </div>

   <!-- O Conteúdo Markdown (Prose) -->
   <!--
				prose: Classe do Tailwind Typography
				dark:prose-invert: Cores corretas no dark mode
				max-w-none: Deixa o texto ocupar a largura da coluna grid
				prose-pre:bg-secondary: Estiliza blocos de código
			-->
   <div
    class="prose max-w-none prose-slate dark:prose-invert
						prose-headings:scroll-m-20 prose-headings:font-semibold
						prose-h2:mt-10 prose-h2:border-b prose-h2:pb-2
						prose-code:rounded prose-code:bg-secondary prose-code:px-1 prose-code:py-0.5
					  prose-pre:bg-secondary/50"
   >
    <!-- A chave aqui força o componente a recriar quando o slug muda,
					 garantindo que o TOC atualize corretamente -->
    {#key data.meta.title}
     <data.content />
    {/key}
   </div>
  </main>

  <!-- COLUNA DA DIREITA: TOC (Fixo) -->
  <!-- O componente já tem "hidden lg:block" internamente, mas podemos reforçar a estrutura -->
  <aside class="hidden text-sm lg:block">
   <!-- Passamos o key aqui também se o TOC depender de re-montagem -->
   {#key data.meta.title}
    <TableOfContents />
   {/key}
  </aside>
 </div>
</div>
