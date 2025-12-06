<!-- src/routes/doc/[slug]/+page.svelte -->
<script lang="ts">
 import { fade, fly } from 'svelte/transition';
 import type { PageData } from './$types';
 import TableOfContents from '$lib/intern/TableOfContents.svelte';
 import SourceCodeViewer from '$lib/intern/SourceCodeViewer.svelte';
 import { SidebarTrigger } from '$lib/components/sidebar/index.ts';
 import ModeToggle from '$lib/components/theme-toggle/ModeToggle.svelte';
 import Button from '$lib/components/button/Button.svelte';

 let { data }: { data: PageData } = $props();

 let copied = $state(false);
 let sourceDialogOpen = $state(false);

 function copyRaw() {
  if (!data.raw) return;
  navigator.clipboard.writeText(data.raw);
  copied = true;
  setTimeout(() => (copied = false), 2000);
 }

 function openSourceDialog() {
  sourceDialogOpen = true;
 }
</script>

<!-- SNIPPETS DE ÍCONES -->
{#snippet codeIcon()}
 <svg
  class="size-3.5"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
 >
  <polyline points="16 18 22 12 16 6" />
  <polyline points="8 6 2 12 8 18" />
 </svg>
{/snippet}

{#snippet copyIcon()}
 <svg
  class="size-3.5"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
 >
  <rect width="14" height="14" x="8" y="8" rx="2" />
  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
 </svg>
{/snippet}

{#snippet checkIcon()}
 <svg
  class="size-3.5"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
 >
  <path d="M20 6 9 17l-5-5" />
 </svg>
{/snippet}

<div class="min-h-screen w-full bg-background text-foreground">
 <!--
    HEADER COMPACTO E FLUTUANTE
    - top-4: Dá um respiro do topo.
    - mx-auto max-w-6xl: Centraliza e limita a largura igual ao conteúdo.
    - rounded-2xl border: Cria a "ilha" flutuante.
 -->
 <header
  class="sticky top-4 z-50 mx-auto flex h-12 max-w-6xl shrink-0 items-center gap-2 rounded-full bg-background/80 px-4 shadow-xs backdrop-blur-md transition-all supports-[backdrop-filter]:bg-background/60"
 >
  <div class="flex items-center gap-2">
   <SidebarTrigger class="h-8   w-8 border-none shadow-none hover:bg-background" />
  </div>
  <div class="ml-auto">
   <!-- ModeToggle geralmente já tem seu próprio container, ajustando escala se necessário -->
   <div class="scale-90">
    <ModeToggle />
   </div>
  </div>
 </header>

 <div class="mx-auto max-w-6xl px-6 py-8 lg:px-8 lg:py-12">
  <div class="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_220px]">
   <!-- MAIN -->
   <main class="min-w-0" in:fade={{ duration: 150 }}>
    <!-- Header do Artigo -->
    <header class="mb-12">
     <nav class="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
      <a href="/docs" class="transition-colors hover:text-foreground">Docs</a>
      <span class="text-muted-foreground/40">/</span>
      <span class="text-foreground">{data.meta?.title}</span>
     </nav>

     <!-- Título e descrição -->
     <h1 class="text-3xl font-semibold tracking-tight text-foreground lg:text-4xl">
      {data.meta?.title ?? 'Sem Título'}
     </h1>
     {#if data.meta?.description}
      <p class="mt-3 text-base text-muted-foreground lg:text-lg">
       {data.meta.description}
      </p>
     {/if}

     <!-- AÇÕES: Substituído por Componentes Button -->
     <div class="mt-6 flex items-center gap-2">
      {#if data.sourceFiles && data.sourceFiles.length > 0}
       <Button
        variant="outline"
        size="sm"
        onclick={openSourceDialog}
        class="h-7 gap-1.5 px-3 text-xs font-medium text-muted-foreground"
       >
        {@render codeIcon()}
        Código
        <span
         class="ml-0.5 flex h-4 min-w-[1rem] items-center justify-center rounded-sm bg-muted px-1 text-[9px] text-foreground tabular-nums"
        >
         {data.sourceFiles.length}
        </span>
       </Button>
      {/if}

      <Button
       variant="outline"
       size="sm"
       onclick={copyRaw}
       class="h-7 gap-1.5 px-3 text-xs font-medium text-muted-foreground"
      >
       {#if copied}
        <span class="flex items-center gap-1.5 text-emerald-500">
         {@render checkIcon()}
         Copiado
        </span>
       {:else}
        {@render copyIcon()}
        Copiar
       {/if}
      </Button>
     </div>
    </header>

    <!-- Conteúdo do artigo -->
    <article
     class="prose max-w-none prose-neutral dark:prose-invert
      prose-headings:font-semibold prose-headings:tracking-tight
      prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-xl prose-h2:font-semibold
      prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-lg
      prose-p:leading-relaxed prose-p:text-muted-foreground
      prose-a:font-medium prose-a:text-foreground prose-a:underline prose-a:decoration-muted-foreground/40 prose-a:underline-offset-4 hover:prose-a:decoration-foreground
      prose-strong:font-medium prose-strong:text-foreground prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[13px] prose-code:font-normal
      prose-code:before:content-none prose-code:after:content-none prose-pre:rounded-lg
      prose-pre:bg-zinc-950
      prose-pre:text-sm
      prose-li:text-muted-foreground prose-img:rounded-lg"
    >
     {#key data.meta.title}
      <data.content />
     {/key}
    </article>
   </main>

   <!-- Sidebar Table of Contents -->
   <aside class="hidden lg:block">
    <!-- Top ajustado para compensar o header flutuante -->
    <div class="sticky top-24">
     {#key data.meta.title}
      <TableOfContents />
     {/key}
    </div>
   </aside>
  </div>
 </div>
</div>

<!-- Dialog de Código-fonte -->
{#if data.sourceFiles && data.sourceFiles.length > 0}
 <SourceCodeViewer
  files={data.sourceFiles}
  componentName={data.meta?.title ?? 'Componente'}
  bind:open={sourceDialogOpen}
 />
{/if}
