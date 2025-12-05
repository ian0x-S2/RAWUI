---
title: Dropdown Menu
description: Menu suspenso acessível para exibir ações contextuais. Inclui posicionamento automático, navegação por teclado e suporte a submenus.
componentId: dropdown
---

<script>
  import { 
    DropdownMenu, 
    DropdownTrigger, 
    DropdownContent, 
    DropdownItem,
    DropdownSeparator,
    DropdownLabel,
    DropdownSub,
    DropdownSubTrigger,
    DropdownSubContent,
    DropdownSubItem
  } from '$lib/components/dropdown/index';
  import CodeBlock from '$lib/intern/CodeBlock.svelte';
</script>

O componente Dropdown Menu oferece uma forma elegante de exibir listas de ações ou opções em um menu suspenso. Totalmente acessível, com navegação por teclado completa e suporte a submenus de um nível.

## Instalação

Copie os arquivos do componente para o seu projeto:

<CodeBlock language="bash" code={
`src/lib/components/dropdown/
├── DropdownMenu.svelte
├── DropdownTrigger.svelte
├── DropdownContent.svelte
├── DropdownItem.svelte
├── DropdownSeparator.svelte
├── DropdownLabel.svelte
├── DropdownSub.svelte
├── DropdownSubTrigger.svelte
├── DropdownSubContent.svelte
├── DropdownSubItem.svelte
├── ctx.svelte.ts
└── index.ts
`} />

**Dependência externa:**

<CodeBlock language="bash" code={`npm install @floating-ui/dom`} />

> O `DropdownTrigger` utiliza as variantes do componente Button (`buttonVariants`). O `DropdownContent` e `DropdownSubContent` dependem do componente `Portal`.

## Uso Básico

O dropdown é composto por um trigger (botão) e um conteúdo que aparece ao clicar:

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
`<script>
  import { 
    DropdownMenu, 
    DropdownTrigger, 
    DropdownContent, 
    DropdownItem 
  } from '$lib/components/dropdown';
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

## Recursos

- **Posicionamento Inteligente** — O menu se ajusta automaticamente para permanecer visível na tela
- **Portal** — O conteúdo é renderizado no `<body>`, evitando problemas de z-index e overflow
- **Acessibilidade** — Atributos ARIA e navegação completa por teclado
- **Auto-close** — Fecha ao clicar fora, pressionar Esc ou selecionar um item
- **Submenus** — Suporte a um nível de submenus com abertura por hover ou teclado

## Exemplos

### Itens com Ícones

Adicione ícones aos itens usando a classe `gap-2` para espaçamento adequado:

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
    <DropdownItem class="gap-2" onclick={handleEdit}>
      <EditIcon class="h-4 w-4" />
      Editar
    </DropdownItem>
    <DropdownItem class="gap-2" onclick={handleDuplicate}>
      <CopyIcon class="h-4 w-4" />
      Duplicar
    </DropdownItem>
    <DropdownItem class="gap-2" onclick={handleArchive}>
      <ArchiveIcon class="h-4 w-4" />
      Arquivar
    </DropdownItem>
    <DropdownSeparator />
    <DropdownItem 
      class="gap-2 text-destructive focus:text-destructive" 
      onclick={handleDelete}
    >
      <TrashIcon class="h-4 w-4" />
      Deletar
    </DropdownItem>
  </DropdownContent>
</DropdownMenu>
`} />

### Separadores e Labels

Organize os itens em grupos usando `DropdownLabel` e `DropdownSeparator`:

<div class="preview border rounded-lg p-10 flex items-center justify-center min-h-[200px]">
  <DropdownMenu>
    <DropdownTrigger>Minha Conta</DropdownTrigger>
    <DropdownContent class="w-56">
      <DropdownLabel>Conta</DropdownLabel>
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
        Convidar
      </DropdownItem>
    </DropdownContent>
  </DropdownMenu>
</div>

<CodeBlock language="svelte" code={
`<DropdownMenu>
  <DropdownTrigger>Minha Conta</DropdownTrigger>
  <DropdownContent class="w-56">
    <DropdownLabel>Conta</DropdownLabel>
    <DropdownSeparator />
    <DropdownItem>Perfil</DropdownItem>
    <DropdownItem>Configurações</DropdownItem>
    <DropdownSeparator />
    <DropdownLabel>Equipe</DropdownLabel>
    <DropdownSeparator />
    <DropdownItem>Membros</DropdownItem>
    <DropdownItem>Convidar</DropdownItem>
  </DropdownContent>
</DropdownMenu>
`} />

### Submenus

