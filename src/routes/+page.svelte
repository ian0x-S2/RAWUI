<script lang="ts">
 import SidebarTrigger from '$lib/components/sidebar/SidebarTrigger.svelte';

 // Estado local
 let currentVariant = $state<'default' | 'collapsible'>('default');
 let currentPath = $state('/dashboard');
</script>

<!-- HEADER DO CONTEÚDO -->
<header
 class="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4 shadow-sm"
>
 <SidebarTrigger />

 <div class="mx-2 h-4 w-px bg-border"></div>

 <h1 class="text-sm font-semibold text-foreground">
  {currentPath === '/dashboard' ? 'Visão Geral' : currentPath.replace('/', '')}
 </h1>

 <div class="ml-auto flex items-center gap-2">
  <span class="hidden text-xs text-muted-foreground sm:inline-block"
   >Modo da Sidebar:</span
  >
  <div class="flex rounded-md border bg-muted/20 p-1">
   <button
    onclick={() => (currentVariant = 'default')}
    class="rounded px-2 py-1 text-xs font-medium transition-colors {currentVariant ===
    'default'
     ? 'bg-white shadow-sm dark:bg-zinc-800'
     : 'text-muted-foreground hover:bg-muted/50'}"
   >
    Default
   </button>
   <button
    onclick={() => (currentVariant = 'collapsible')}
    class="rounded px-2 py-1 text-xs font-medium transition-colors {currentVariant ===
    'collapsible'
     ? 'bg-white shadow-sm dark:bg-zinc-800'
     : 'text-muted-foreground hover:bg-muted/50'}"
   >
    Collapsible
   </button>
  </div>
 </div>
</header>

<!-- CORPO DO CONTEÚDO -->
<div class="flex flex-1 flex-col gap-4 bg-muted/10 p-4 md:p-8">
 <!-- GRID DE CARDS -->
 <div class="grid auto-rows-min gap-4 md:grid-cols-3">
  <div
   class="flex aspect-video flex-col justify-between rounded-xl border bg-muted/50 p-4"
  >
   <span class="text-sm font-medium text-muted-foreground">Receita Total</span>
   <span class="text-2xl font-bold">R$ 45.231,89</span>
  </div>
  <div
   class="flex aspect-video flex-col justify-between rounded-xl border bg-muted/50 p-4"
  >
   <span class="text-sm font-medium text-muted-foreground">Assinaturas</span>
   <span class="text-2xl font-bold">+2350</span>
  </div>
  <div
   class="flex aspect-video flex-col justify-between rounded-xl border bg-muted/50 p-4"
  >
   <span class="text-sm font-medium text-muted-foreground">Ativos Agora</span>
   <span class="text-2xl font-bold">+573</span>
  </div>
 </div>

 <!-- CONTEÚDO GRANDE -->
 <div class="min-h-[100vh] flex-1 rounded-xl border bg-muted/50 p-8 md:min-h-min">
  <div class="max-w-2xl">
   <h2 class="mb-2 text-lg font-semibold">Setup Completo</h2>
   <ul class="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
    <li><strong>Ícones:</strong> SVGs definidos em snippets locais.</li>
    <li><strong>Flicker:</strong> Resolvido via Cookies + SSR.</li>
    <li><strong>Estilo:</strong> Mantido o estilo original com 3.5rem no ícone.</li>
    <li>
     <strong>Responsividade:</strong> Sidebar vira drawer no mobile automaticamente.
    </li>
   </ul>
  </div>
 </div>
</div>
