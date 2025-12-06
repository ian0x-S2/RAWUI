<script lang="ts">
 import { page } from '$app/state';
 import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
 import SidebarInset from '$lib/components/sidebar/SidebarInset.svelte';
 import SidebarHeader from '$lib/components/sidebar/SidebarHeader.svelte';
 import SidebarContent from '$lib/components/sidebar/SidebarContent.svelte';
 import SidebarFooter from '$lib/components/sidebar/SidebarFooter.svelte';
 import SidebarGroup from '$lib/components/sidebar/SidebarGroup.svelte';
 import SidebarGroupLabel from '$lib/components/sidebar/SidebarGroupLabel.svelte';
 import SidebarItem from '$lib/components/sidebar/SidebarItem.svelte';
 import SidebarTrigger from '$lib/components/sidebar/SidebarTrigger.svelte';
 import ModeToggle from '$lib/components/theme-toggle/ModeToggle.svelte';
 import type { Snippet } from 'svelte';
 import type { LayoutData } from './$types'; // O tipo gerado automaticamente já vai ter o merge!

 interface Props {
  children: Snippet;
  data: LayoutData; // O VS Code agora sabe que data tem sidebarOpen E docsTree
 }

 let { children, data }: Props = $props();

 function isActive(href: string) {
  // Use startsWith para manter ativo em sub-rotas se necessário, ou === para exato
  return page.url.pathname === href;
 }
</script>

<!-- ... Snippets (teamLogo, etc) permanecem iguais ... -->
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

{#snippet footerIcon()}
 <div
  class="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary"
 >
  JD
 </div>
{/snippet}

<Sidebar side="left">
 <SidebarHeader class="" icon={teamLogo} label="Acme Inc." />

 <SidebarContent>
  <SidebarGroup>
   <SidebarGroupLabel>Aplicação</SidebarGroupLabel>
   <SidebarItem label="Dashboard" href="/dashboard" active={isActive('/dashboard')} />
  </SidebarGroup>

  <!-- Loop Dinâmico de Grupos -->
  {#if data.docsTree && data.docsTree.length > 0}
   <!-- Adicionado (group.groupName) como chave única -->
   {#each data.docsTree as group (group.groupName)}
    <SidebarGroup>
     <SidebarGroupLabel>{group.groupName}</SidebarGroupLabel>
     <!-- Adicionado (doc.slug) como chave única -->
     {#each group.items as doc (doc.slug)}
      {@const docUrl = `/docs/${doc.slug}`}
      <!-- Ajuste: rota correta geralmente é /doc/slug -->
      <SidebarItem label={doc.metadata.title} href={docUrl} active={isActive(docUrl)}>
       {#snippet icon()}
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
         class="lucide lucide-file-text"
         ><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path
          d="M14 2v4a2 2 0 0 0 2 2h4"
         /></svg
        >
       {/snippet}
      </SidebarItem>
     {/each}
    </SidebarGroup>
   {/each}
  {:else}
   <div class="p-4 text-xs text-muted-foreground">Carregando docs...</div>
  {/if}
 </SidebarContent>
 <SidebarFooter icon={footerIcon} label="john@acme.com" />
</Sidebar>

<SidebarInset>
 {@render children()}
</SidebarInset>
