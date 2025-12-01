<script lang="ts">
 import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
 import SidebarProvider from '$lib/components/sidebar/SidebarProvider.svelte';
 import SidebarTrigger from '$lib/components/sidebar/SidebarTrigger.svelte';
 import SidebarInset from '$lib/components/sidebar/SidebarInset.svelte';
 import SidebarHeader from '$lib/components/sidebar/SidebarHeader.svelte';
 import SidebarContent from '$lib/components/sidebar/SidebarContent.svelte';
 import SidebarFooter from '$lib/components/sidebar/SidebarFooter.svelte';
 import SidebarGroup from '$lib/components/sidebar/SidebarGroup.svelte';
 import SidebarGroupLabel from '$lib/components/sidebar/SidebarGroupLabel.svelte';
 import SidebarItem from '$lib/components/sidebar/SidebarItem.svelte';

 // --- ESTADO DA PÁGINA ---
 let currentVariant = $state<'default' | 'collapsible'>('default');
 let currentPath = $state('/dashboard');
</script>

<!--
  ========================================
  SNIPPETS (ÍCONES E LOGOS)
  Definidos aqui para não depender de libs externas
  ========================================
-->

{#snippet teamLogo()}
 <div
  class="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
 >
  <svg
   xmlns="http://www.w3.org/2000/svg"
   class="size-5"
   viewBox="0 0 24 24"
   fill="none"
   stroke="currentColor"
   stroke-width="2"
   stroke-linecap="round"
   stroke-linejoin="round"
  >
   <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
  </svg>
 </div>
{/snippet}

{#snippet homeIcon()}
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
  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  <polyline points="9,22 9,12 15,12 15,22" />
 </svg>
{/snippet}

{#snippet analyticsIcon()}
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
  <path d="M3 3v18h18" />
  <path d="m19 9-5 5-4-4-3 3" />
 </svg>
{/snippet}

{#snippet settingsIcon()}
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
  <circle cx="12" cy="12" r="3" />
  <path
   d="M12 2a10 10 0 0 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
  />
 </svg>
{/snippet}

{#snippet userIcon()}
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
  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
  <circle cx="12" cy="7" r="4" />
 </svg>
{/snippet}

{#snippet helpIcon()}
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
  <circle cx="12" cy="12" r="10" />
  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
  <circle cx="12" cy="17" r="0.01" />
 </svg>
{/snippet}
{#snippet footerIcon()}
 <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
  <span class="text-xs font-bold text-primary">JD</span>
 </div>
{/snippet}
<!--
  ========================================
  LAYOUT PRINCIPAL
  ========================================
-->

<SidebarProvider variant={currentVariant} defaultOpen={true}>
 <!--
    SIDEBAR ESQUERDA
    Não precisa de wrapper extra, o Provider cuida disso.
 -->
 <Sidebar>
  <!-- HEADER: Logo + Nome da Empresa -->
  <SidebarHeader icon={teamLogo} label="Acme Inc." />

  <!-- CONTENT: Links de Navegação -->
  <SidebarContent>
   <!-- Grupo 1: Principal -->
   <SidebarGroup>
    <SidebarItem
     icon={homeIcon}
     label="Dashboard"
     href="/dashboard"
     active={currentPath === '/dashboard'}
     onclick={() => (currentPath = '/dashboard')}
    />

    <SidebarItem
     icon={analyticsIcon}
     label="Analytics"
     href="/analytics"
     active={currentPath === '/analytics'}
     onclick={() => (currentPath = '/analytics')}
    />

    <SidebarItem
     icon={settingsIcon}
     label="Configurações"
     href="/settings"
     active={currentPath === '/settings'}
     onclick={() => (currentPath = '/settings')}
    />
   </SidebarGroup>

   <!-- Grupo 2: Usuário -->
   <SidebarGroup>
    <SidebarGroupLabel>Conta</SidebarGroupLabel>

    <SidebarItem
     icon={userIcon}
     label="Perfil"
     href="/profile"
     active={currentPath === '/profile'}
     onclick={() => (currentPath = '/profile')}
    />

    <SidebarItem
     icon={helpIcon}
     label="Ajuda"
     href="/help"
     active={currentPath === '/help'}
     onclick={() => (currentPath = '/help')}
    />
   </SidebarGroup>
  </SidebarContent>

  <!-- FOOTER: Perfil do Usuário -->
  <SidebarFooter icon={footerIcon} label="Jhon@email.com"></SidebarFooter>
 </Sidebar>

 <!--
    CONTEÚDO PRINCIPAL (INSET)
    Empurrado automaticamente pela sidebar (Ghost Gap)
 -->
 <SidebarInset>
  <!-- Header do Conteúdo -->
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

  <!-- Corpo do Conteúdo -->
  <div class="flex flex-1 flex-col gap-4 bg-muted/10 p-4 md:p-8">
   <!-- Grid de Cards de Exemplo -->
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

   <!-- Área Maior de Conteúdo -->
   <div class="min-h-[100vh] flex-1 rounded-xl border bg-muted/50 p-8 md:min-h-min">
    <div class="max-w-2xl">
     <h2 class="mb-2 text-lg font-semibold">Como a nova Sidebar funciona:</h2>
     <ul class="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
      <li>
       <strong>Provider:</strong> Define as variáveis CSS <code>--sidebar-width</code>.
      </li>
      <li>
       <strong>Desktop:</strong> Cria um elemento invisível (relative) que empurra este conteúdo
       automaticamente.
      </li>
      <li><strong>Mobile:</strong> Vira um drawer (overlay) sem empurrar o conteúdo.</li>
      <li>
       <strong>Animação:</strong> Usa <code>ease-linear</code> e <code>duration-200</code>
       igual ao original do React.
      </li>
     </ul>
    </div>
   </div>
  </div>
 </SidebarInset>
</SidebarProvider>
