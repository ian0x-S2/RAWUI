<script lang="ts">
 import { fade, fly } from 'svelte/transition';
 import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
 } from '$lib/components/dialog';
 import Highlight from 'svelte-highlight';
 import typescript from 'svelte-highlight/languages/typescript';
 import javascript from 'svelte-highlight/languages/javascript';
 import xml from 'svelte-highlight/languages/xml';
 import { useTheme } from '$lib/components/theme-toggle/state/theme.svelte';
 import type { SourceFile } from '$lib/utils/component-loader';
 import { getFileIcon } from '$lib/utils/component-loader';

 const themeState = useTheme();

 let {
  files = [],
  componentName = 'Componente',
  open = $bindable(false)
 }: { files: SourceFile[]; componentName?: string; open?: boolean } = $props();

 let selectedFile = $state<SourceFile | null>(null);
 let copied = $state(false);
 let sidebarOpen = $state(true);
 let isMobile = $state(false);

 let themeFileName = $derived(themeState.theme === 'dark' ? 'github-dark' : 'github');

 let lineCount = $derived(selectedFile ? selectedFile.code.trim().split('\n').length : 0);
 let fileSize = $derived(
  selectedFile
   ? (new TextEncoder().encode(selectedFile.code).length / 1024).toFixed(1) + ' KB'
   : '0 KB'
 );

 $effect(() => {
  const checkMobile = () => {
   isMobile = window.innerWidth < 768;
   if (!isMobile) sidebarOpen = true;
   if (isMobile && open) sidebarOpen = false;
  };

  checkMobile();
  window.addEventListener('resize', checkMobile);
  return () => window.removeEventListener('resize', checkMobile);
 });

 $effect(() => {
  if (files.length > 0) {
   selectedFile = files[0];
  } else {
   selectedFile = null;
  }
 });

 function getLanguage(filename: string) {
  if (filename.endsWith('.svelte')) return xml;
  if (filename.endsWith('.ts')) return typescript;
  if (filename.endsWith('.js')) return javascript;
  return typescript;
 }

 function copyCode() {
  if (!selectedFile) return;
  navigator.clipboard.writeText(selectedFile.code);
  copied = true;
  setTimeout(() => (copied = false), 2000);
 }

 function selectFile(file: SourceFile) {
  selectedFile = file;
  if (isMobile) sidebarOpen = false;
 }
</script>

<svelte:head>
 <link
  rel="stylesheet"
  href={`https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/${themeFileName}.min.css`}
 />
</svelte:head>

