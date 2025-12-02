<script lang="ts">
 import './layout.css';
 import type { LayoutProps } from './$types';

 // 1. Importe o Provider do Next-Themes
 import ThemeProvider from '$lib/components/theme-toggle/ThemeProvider.svelte';

 import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
 import SidebarProvider from '$lib/components/sidebar/SidebarProvider.svelte';
 import SidebarInset from '$lib/components/sidebar/SidebarInset.svelte';
 import SidebarHeader from '$lib/components/sidebar/SidebarHeader.svelte';
 import SidebarContent from '$lib/components/sidebar/SidebarContent.svelte';
 import SidebarFooter from '$lib/components/sidebar/SidebarFooter.svelte';
 import SidebarGroup from '$lib/components/sidebar/SidebarGroup.svelte';
 import SidebarGroupLabel from '$lib/components/sidebar/SidebarGroupLabel.svelte';
 import SidebarItem from '$lib/components/sidebar/SidebarItem.svelte';
 import SidebarTrigger from '$lib/components/sidebar/SidebarTrigger.svelte'; // Não esqueça o Trigger
 import ModeToggle from '$lib/components/theme-toggle/ModeToggle.svelte';

 let { data, children }: LayoutProps = $props();

 let currentPath = $state('/dashboard');
</script>

<!-- Snippets de Ícones (Mantidos iguais) -->
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
   ><path
    d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"
   /></svg
  >
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
  ><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline
   points="9,22 9,12 15,12 15,22"
  /></svg
 >
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
  stroke-linejoin="round"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg
 >
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
  ><circle cx="12" cy="12" r="3" /><path
   d="M12 2a10 10 0 0 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
  /></svg
 >
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
  ><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle
   cx="12"
   cy="7"
   r="4"
  /></svg
 >
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
  ><circle cx="12" cy="12" r="10" /><path
   d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
  /><circle cx="12" cy="17" r="0.01" /></svg
 >
{/snippet}

{#snippet footerIcon()}
 <div
  class="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary"
 >
  JD
 </div>
{/snippet}

<!--
  ========================================
  LAYOUT
  ========================================
-->

<!--
  2. ThemeProvider envolve tudo.
  - attribute="class": Fundamental para Tailwind (adiciona class="dark" no html)
  - defaultTheme="system": Respeita o SO do usuário
  - enableSystem: Ativa listeners de mudança de preferência do SO
-->
<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
 <SidebarProvider variant="collapsible" open={data.sidebarOpen}>
  <!-- SIDEBAR -->
  <Sidebar>
   <SidebarHeader class="" icon={teamLogo} label="Acme Inc." />

   <SidebarContent>
    <SidebarGroup>
     <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
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

   <SidebarFooter icon={footerIcon} label="john@acme.com" />
  </Sidebar>

  <!-- INSET (CONTEÚDO PRINCIPAL) -->
  <SidebarInset>
   <!--
    3. Header do Conteúdo
    Adicionei um header simples para alinhar o Trigger e o Toggle
   -->
   <header
    class="flex h-14 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
   >
    <div class="flex items-center gap-2">
     <SidebarTrigger class="-ml-1" />
    </div>
    <div class="ml-auto">
     <!-- ModeToggle agora é independente, não precisa de props -->
     <ModeToggle />
    </div>
   </header>

   <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
    {@render children()}
   </div>
  </SidebarInset>
 </SidebarProvider>
</ThemeProvider>
