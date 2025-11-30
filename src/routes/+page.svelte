<script lang="ts">
 import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
 import SidebarTrigger from '$lib/components/sidebar/SidebarTrigger.svelte';
 import SidebarHeader from '$lib/components/sidebar/SidebarHeader.svelte';
 import SidebarContent from '$lib/components/sidebar/SidebarContent.svelte';
 import SidebarFooter from '$lib/components/sidebar/SidebarFooter.svelte';
 import SidebarGroup from '$lib/components/sidebar/SidebarGroup.svelte';
 import SidebarGroupLabel from '$lib/components/sidebar/SidebarGroupLabel.svelte';
 import SidebarItem from '$lib/components/sidebar/SidebarItem.svelte';
 import SidebarDropdown from '$lib/components/sidebar/SidebarDropdown.svelte';

 let open = $state(false);
 let currentPath = $state('/dashboard');
</script>

<div class="flex h-screen justify-around">
 <Sidebar bind:open>
  <SidebarHeader>
   <div class="flex items-center gap-2 px-2">
    <div class="h-8 w-8 rounded-md bg-primary"></div>
    <span class="text-lg font-semibold">My App</span>
   </div>
  </SidebarHeader>

  <SidebarContent>
   <SidebarGroup>
    <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>

    <SidebarItem
     href="/dashboard"
     active={currentPath === '/dashboard'}
     onclick={() => (currentPath = '/dashboard')}
    >
     🏠 Dashboard
    </SidebarItem>

    <SidebarItem
     href="/analytics"
     active={currentPath === '/analytics'}
     onclick={() => (currentPath = '/analytics')}
    >
     📊 Analytics
    </SidebarItem>

    <SidebarDropdown label="Configurações">
     <SidebarItem
      href="/settings/profile"
      active={currentPath === '/settings/profile'}
      onclick={() => (currentPath = '/settings/profile')}
     >
      👤 Perfil
     </SidebarItem>

     <SidebarItem
      href="/settings/security"
      active={currentPath === '/settings/security'}
      onclick={() => (currentPath = '/settings/security')}
     >
      🔒 Segurança
     </SidebarItem>
    </SidebarDropdown>
   </SidebarGroup>

   <SidebarGroup>
    <SidebarGroupLabel>Outros</SidebarGroupLabel>

    <SidebarItem href="/help">❓ Ajuda</SidebarItem>
   </SidebarGroup>
  </SidebarContent>

  <SidebarFooter>
   <div class="rounded-md bg-muted p-3 text-sm">
    <p class="font-medium">John Doe</p>
    <p class="text-muted-foreground">john@example.com</p>
   </div>
  </SidebarFooter>
 </Sidebar>

 <div class="flex">
  <header class="border-b bg-background p-4">
   <SidebarTrigger bind:open />
  </header>

  <main class="p-6">
   <h1 class="text-3xl font-bold">Welcome to {currentPath}</h1>
   <p class="mt-2 text-muted-foreground">
    Este é um exemplo de sidebar moderna usando Svelte 5 runes
   </p>
  </main>
 </div>
</div>
