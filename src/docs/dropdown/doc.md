---
title: Dropdown Menu
description: Menu suspenso para exibir ações e opções, acionado por um botão. Posicionamento automático, navegação por teclado e acessível.
---

<script>
  import { 
    DropdownMenu, 
    DropdownTrigger, 
    DropdownContent, 
    DropdownItem,
    DropdownSeparator,
    DropdownLabel
  } from '$lib/components/dropdown/index';
  import CodeBlock from '$lib/intern/CodeBlock.svelte';
</script>

Um componente dropdown totalmente acessível para exibir menus de ações, opções de usuário e navegação contextual.

## Instalação

Copie e cole os arquivos do componente no seu projeto:

```bash
src/lib/components/dropdown/
├── DropdownMenu.svelte
├── DropdownTrigger.svelte
├── DropdownContent.svelte
├── DropdownItem.svelte
├── DropdownSeparator.svelte
├── DropdownLabel.svelte
├── ctx.svelte.ts
└── index.ts
```

**Dependências necessárias:**

```bash
npm install @floating-ui/dom
```

> **Nota:** O componente `DropdownTrigger` depende das variantes de botão (`buttonVariants`). Certifique-se de ter o componente Button configurado ou ajuste a importação. O `DropdownContent` utiliza um componente `Portal`.

## Uso Básico

<div class="preview border rounded-lg p-10 flex items-center justify-center min-h-[200px]">
  <DropdownMenu>
    <DropdownTrigger>Abrir Menu</DropdownTrigger>
    <DropdownContent>
      <DropdownItem>Perfil</DropdownItem>
      <DropdownItem>Configurações</DropdownItem>
      <DropdownItem>Ajuda</DropdownItem>
      <DropdownItem>Sair</DropdownItem>
    </DropdownContent>
  </DropdownMenu>
</div>

<CodeBlock language="svelte" code={
`<script lang="ts">
  import { 
    DropdownMenu, 
    DropdownTrigger, 
    DropdownContent, 
    DropdownItem 
  } from '$lib/components/dropdown/index';
</script>

<DropdownMenu>
  <DropdownTrigger>Abrir Menu</DropdownTrigger>
  <DropdownContent>
    <DropdownItem>Perfil</DropdownItem>
    <DropdownItem>Configurações</DropdownItem>
    <DropdownItem>Ajuda</DropdownItem>
    <DropdownItem>Sair</DropdownItem>
  </DropdownContent>
</DropdownMenu>
`} />

## Funcionalidades

- **Posicionamento Inteligente** - Usa Floating UI para garantir que o menu sempre fique visível na tela.
- **Portal** - Renderiza o conteúdo no `<body>` evitando problemas de z-index e overflow.
- **Acessível** - ARIA completo e navegação por teclado (Setas, Enter, Esc, Home, End).
- **Auto-close** - Fecha automaticamente ao clicar fora ou pressionar Esc.
- **Customizável** - Aceita classes CSS e conteúdo rico (ícones, avatares, etc).

## Exemplos

### Com Ações e Ícones