Crie menus hierárquicos com `DropdownSub`, `DropdownSubTrigger`, `DropdownSubContent` e `DropdownSubItem`. O submenu abre ao passar o mouse ou navegar com as teclas de seta:

<div class="preview border rounded-lg p-10 flex items-center justify-center min-h-[250px]">
  <DropdownMenu>
    <DropdownTrigger>Opções</DropdownTrigger>
    <DropdownContent class="w-48">
      <DropdownItem class="gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
        Nova foto
      </DropdownItem>
      <DropdownSeparator />
      <DropdownSub>
        <DropdownSubTrigger class="gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
          Convidar usuários
        </DropdownSubTrigger>
        <DropdownSubContent>
          <DropdownSubItem onclick={() => alert('E-mail')}>
            Por e-mail
          </DropdownSubItem>
          <DropdownSubItem onclick={() => alert('Link')}>
            Por link
          </DropdownSubItem>
          <DropdownSeparator />
          <DropdownSubItem onclick={() => alert('Contatos')}>
            Da lista de contatos
          </DropdownSubItem>
        </DropdownSubContent>
      </DropdownSub>
      <DropdownSub>
        <DropdownSubTrigger class="gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
          Compartilhar
        </DropdownSubTrigger>
        <DropdownSubContent>
          <DropdownSubItem onclick={() => alert('Twitter')}>
            Twitter
          </DropdownSubItem>
          <DropdownSubItem onclick={() => alert('Facebook')}>
            Facebook
          </DropdownSubItem>
          <DropdownSubItem onclick={() => alert('LinkedIn')}>
            LinkedIn
          </DropdownSubItem>
        </DropdownSubContent>
      </DropdownSub>
      <DropdownSeparator />
      <DropdownItem class="gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
        Configurações
      </DropdownItem>
    </DropdownContent>
  </DropdownMenu>
</div>

<CodeBlock language="svelte" code={
`<script>
  import { 
    DropdownMenu, 
    DropdownTrigger, 
    DropdownContent, 
    DropdownItem,
    DropdownSeparator,
    DropdownSub,
    DropdownSubTrigger,
    DropdownSubContent,
    DropdownSubItem
  } from '$lib/components/dropdown';
</script>

<DropdownMenu>
  <DropdownTrigger>Opções</DropdownTrigger>
  <DropdownContent class="w-48">
    <DropdownItem>Nova foto</DropdownItem>
    <DropdownSeparator />
    
    <DropdownSub>
      <DropdownSubTrigger>Convidar usuários</DropdownSubTrigger>
      <DropdownSubContent>
        <DropdownSubItem onclick={handleEmailInvite}>
          Por e-mail
        </DropdownSubItem>
        <DropdownSubItem onclick={handleLinkInvite}>
          Por link
        </DropdownSubItem>
        <DropdownSeparator />
        <DropdownSubItem onclick={handleContactsInvite}>
          Da lista de contatos
        </DropdownSubItem>
      </DropdownSubContent>
    </DropdownSub>
    
    <DropdownSub>
      <DropdownSubTrigger>Compartilhar</DropdownSubTrigger>
      <DropdownSubContent>
        <DropdownSubItem onclick={() => shareOn('twitter')}>
          Twitter
        </DropdownSubItem>
        <DropdownSubItem onclick={() => shareOn('facebook')}>
          Facebook
        </DropdownSubItem>
        <DropdownSubItem onclick={() => shareOn('linkedin')}>
          LinkedIn
        </DropdownSubItem>
      </DropdownSubContent>
    </DropdownSub>
    
    <DropdownSeparator />
    <DropdownItem>Configurações</DropdownItem>
  </DropdownContent>
</DropdownMenu>
`} />

### Posicionamento

Defina a posição preferencial do menu através da prop `placement`. O componente ajusta automaticamente se não houver espaço:

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
`<!-- Posições básicas -->
<DropdownMenu placement="top">...</DropdownMenu>
<DropdownMenu placement="bottom">...</DropdownMenu>
<DropdownMenu placement="left">...</DropdownMenu>
<DropdownMenu placement="right">...</DropdownMenu>

<!-- Com alinhamento -->
<DropdownMenu placement="top-start">...</DropdownMenu>
<DropdownMenu placement="top-end">...</DropdownMenu>
<DropdownMenu placement="bottom-start">...</DropdownMenu>
<DropdownMenu placement="bottom-end">...</DropdownMenu>
`} />

## Estilização

Todos os componentes aceitam a prop `class` para customização:

