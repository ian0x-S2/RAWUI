<!-- src/routes/doc/[slug]/+page.svelte -->
<script lang="ts">
 import { fade, fly } from 'svelte/transition';
 import type { PageData } from './$types';
 import TableOfContents from '$lib/intern/TableOfContents.svelte';

 let { data }: { data: PageData } = $props();

 let copied = $state(false);

 // Função para copiar o markdown cru
 function copyRaw() {
  if (!data.raw) return;
  navigator.clipboard.writeText(data.raw);
  copied = true;
  setTimeout(() => (copied = false), 2000);
 }
</script>

<div class="relative min-h-screen w-full bg-background pb-20 text-foreground">
 <div
  class="bg-subtle-grid mask-gradient fixed inset-0 top-0 -z-10 h-[500px] opacity-50"
 ></div>

 <div class="container mx-auto max-w-7xl px-4 py-8 md:py-12 lg:py-14">
  <div
   class="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_240px] xl:grid-cols-[1fr_280px] xl:gap-16"
  >
   <!-- COLUNA PRINCIPAL -->
   <main class="min-w-0" in:fade={{ duration: 200 }}>
    <!-- Header e Botão Copiar -->
    <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
     <div class="flex items-center gap-2 text-sm text-muted-foreground">
      <span class="cursor-pointer transition-colors hover:text-foreground">Docs</span>
      <span class="opacity-30">/</span>
      <span class="font-medium text-foreground">{data.meta?.title}</span>
     </div>

     <!-- Botão Copiar Markdown -->
     <button
      onclick={copyRaw}
      class="flex items-center gap-2 self-start rounded-lg border border-border/40 bg-muted/30 px-4 py-2 text-xs font-medium transition-all hover:bg-muted/50 hover:text-foreground sm:self-auto"
     >
      {#if copied}
       <div in:fly={{ y: 5 }} class="flex items-center gap-2 text-emerald-500">
        <svg
         xmlns="http://www.w3.org/2000/svg"
         width="14"
         height="14"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         stroke-width="2"
         stroke-linecap="round"
         stroke-linejoin="round"><path d="M20 6 9 17l-5-5" /></svg
        >
        Copiado!
       </div>
      {:else}
       <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        ><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path
         d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
        /></svg
       >
       Copiar Markdown
      {/if}
     </button>
    </div>

    <!-- Container do Conteúdo -->
    <div
     class="relative min-h-[500px] rounded-xl border border-border/50 bg-card/30 p-8 shadow-sm md:p-10"
    >
     <!-- Cabeçalho Interno (Título/Desc) -->
     <div class="mb-10 space-y-4 border-b border-border/40 pb-8">
      {#if data.meta?.description}
       <h1 class="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl">
        {data.meta?.title ?? 'Sem Título'}
       </h1>
       <p class="text-lg font-light text-muted-foreground">
        {data.meta.description}
       </p>
      {/if}
     </div>

     <!-- Conteúdo Renderizado -->
     <div
      class="prose max-w-none prose-zinc dark:prose-invert
             prose-headings:font-semibold prose-headings:tracking-tight
             prose-h2:mt-12 prose-h2:border-b prose-h2:pb-2 prose-h2:text-2xl
             prose-p:leading-7 prose-p:text-muted-foreground
             prose-a:font-medium prose-a:text-primary prose-a:no-underline hover:prose-a:underline
             prose-code:rounded prose-code:bg-muted/50 prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
             prose-pre:bg-zinc-950 prose-img:rounded-lg prose-img:border"
     >
      {#key data.meta.title}
       <data.content />
      {/key}
     </div>
    </div>
   </main>

   <!-- SIDEBAR TOC -->
   <aside class="hidden lg:block" transition:fade>
    <div class="sticky top-24 max-h-[calc(100vh-8rem)]">
     <div
      class="mb-4 text-xs font-semibold tracking-wider text-muted-foreground/50 uppercase"
     >
      Nesta página
     </div>
     {#key data.meta.title}
      <TableOfContents />
     {/key}
    </div>
   </aside>
  </div>
 </div>
</div>

<style>
 .bg-subtle-grid {
  background-size: 40px 40px;
  background-image: linear-gradient(
    to right,
    hsl(var(--border) / 0.1) 1px,
    transparent 1px
   ),
   linear-gradient(to bottom, hsl(var(--border) / 0.1) 1px, transparent 1px);
 }

 .mask-gradient {
  mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
 }
</style>
