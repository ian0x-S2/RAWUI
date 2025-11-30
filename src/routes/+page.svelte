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

 // Estado para demonstração
 let currentVariant = $state<'default' | 'collapsible'>('default');
 let currentPath = $state('/dashboard');
</script>

{#snippet homeIcon()}
 <svg
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
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
  width="16"
  height="16"
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
  width="16"
  height="16"
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
  width="16"
  height="16"
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
  width="16"
  height="16"
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

<SidebarProvider variant={currentVariant} defaultOpen={true}>
 <div class="flex min-h-screen bg-background">
  <!-- Sidebar -->
  <Sidebar>
   <SidebarHeader>
    <div class="flex items-center gap-3 px-0">
     <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
      <span class="text-sm font-bold text-primary-foreground">A</span>
     </div>
     <span class="text-lg font-semibold">My App</span>
    </div>
   </SidebarHeader>

   <SidebarContent>
    <SidebarGroup>
     <SidebarGroupLabel>Principal</SidebarGroupLabel>

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

   <SidebarFooter>
    <div class="rounded-md bg-muted p-3">
     <div class="flex items-center gap-3">
      <div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
       <span class="text-xs font-medium text-primary-foreground">JD</span>
      </div>
      <div class="min-w-0 flex-1">
       <p class="truncate text-sm font-medium">John Doe</p>
       <p class="truncate text-xs text-muted-foreground">john@example.com</p>
      </div>
     </div>
    </div>
   </SidebarFooter>
  </Sidebar>

  <!-- Conteúdo principal com offset dinâmico via SidebarInset -->
  <SidebarInset>
   <!-- Header -->
   <header
    class="flex flex-row-reverse items-center gap-4 border-b bg-background px-4 py-3"
   >
    <SidebarTrigger />

    <div class="flex items-center gap-4">
     <h1 class="font-semibold">Sidebar Demo</h1>

     <div class="flex gap-2">
      <button
       class="rounded-md px-3 py-1.5 text-sm font-medium transition-colors {currentVariant ===
       'default'
        ? 'bg-primary text-primary-foreground'
        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}"
       onclick={() => (currentVariant = 'default')}
      >
       Default
      </button>
      <button
       class="rounded-md px-3 py-1.5 text-sm font-medium transition-colors {currentVariant ===
       'collapsible'
        ? 'bg-primary text-primary-foreground'
        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}"
       onclick={() => (currentVariant = 'collapsible')}
      >
       Collapsible
      </button>
     </div>
    </div>
   </header>

   <!-- Main content -->
   <div class="flex-1 p-6">
    <div class="mx-auto max-w-4xl space-y-6">
     <div>
      <h2 class="mb-2 text-2xl font-bold">Bem-vindo à {currentPath}</h2>
      <p class="text-muted-foreground">
       Variante atual: <span class="font-medium">{currentVariant}</span>
      </p>
     </div>

     <div class="grid gap-4 md:grid-cols-2">
      <div class="rounded-lg border p-4">
       <h3 class="mb-2 font-semibold">Variante Default</h3>
       <ul class="space-y-1 text-sm text-muted-foreground">
        <li>• Sempre aberta no desktop</li>
        <li>• Largura fixa (w-64)</li>
        <li>• Mobile: drawer que abre/fecha</li>
        <li>• SidebarTrigger controla drawer no mobile</li>
       </ul>
      </div>

      <div class="rounded-lg border p-4">
       <h3 class="mb-2 font-semibold">Variante Collapsible</h3>
       <ul class="space-y-1 text-sm text-muted-foreground">
        <li>• Desktop: pode colapsar (w-64 ↔ w-16)</li>
        <li>• Modo colapsado: só ícones</li>
        <li>• Mobile: ignora colapso, vira drawer</li>
        <li>• SidebarTrigger controla estado</li>
       </ul>
      </div>
     </div>

     <div class="rounded-lg border p-4">
      <h3 class="mb-2 font-semibold">Status Atual</h3>
      <div class="grid gap-2 text-sm">
       <div>
        <span class="text-muted-foreground">Variante:</span>
        <span class="ml-2 font-medium">{currentVariant}</span>
       </div>
       <div>
        <span class="text-muted-foreground">Página:</span>
        <span class="ml-2 font-medium">{currentPath}</span>
       </div>
      </div>
     </div>

     <div class="rounded-lg border bg-green-50 p-4 dark:bg-green-950">
      <h3 class="mb-2 font-semibold text-green-800 dark:text-green-200">
       ✓ Problema Resolvido!
      </h3>
      <p class="text-sm text-green-700 dark:text-green-300">
       O conteúdo principal agora é deslocado corretamente no desktop baseado no estado da
       sidebar usando o componente <code>SidebarInset</code>:
      </p>
      <ul class="mt-2 space-y-1 text-sm text-green-600 dark:text-green-400">
       <li>
        • <strong>Desktop + Default:</strong> margem fixa de 256px (ml-64)
       </li>
       <li>
        • <strong>Desktop + Collapsible aberta:</strong> margem de 256px (ml-64)
       </li>
       <li>
        • <strong>Desktop + Collapsible fechada:</strong> margem de 64px (ml-16)
       </li>
       <li>• <strong>Mobile:</strong> sem margem, sidebar é overlay</li>
      </ul>
     </div>

     <div class="rounded-lg border p-4">
      <h3 class="mb-2 font-semibold">Como testar:</h3>
      <ol class="list-inside list-decimal space-y-1 text-sm text-muted-foreground">
       <li>Alterne entre as variantes usando os botões acima</li>
       <li>Use o botão ☰ (SidebarTrigger) para controlar a sidebar</li>
       <li>Redimensione a tela para ver o comportamento mobile (drawer)</li>
       <li>No modo collapsible desktop, observe como os ícones ficam centralizados</li>
       <li>Labels de grupo desaparecem quando colapsada no desktop</li>
       <li>
        <strong>Novo:</strong> O componente SidebarInset cuida do offset automaticamente!
       </li>
      </ol>
     </div>
    </div>
   </div>
  </SidebarInset>
 </div>
</SidebarProvider>
