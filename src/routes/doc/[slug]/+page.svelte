<!-- src/routes/doc/[slug]/+page.svelte -->
<script lang="ts">
 import { fade, fly } from 'svelte/transition';
 import type { PageData } from './$types';
 import TableOfContents from '$lib/intern/TableOfContents.svelte';
 import SourceCodeViewer from '$lib/components/SourceCodeViewer.svelte';

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

<!-- Layout mais limpo, removido grid background, espaçamento refinado -->
<div class="min-h-screen w-full bg-background text-foreground">
 <div class="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
  <div class="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_220px]">
   <!-- MAIN -->
   <main class="min-w-0" in:fade={{ duration: 150 }}>
    <!-- Header simplificado com breadcrumb minimal -->
    <header class="mb-12">
     <nav class="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
      <a href="/docs" class="transition-colors hover:text-foreground">Docs</a>
      <span class="text-muted-foreground/40">/</span>
      <span class="text-foreground">{data.meta?.title}</span>
     </nav>

     <!-- Título e descrição com hierarquia visual clara -->
     <h1 class="text-3xl font-semibold tracking-tight text-foreground lg:text-4xl">
      {data.meta?.title ?? 'Sem Título'}
     </h1>
     {#if data.meta?.description}
      <p class="mt-3 text-base text-muted-foreground lg:text-lg">
       {data.meta.description}
      </p>
     {/if}

     <!-- Botões mais sutis, inline com header -->
     <div class="mt-6 flex items-center gap-2">
      {#if data.sourceFiles && data.sourceFiles.length > 0}
       <button
        onclick={openSourceDialog}
        class="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
       >
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
        Código
        <span class="rounded bg-muted px-1 py-0.5 text-[10px] tabular-nums">
         {data.sourceFiles.length}
        </span>
       </button>
      {/if}

      <button
       onclick={copyRaw}
       class="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
       {#if copied}
        <span
         in:fly={{ y: -4, duration: 150 }}
         class="flex items-center gap-1.5 text-emerald-500"
        >
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
         Copiado
        </span>
       {:else}
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
        Copiar
       {/if}
      </button>
     </div>
    </header>

    <!-- Conteúdo sem container/borda, prose refinado -->
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

   <!-- Sidebar mais minimalista -->
   <aside class="hidden lg:block">
    <div class="sticky top-20">
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
