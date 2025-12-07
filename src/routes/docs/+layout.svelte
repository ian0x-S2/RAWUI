<script lang="ts">
 import { page } from '$app/state';
 import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
 import SidebarInset from '$lib/components/sidebar/SidebarInset.svelte';
 import SidebarHeader from '$lib/components/sidebar/SidebarHeader.svelte';
 import SidebarContent from '$lib/components/sidebar/SidebarContent.svelte';
 import SidebarGroup from '$lib/components/sidebar/SidebarGroup.svelte';
 import SidebarGroupLabel from '$lib/components/sidebar/SidebarGroupLabel.svelte';
 import SidebarItem from '$lib/components/sidebar/SidebarItem.svelte';
 import type { Snippet } from 'svelte';
 import type { LayoutData } from './$types';

 interface Props {
  children: Snippet;
  data: LayoutData;
 }

 let { children, data }: Props = $props();

 const isDocsPage = $derived(
  page.url.pathname.startsWith('/docs/') &&
   page.url.pathname !== '/docs' &&
   page.url.pathname !== '/docs/'
 );

 const isActive = (href: string) => page.url.pathname === href;
</script>

{#snippet logo()}
 <img
  src="/yy.svg"
  alt="RAWUI"
  class="h-4 w-4 transition-transform duration-500 hover:rotate-180 dark:invert"
 />
{/snippet}

{#if isDocsPage}
 <Sidebar side="left">
  <SidebarHeader class="text-md" icon={logo} label="RAWUI" />
  <SidebarContent>
   {#if data.docsTree?.length}
    {#each data.docsTree as group (group.groupName)}
     <SidebarGroup>
      <SidebarGroupLabel class="text-xs">{group.groupName}</SidebarGroupLabel>
      {#each group.items as doc (doc.slug)}
       <SidebarItem
        class="text-xs"
        label={doc.metadata.title}
        href="/docs/{doc.slug}"
        active={isActive(`/docs/${doc.slug}`)}
       />
      {/each}
     </SidebarGroup>
    {/each}
   {/if}
  </SidebarContent>
 </Sidebar>
 <SidebarInset>
  {@render children()}
 </SidebarInset>
{:else}
 {@render children()}
{/if}