<CodeBlock language="svelte" code={
`<!-- Largura customizada -->
<DropdownContent class="w-64">
  ...
</DropdownContent>

<!-- Item com estilo de perigo -->
<DropdownItem class="text-destructive focus:text-destructive focus:bg-destructive/10">
  Deletar
</DropdownItem>

<!-- Item com ícone -->
<DropdownItem class="gap-2">
  <Icon class="h-4 w-4" />
  Texto
</DropdownItem>

<!-- Label customizado -->
<DropdownLabel class="text-primary">
  Seção Principal
</DropdownLabel>
`} />

## Exemplo Completo

Menu de usuário com avatar, múltiplas seções e submenu:

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
      
      <DropdownItem class="gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        Perfil
      </DropdownItem>
      <DropdownItem class="gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
        Configurações
      </DropdownItem>
      
      <DropdownSeparator />
      
      <DropdownSub>
        <DropdownSubTrigger class="gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
          Tema
        </DropdownSubTrigger>
        <DropdownSubContent>
          <DropdownSubItem>Claro</DropdownSubItem>
          <DropdownSubItem>Escuro</DropdownSubItem>
          <DropdownSubItem>Sistema</DropdownSubItem>
        </DropdownSubContent>
      </DropdownSub>
      
      <DropdownSeparator />
      
      <DropdownItem 
        class="gap-2 text-destructive focus:text-destructive focus:bg-destructive/10"
        onclick={() => alert('Logout')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
        Sair
      </DropdownItem>
    </DropdownContent>
  </DropdownMenu>
</div>

## Navegação por Teclado

### Menu Principal

| Tecla | Ação |
| :--- | :--- |
| `Space` / `Enter` | Abre o menu (no trigger) ou seleciona o item focado |
| `↓` | Abre o menu e foca no primeiro item / Move para o próximo item |
| `↑` | Abre o menu e foca no último item / Move para o item anterior |
| `Home` | Foca no primeiro item |
| `End` | Foca no último item |
| `Esc` | Fecha o menu e retorna o foco ao trigger |
| `Tab` | Fecha o menu |

### Submenus

| Tecla | Ação |
| :--- | :--- |
| `→` / `Enter` / `Space` | Abre o submenu (no trigger do submenu) |
| `←` / `Esc` | Fecha o submenu e retorna ao item pai |
| `↓` / `↑` | Navega entre os itens do submenu |

## API Reference

### DropdownMenu

Componente raiz que gerencia o estado do dropdown.

| Prop | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `placement` | `Placement` | `'bottom'` | Posição preferencial: `top`, `bottom`, `left`, `right` e variações com `-start` / `-end` |
| `children` | `Snippet` | — | Deve conter `DropdownTrigger` e `DropdownContent` |

### DropdownTrigger

Botão que abre/fecha o dropdown.

| Prop | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `variant` | `string` | `'outline'` | `default`, `outline`, `ghost`, `secondary`, `destructive`, `link` |
| `size` | `string` | `'default'` | `default`, `sm`, `lg`, `icon` |
| `class` | `string` | — | Classes CSS adicionais |
| `children` | `Snippet` | — | Conteúdo do botão |

### DropdownContent

Container do menu suspenso.

| Prop | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `class` | `string` | — | Classes CSS adicionais |
| `children` | `Snippet` | — | Itens do menu |

### DropdownItem

Item clicável do menu.

| Prop | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `onclick` | `(e: MouseEvent) => void` | — | Callback ao clicar |
| `class` | `string` | — | Classes CSS adicionais |
| `children` | `Snippet` | — | Conteúdo do item |

### DropdownSeparator

Linha divisória entre grupos de itens.

| Prop | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `class` | `string` | — | Classes CSS adicionais |

### DropdownLabel

Texto não interativo para identificar seções.

| Prop | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `class` | `string` | — | Classes CSS adicionais |
| `children` | `Snippet` | — | Texto do label |

### DropdownSub

Wrapper para criar um submenu.

| Prop | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `children` | `Snippet` | — | Deve conter `DropdownSubTrigger` e `DropdownSubContent` |

### DropdownSubTrigger

Item que abre o submenu ao hover ou teclado.

| Prop | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `class` | `string` | — | Classes CSS adicionais |
| `children` | `Snippet` | — | Conteúdo (texto e ícone opcional) |

### DropdownSubContent

Container do submenu.

| Prop | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `class` | `string` | — | Classes CSS adicionais |
| `children` | `Snippet` | — | Itens do submenu |

### DropdownSubItem

Item clicável dentro do submenu.

| Prop | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `onclick` | `(e: MouseEvent) => void` | — | Callback ao clicar |
| `class` | `string` | — | Classes CSS adicionais |
| `children` | `Snippet` | — | Conteúdo do item |