<div class="preview border rounded-lg p-10 flex items-center justify-center min-h-[200px]">
  <DropdownMenu>
    <DropdownTrigger variant="default">Ações</DropdownTrigger>
    <DropdownContent>
      <DropdownItem class="gap-2" onclick={() => alert('Editar')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
        Editar
      </DropdownItem>
      <DropdownItem class="gap-2" onclick={() => alert('Duplicar')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
        Duplicar
      </DropdownItem>
      <DropdownItem class="gap-2" onclick={() => alert('Arquivar')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>
        Arquivar
      </DropdownItem>
      <DropdownSeparator />
      <DropdownItem class="gap-2 text-destructive focus:text-destructive" onclick={() => alert('Deletar')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
        Deletar
      </DropdownItem>
    </DropdownContent>
  </DropdownMenu>
</div>

<CodeBlock language="svelte" code={
`<DropdownMenu>
  <DropdownTrigger variant="default">Ações</DropdownTrigger>
  <DropdownContent>
    <DropdownItem class="gap-2" onclick={() => handleEdit()}>
      <EditIcon class="h-4 w-4" />
      Editar
    </DropdownItem>
    <DropdownItem class="gap-2" onclick={() => handleDuplicate()}>
      <CopyIcon class="h-4 w-4" />
      Duplicar
    </DropdownItem>
    <DropdownItem class="gap-2" onclick={() => handleArchive()}>
      <ArchiveIcon class="h-4 w-4" />
      Arquivar
    </DropdownItem>
    <DropdownSeparator />
    <DropdownItem 
      class="gap-2 text-destructive focus:text-destructive" 
      onclick={() => handleDelete()}
    >
      <TrashIcon class="h-4 w-4" />
      Deletar
    </DropdownItem>
  </DropdownContent>
</DropdownMenu>
`} />

### Com Separadores e Labels

<div class="preview border rounded-lg p-10 flex items-center justify-center min-h-[200px]">
  <DropdownMenu>
    <DropdownTrigger>Opções</DropdownTrigger>
    <DropdownContent class="w-56">
      <DropdownLabel>Minha Conta</DropdownLabel>
      <DropdownSeparator />
      <DropdownItem class="gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        Perfil
      </DropdownItem>
      <DropdownItem class="gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
        Configurações
      </DropdownItem>
      <DropdownSeparator />
      <DropdownLabel>Equipe</DropdownLabel>
      <DropdownSeparator />
      <DropdownItem class="gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        Membros
      </DropdownItem>
      <DropdownItem class="gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
        Convites
      </DropdownItem>
    </DropdownContent>
  </DropdownMenu>
</div>

<CodeBlock language="svelte" code={
`<DropdownMenu>
  <DropdownTrigger>Opções</DropdownTrigger>
  <DropdownContent class="w-56">
    <DropdownLabel>Minha Conta</DropdownLabel>
    <DropdownSeparator />
    <DropdownItem>Perfil</DropdownItem>
    <DropdownItem>Configurações</DropdownItem>
    <DropdownSeparator />
    <DropdownLabel>Equipe</DropdownLabel>
    <DropdownSeparator />
    <DropdownItem>Membros</DropdownItem>
    <DropdownItem>Convites</DropdownItem>
  </DropdownContent>
</DropdownMenu>
`} />

### Posicionamento

O componente ajusta automaticamente a posição para não sair da tela. Você pode definir a posição preferencial:

<div class="preview border rounded-lg p-10 flex items-center justify-center gap-4 min-h-[200px] flex-wrap">
  <DropdownMenu placement="top">
    <DropdownTrigger>Top</DropdownTrigger>
    <DropdownContent>
      <DropdownItem>Item 1</DropdownItem>
      <DropdownItem>Item 2</DropdownItem>
      <DropdownItem>Item 3</DropdownItem>
    </DropdownContent>
  </DropdownMenu>

  <DropdownMenu placement="right">
    <DropdownTrigger>Right</DropdownTrigger>
    <DropdownContent>
      <DropdownItem>Item 1</DropdownItem>
      <DropdownItem>Item 2</DropdownItem>
      <DropdownItem>Item 3</DropdownItem>
    </DropdownContent>
  </DropdownMenu>

  <DropdownMenu placement="bottom">
    <DropdownTrigger>Bottom</DropdownTrigger>
    <DropdownContent>
      <DropdownItem>Item 1</DropdownItem>
      <DropdownItem>Item 2</DropdownItem>
      <DropdownItem>Item 3</DropdownItem>
    </DropdownContent>
  </DropdownMenu>

  <DropdownMenu placement="left">
    <DropdownTrigger>Left</DropdownTrigger>
    <DropdownContent>
      <DropdownItem>Item 1</DropdownItem>
      <DropdownItem>Item 2</DropdownItem>
      <DropdownItem>Item 3</DropdownItem>
    </DropdownContent>
  </DropdownMenu>
</div>

<CodeBlock language="svelte" code={
`<DropdownMenu placement="top">...</DropdownMenu>
<DropdownMenu placement="top-start">...</DropdownMenu>
<DropdownMenu placement="top-end">...</DropdownMenu>

<DropdownMenu placement="bottom">...</DropdownMenu>
<DropdownMenu placement="bottom-start">...</DropdownMenu>
<DropdownMenu placement="bottom-end">...</DropdownMenu>

<DropdownMenu placement="left">...</DropdownMenu>
<DropdownMenu placement="left-start">...</DropdownMenu>
<DropdownMenu placement="left-end">...</DropdownMenu>

<DropdownMenu placement="right">...</DropdownMenu>
<DropdownMenu placement="right-start">...</DropdownMenu>
<DropdownMenu placement="right-end">...</DropdownMenu>
`} />


## Estilização

Todos os componentes aceitam a prop `class` para customização. As classes padrão usam variáveis CSS do Tailwind:

<CodeBlock language="svelte" code={
`<!-- Dropdown com largura customizada -->
<DropdownContent class="w-64">
  ...
</DropdownContent>

<!-- Item com estilo de perigo -->
<DropdownItem class="text-destructive focus:text-destructive focus:bg-destructive/10">
  Deletar
</DropdownItem>

<!-- Item com gap para ícone -->
<DropdownItem class="gap-2 font-semibold">
  <Icon />
  Texto
</DropdownItem>

<!-- Label com cor customizada -->
<DropdownLabel class="text-primary">
  Seção Principal
</DropdownLabel>
`} />

## Exemplo Completo

Menu dropdown completo com múltiplas seções, ícones, informações de usuário e lógica de navegação.

<div class="preview border rounded-lg p-10 flex items-center justify-center min-h-[400px]">
  <DropdownMenu placement="bottom-end">
    <DropdownTrigger variant="ghost" size="icon" class="rounded-full">
      <div class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white font-semibold">
        JD
      </div>
    </DropdownTrigger>
    
    <DropdownContent class="w-64">
      <DropdownLabel>John Doe</DropdownLabel>
      <div class="px-2 text-xs text-muted-foreground pb-2">john@example.com</div>
      
      <DropdownSeparator />
      
      <DropdownLabel>Minha Conta</DropdownLabel>
      <DropdownItem class="gap-2" onclick={() => alert('Navegar: Perfil')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        Perfil
      </DropdownItem>
      <DropdownItem class="gap-2" onclick={() => alert('Navegar: Configurações')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
        Configurações
      </DropdownItem>
      <DropdownItem class="gap-2" onclick={() => alert('Navegar: Assinatura')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
        Assinatura
      </DropdownItem>
      
      <DropdownSeparator />
      
      <DropdownLabel>Equipe</DropdownLabel>
      <DropdownItem class="gap-2" onclick={() => alert('Navegar: Membros')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        Membros da equipe
      </DropdownItem>
      <DropdownItem class="gap-2" onclick={() => alert('Navegar: Convidar')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
        Convidar membros
      </DropdownItem>
      
      <DropdownSeparator />
      
      <DropdownItem class="gap-2" onclick={() => alert('Navegar: Ajuda')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
        Central de ajuda
      </DropdownItem>
      
      <DropdownSeparator />
      
      <DropdownItem 
        class="gap-2 text-destructive focus:text-destructive focus:bg-destructive/10"
        onclick={() => alert('Logout realizado')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
        Sair
      </DropdownItem>
    </DropdownContent>
  </DropdownMenu>
</div>

<CodeBlock language="svelte" code={
`<script>
  import { goto } from '$app/navigation';
  import { 
    DropdownMenu, 
    DropdownTrigger, 
    DropdownContent, 
    DropdownItem,
    DropdownSeparator,
    DropdownLabel 
  } from '$lib/components/dropdown';
  import { 
    UserIcon, 
    SettingsIcon, 
    CreditCardIcon,
    UsersIcon,
    UserPlusIcon,
    HelpCircleIcon,
    LogOutIcon
  } from '$lib/icons';
  
  let user = {
    name: "John Doe",
    email: "john@example.com",
    initials: "JD"
  };
  
  function handleLogout() {
    goto('/login');
  }
</script>

<DropdownMenu placement="bottom-end">
  <DropdownTrigger variant="ghost" size="icon" class="rounded-full">
    <div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
      {user.initials}
    </div>
  </DropdownTrigger>
  
  <DropdownContent class="w-64">
    <DropdownLabel>{user.name}</DropdownLabel>
    <div class="px-2 text-xs text-muted-foreground pb-2">{user.email}</div>
    
    <DropdownSeparator />
    
    <DropdownLabel>Minha Conta</DropdownLabel>
    <DropdownItem class="gap-2" onclick={() => goto('/profile')}>
      <UserIcon class="h-4 w-4" />
      Perfil
    </DropdownItem>
    <DropdownItem class="gap-2" onclick={() => goto('/settings')}>
      <SettingsIcon class="h-4 w-4" />
      Configurações
    </DropdownItem>
    <DropdownItem class="gap-2" onclick={() => goto('/billing')}>
      <CreditCardIcon class="h-4 w-4" />
      Assinatura
    </DropdownItem>
    
    <DropdownSeparator />
    
    <DropdownLabel>Equipe</DropdownLabel>
    <DropdownItem class="gap-2" onclick={() => goto('/team')}>
      <UsersIcon class="h-4 w-4" />
      Membros da equipe
    </DropdownItem>
    <DropdownItem class="gap-2" onclick={() => goto('/team/invite')}>
      <UserPlusIcon class="h-4 w-4" />
      Convidar membros
    </DropdownItem>
    
    <DropdownSeparator />
    
    <DropdownItem class="gap-2" onclick={() => goto('/help')}>
      <HelpCircleIcon class="h-4 w-4" />
      Central de ajuda
    </DropdownItem>
    
    <DropdownSeparator />
    
    <DropdownItem 
      class="gap-2 text-destructive focus:text-destructive focus:bg-destructive/10"
      onclick={handleLogout}
    >
      <LogOutIcon class="h-4 w-4" />
      Sair
    </DropdownItem>
  </DropdownContent>
</DropdownMenu>
`} />

## Navegação por Teclado

O componente possui suporte completo para navegação por teclado:

| Tecla | Ação |
| :--- | :--- |
| `Space` / `Enter` | Abre o menu (quando focado no trigger) |
| `↓` (Seta para baixo) | Abre o menu e foca no primeiro item |
| `↑` (Seta para cima) | Abre o menu e foca no último item |
| `↓` / `↑` (Menu aberto) | Navega entre os itens (com loop) |
| `Enter` / `Space` | Seleciona o item focado |
| `Home` | Foca no primeiro item |
| `End` | Foca no último item |
| `Esc` | Fecha o menu e retorna o foco ao trigger |
| `Tab` | Fecha o menu |

## API Reference

### DropdownMenu

Componente raiz que gerencia o estado do dropdown.

| Prop | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `placement` | `Placement` | `'bottom'` | Posição preferencial do menu. Valores: `top`, `right`, `bottom`, `left` e suas variações com `-start` e `-end` |
| `children` | `Snippet` | - | Conteúdo (deve incluir `DropdownTrigger` e `DropdownContent`) |

### DropdownTrigger

Botão que abre/fecha o dropdown.

| Prop | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `variant` | `string` | `'outline'` | Estilo do botão: `default`, `outline`, `ghost`, `secondary`, `destructive`, `link` |
| `size` | `string` | `'default'` | Tamanho do botão: `default`, `sm`, `lg`, `icon` |
| `class` | `string` | - | Classes CSS adicionais |
| `children` | `Snippet` | - | Conteúdo do botão |
| `...props` | `HTMLButtonAttributes` | - | Aceita todas as props de um `<button>` |

### DropdownContent

Container do menu suspenso.

| Prop | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `class` | `string` | - | Classes CSS adicionais |
| `children` | `Snippet` | - | Itens do menu |
| `...props` | `HTMLAttributes` | - | Aceita todas as props de um `<div>` |

### DropdownItem

Item individual do menu.

| Prop | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `onclick` | `(e: MouseEvent) => void` | - | Função executada ao clicar no item |
| `class` | `string` | - | Classes CSS adicionais |
| `children` | `Snippet` | - | Conteúdo do item |
| `...props` | `HTMLAttributes` | - | Aceita todas as props de um `<div>` |

### DropdownSeparator

Linha divisória para separar grupos de itens.

| Prop | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `class` | `string` | - | Classes CSS adicionais |
| `...props` | `HTMLAttributes` | - | Aceita todas as props de um `<div>` |

### DropdownLabel

Label não clicável para agrupar ou identificar seções.

| Prop | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `class` | `string` | - | Classes CSS adicionais |
| `children` | `Snippet` | - | Conteúdo do label |
| `...props` | `HTMLAttributes` | - | Aceita todas as props de um `<div>` |