{#if files.length > 0}
 <Dialog bind:open>
  <DialogContent
   class="mx-2 flex h-[85vh] w-[95vw] max-w-6xl flex-col gap-0 overflow-hidden border border-border/50 bg-background p-0 shadow-2xl sm:rounded-xl"
  >
   <DialogHeader class="sr-only">
    <DialogTitle>Code: {componentName}</DialogTitle>
    <DialogDescription>Source code viewer.</DialogDescription>
   </DialogHeader>

   <div
    class="flex h-12 shrink-0 items-center justify-between border-b border-border/40 bg-muted/20 pr-12 pl-4 select-none"
   >
    <div class="flex items-center gap-3">
     <button
      onclick={() => (sidebarOpen = !sidebarOpen)}
      class="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
      aria-label={sidebarOpen ? 'Fechar Explorador' : 'Abrir Explorador'}
      type="button"
     >
      <svg
       xmlns="http://www.w3.org/2000/svg"
       width="18"
       height="18"
       viewBox="0 0 24 24"
       fill="none"
       stroke="currentColor"
       stroke-width="2"
       stroke-linecap="round"
       stroke-linejoin="round"
      >
       <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
       <path d="M9 3v18" />
      </svg>
     </button>

     {#if selectedFile}
      <div class="flex items-center gap-2 text-sm text-foreground/80">
       <span class="nerd-icon">{getFileIcon(selectedFile.name)}</span>
       <span class="font-mono text-xs font-medium">{selectedFile.name}</span>
      </div>
     {/if}
    </div>

    <div class="flex items-center gap-2">
     <button
      onclick={copyCode}
      type="button"
      class="group flex h-8 items-center gap-2 rounded-md border border-transparent px-3 text-xs font-medium text-muted-foreground transition-all hover:border-border/50 hover:bg-background hover:text-foreground hover:shadow-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
     >
      {#if copied}
       <span class="nerd-icon text-sm text-emerald-500">{'\uf00c'}</span>
       <span class="text-emerald-500">Copied</span>
      {:else}
       <span class="nerd-icon text-sm group-hover:text-foreground">{'\uf0c5'}</span>
       <span>Copy</span>
      {/if}
     </button>
    </div>
   </div>

   <div class="relative flex min-h-0 flex-1">
    {#if isMobile && sidebarOpen}
     <button
      type="button"
      class="absolute inset-0 z-30 cursor-default bg-background/80 backdrop-blur-[2px]"
      onclick={() => (sidebarOpen = false)}
      aria-label="Fechar menu lateral"
      transition:fade={{ duration: 150 }}
     ></button>
    {/if}

    {#if sidebarOpen}
     <div
      transition:fly={{ x: -20, duration: 200 }}
      class="absolute inset-y-0 left-0 z-40 w-64 border-r border-border/40 bg-background shadow-lg md:static md:bg-muted/10 md:shadow-none"
     >
      <div class="flex h-full flex-col">
       <div
        class="flex h-9 shrink-0 items-center px-4 text-[10px] font-bold tracking-widest text-muted-foreground/60 uppercase"
       >
        Explorer
       </div>

       <div class="custom-scrollbar flex-1 overflow-y-auto px-2 py-1">
        {#each files as file (file.name)}
         <button
          type="button"
          onclick={() => selectFile(file)}
          class="group relative flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-[13px] transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none
          {selectedFile?.name === file.name
           ? 'bg-primary/10 font-medium text-foreground'
           : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'}"
         >
          {#if selectedFile?.name === file.name}
           <div
            class="absolute top-1/2 left-0 h-4 w-0.5 -translate-y-1/2 rounded-full bg-primary"
           ></div>
          {/if}

          <span class="nerd-icon shrink-0 text-base opacity-90"
           >{getFileIcon(file.name)}</span
          >
          <span class="truncate">{file.name}</span>
         </button>
        {/each}
       </div>
      </div>
     </div>
    {/if}

    <div class="flex min-w-0 flex-1 flex-col bg-background">
     {#if selectedFile}
      <div class="relative flex-1 overflow-hidden">
       <div class="code-scroll custom-scrollbar h-full w-full overflow-auto">
        {#key selectedFile.name}
         <div class="flex min-w-full" in:fade={{ duration: 150 }}>
          <div
           class="shrink-0 border-r border-border/20 bg-muted/5 py-4 pr-3 pl-3 text-right font-mono text-xs leading-6 text-muted-foreground/40 select-none"
           aria-hidden="true"
          >
           {#each Array(lineCount) as _, i (i)}
            <div class="h-6">{i + 1}</div>
           {/each}
          </div>

          <div class="flex-1 py-4 pr-4 pl-4">
           <Highlight
            language={getLanguage(selectedFile.name)}
            code={selectedFile.code}
           />
          </div>
         </div>
        {/key}
       </div>
      </div>

      <div
       class="flex h-6 shrink-0 items-center justify-between border-t border-border/40 bg-primary/5 px-3 text-[10px] font-medium text-muted-foreground select-none"
      >
       <div class="flex items-center gap-3">
        <span class="nerd-icon">{'\ue0a0'}</span>
        <span>main</span>
       </div>
       <div class="flex items-center gap-4">
        <span>Ln {lineCount}</span>
        <span class="hidden sm:inline">UTF-8</span>
        <span>{fileSize}</span>
        <span class="text-primary/80 uppercase"
         >{getLanguage(selectedFile.name).name === 'xml'
          ? 'svelte'
          : getLanguage(selectedFile.name).name}</span
        >
       </div>
      </div>
     {:else}
      <div
       class="flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground/50"
      >
       <span class="nerd-icon text-5xl opacity-20">{'\uf1c9'}</span>
       <p class="text-sm">Select a file to view.</p>
      </div>
     {/if}
    </div>
   </div>
  </DialogContent>
 </Dialog>
{/if}

<style>
 @font-face {
  font-family: 'JetBrainsMono Nerd Font';
  src: url('https://cdn.jsdelivr.net/gh/ryanoasis/nerd-fonts@v3.2.1/patched-fonts/JetBrainsMono/Ligatures/Regular/JetBrainsMonoNerdFont-Regular.ttf')
   format('truetype');
  font-weight: 400;
  font-display: swap;
 }

 :global(.nerd-icon) {
  font-family: 'JetBrainsMono Nerd Font', monospace !important;
  font-weight: normal;
  font-style: normal;
  line-height: 1;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
 }

 .custom-scrollbar::-webkit-scrollbar {
  width: 10px;
  height: 10px;
 }
 .custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
 }
 .custom-scrollbar::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.2);
  border: 4px solid transparent;
  background-clip: content-box;
  border-radius: 99px;
 }
 .custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.4);
  border: 3px solid transparent;
  background-clip: content-box;
 }
 .custom-scrollbar::-webkit-scrollbar-corner {
  background: transparent;
 }

 :global(.code-scroll .hljs) {
  padding: 0 !important;
  background-color: transparent !important;
  font-family: 'JetBrainsMono Nerd Font', ui-monospace, monospace !important;
  font-size: 0.8rem;
  line-height: 1.5rem;
  tab-size: 2;
 }

 :global(.code-scroll pre) {
  margin: 0 !important;
  background: transparent !important;
  font-family: inherit !important;
 }
</style>
