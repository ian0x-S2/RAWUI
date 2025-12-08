---
title: Dialog
description: Modal overlay acessível para exibir conteúdo importante. Inclui foco automático, navegação por teclado, backdrop e gerenciamento de scroll.
componentId: dialog
---

<script>
  import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
    DialogClose
  } from '$lib/components/dialog/index';
  import CodeBlock from '$lib/intern/CodeBlock.svelte';

  let dialogOpen = $state(false);
</script>

O componente Dialog oferece uma forma elegante de exibir conteúdo modal acessível. Totalmente acessível, com foco automático, navegação por teclado completa, backdrop com blur e bloqueio de scroll do body.

## Instalação

Copie os arquivos do componente para o seu projeto:

<CodeBlock language="bash" code={
`src/lib/components/dialog/
├── Dialog.svelte
├── DialogTrigger.svelte
├── DialogContent.svelte
├── DialogHeader.svelte
├── DialogFooter.svelte
├── DialogTitle.svelte
├── DialogDescription.svelte
├── DialogClose.svelte
├── ctx.svelte.ts
└── index.ts
`} />

> O `DialogTrigger` e `DialogClose` utilizam as variantes do componente Button (`buttonVariants`). O `DialogContent` depende do componente `Portal`.

## Uso Básico

O dialog é composto por um trigger (botão) e um conteúdo que aparece como modal:

<div class="preview border rounded-lg p-10 flex items-center justify-center min-h-[200px]">
  <Dialog>
    <DialogTrigger>Abrir Dialog</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Título do Dialog</DialogTitle>
        <DialogDescription>
          Esta é uma descrição do conteúdo do dialog.
        </DialogDescription>
      </DialogHeader>
      <p>Conteúdo principal do dialog aqui.</p>
      <DialogFooter>
        <DialogClose>Cancelar</DialogClose>
        <DialogClose variant="default">Confirmar</DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</div>

<CodeBlock language="svelte" code={
`<script>
import {
Dialog,
DialogTrigger,
DialogContent,
DialogHeader,
DialogFooter,
DialogTitle,
DialogDescription,
DialogClose
} from '$lib/components/dialog';
</script>

<Dialog>
  <DialogTrigger>Abrir Dialog</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Título do Dialog</DialogTitle>
      <DialogDescription>
        Esta é uma descrição do conteúdo do dialog.
      </DialogDescription>
    </DialogHeader>
    <p>Conteúdo principal do dialog aqui.</p>
    <DialogFooter>
      <DialogClose>Cancelar</DialogClose>
      <DialogClose variant="default">Confirmar</DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
`} />

## Recursos

- **Modal Verdadeiro** — Backdrop com blur, bloqueio de scroll do body e foco automático
- **Portal** — Conteúdo renderizado no `<body>`, evitando problemas de z-index e overflow
- **Acessibilidade** — Atributos ARIA completos e navegação por teclado
- **Auto-close** — Fecha ao clicar no backdrop, pressionar Esc ou clicar no botão de fechar
- **Focus Management** — Foco automático no primeiro elemento interativo e trap de foco
- **Transições** — Animações suaves de entrada e saída com fly and scale

## Exemplos

### Dialog de Confirmação

Dialog simples para confirmações de ação:

<div class="preview border rounded-lg p-10 flex items-center justify-center min-h-[200px]">
  <Dialog>
    <DialogTrigger variant="destructive">Deletar Item</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogDescription>
          Esta ação não pode ser desfeita. Isso excluirá permanentemente o item.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose>Cancelar</DialogClose>
        <DialogClose variant="destructive" onclick={() => alert('Item deletado!')}>
          Deletar
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</div>

<CodeBlock language="svelte" code={
`<Dialog>
<DialogTrigger variant="destructive">Deletar Item</DialogTrigger>
<DialogContent>
<DialogHeader>
<DialogTitle>Confirmar Exclusão</DialogTitle>
<DialogDescription>
Esta ação não pode ser desfeita. Isso excluirá permanentemente o item.
</DialogDescription>
</DialogHeader>
<DialogFooter>
<DialogClose>Cancelar</DialogClose>
<DialogClose variant="destructive" onclick={handleDelete}>
Deletar
</DialogClose>
</DialogFooter>
</DialogContent>

</Dialog>
`} />

### Dialog com Formulário

Dialog contendo um formulário completo:

<div class="preview border rounded-lg p-10 flex items-center justify-center min-h-[300px]">
  <Dialog>
    <DialogTrigger variant="default">Editar Perfil</DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Editar Perfil</DialogTitle>
        <DialogDescription>
          Faça alterações no seu perfil aqui. Clique em salvar quando terminar.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <label for="name" class="text-right">Nome</label>
          <input id="name" value="João Silva" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <label for="email" class="text-right">Email</label>
          <input id="email" value="joao@example.com" class="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <DialogClose>Cancelar</DialogClose>
        <DialogClose variant="default" onclick={() => alert('Perfil salvo!')}>
          Salvar Alterações
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</div>

<CodeBlock language="svelte" code={
`<Dialog>
<DialogTrigger variant="default">Editar Perfil</DialogTrigger>
<DialogContent class="sm:max-w-[425px]">
<DialogHeader>
<DialogTitle>Editar Perfil</DialogTitle>
<DialogDescription>
Faça alterações no seu perfil aqui. Clique em salvar quando terminar.
</DialogDescription>
</DialogHeader>

<div class="grid gap-4 py-4">
<div class="grid grid-cols-4 items-center gap-4">
<label for="name" class="text-right">Nome</label>
<input id="name" value="João Silva" class="col-span-3" />
</div>
<div class="grid grid-cols-4 items-center gap-4">
<label for="email" class="text-right">Email</label>
<input id="email" value="joao@example.com" class="col-span-3" />
</div>
</div>
<DialogFooter>
<DialogClose>Cancelar</DialogClose>
<DialogClose variant="default" onclick={handleSave}>
Salvar Alterações
</DialogClose>
</DialogFooter>
</DialogContent>

</Dialog>
`} />

### Controle Programático

Controle o estado do dialog programaticamente:

<div class="preview border rounded-lg p-10 flex items-center justify-center min-h-[200px]">
  <Dialog bind:open={dialogOpen}>
    <DialogTrigger>Abrir Dialog</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Dialog Controlado</DialogTitle>
        <DialogDescription>
          Este dialog é controlado por uma variável externa.
        </DialogDescription>
      </DialogHeader>
      <p>Estado atual: {dialogOpen ? 'Aberto' : 'Fechado'}</p>
      <DialogFooter>
        <DialogClose onclick={() => dialogOpen = false}>Fechar</DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</div>

<CodeBlock language="svelte" code={
`<script>
let dialogOpen = $state(false);
</script>

<Dialog bind:open={dialogOpen}>
  <DialogTrigger>Abrir Dialog</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Controlado</DialogTitle>
      <DialogDescription>
        Este dialog é controlado por uma variável externa.
      </DialogDescription>
    </DialogHeader>
    <p>Estado atual: {dialogOpen ? 'Aberto' : 'Fechado'}</p>
    <DialogFooter>
      <DialogClose onclick={() => dialogOpen = false}>Fechar</DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>

<button onclick={() => dialogOpen = true}>Abrir Externamente</button>
`} />

## Estilização

Todos os componentes aceitam a prop `class` para customização:

<CodeBlock language="svelte" code={
`<!-- Largura customizada -->
<DialogContent class="sm:max-w-[600px]">
...
</DialogContent>

<!-- Header customizado -->
<DialogHeader class="text-center">
  ...
</DialogHeader>

<!-- Footer customizado -->
<DialogFooter class="justify-between">
  ...
</DialogFooter>

<!-- Botão de fechar customizado -->
<DialogClose class="absolute top-4 right-4">
  <XIcon class="h-4 w-4" />
</DialogClose>
`} />

## Navegação por Teclado

| Tecla         | Ação                                            |
| :------------ | :---------------------------------------------- |
| `Tab`         | Navega entre elementos interativos (focus trap) |
| `Shift + Tab` | Navega para trás entre elementos interativos    |
| `Esc`         | Fecha o dialog                                  |
| `Enter`       | Ativa o elemento focado (botões, links)         |

## API Reference

### Dialog

Componente raiz que gerencia o estado do dialog.

| Prop       | Tipo      | Padrão  | Descrição                                         |
| :--------- | :-------- | :------ | :------------------------------------------------ |
| `open`     | `boolean` | `false` | Estado de abertura (suporta binding bidirecional) |
| `children` | `Snippet` | —       | Deve conter `DialogTrigger` e `DialogContent`     |

### DialogTrigger

Botão que abre o dialog.

| Prop       | Tipo      | Padrão      | Descrição                                                         |
| :--------- | :-------- | :---------- | :---------------------------------------------------------------- |
| `variant`  | `string`  | `'outline'` | `default`, `outline`, `ghost`, `secondary`, `destructive`, `link` |
| `size`     | `string`  | `'default'` | `default`, `sm`, `lg`, `icon`                                     |
| `class`    | `string`  | —           | Classes CSS adicionais                                            |
| `children` | `Snippet` | —           | Conteúdo do botão                                                 |

### DialogContent

Container do conteúdo modal.

| Prop                   | Tipo          | Padrão | Descrição                   |
| :--------------------- | :------------ | :----- | :-------------------------- |
| `class`                | `string`      | —      | Classes CSS adicionais      |
| `initialFocus`         | `FocusOption` | `true` | Elemento para foco inicial  |
| `finalFocus`           | `FocusOption` | `true` | Elemento para foco final    |
| `closeOnBackdropClick` | `boolean`     | `true` | Fecha ao clicar no backdrop |
| `closeOnEscape`        | `boolean`     | `true` | Fecha ao pressionar Esc     |
| `children`             | `Snippet`     | —      | Conteúdo do dialog          |

### DialogHeader

Container para o cabeçalho do dialog.

| Prop       | Tipo      | Padrão | Descrição              |
| :--------- | :-------- | :----- | :--------------------- |
| `class`    | `string`  | —      | Classes CSS adicionais |
| `children` | `Snippet` | —      | Conteúdo do cabeçalho  |

### DialogTitle

Título do dialog.

| Prop       | Tipo      | Padrão | Descrição              |
| :--------- | :-------- | :----- | :--------------------- |
| `class`    | `string`  | —      | Classes CSS adicionais |
| `children` | `Snippet` | —      | Texto do título        |

### DialogDescription

Descrição do dialog.

| Prop       | Tipo      | Padrão | Descrição              |
| :--------- | :-------- | :----- | :--------------------- |
| `class`    | `string`  | —      | Classes CSS adicionais |
| `children` | `Snippet` | —      | Texto da descrição     |

### DialogFooter

Container para os botões de ação.

| Prop       | Tipo      | Padrão | Descrição              |
| :--------- | :-------- | :----- | :--------------------- |
| `class`    | `string`  | —      | Classes CSS adicionais |
| `children` | `Snippet` | —      | Botões de ação         |

### DialogClose

Botão que fecha o dialog.

| Prop       | Tipo                      | Padrão      | Descrição                                                         |
| :--------- | :------------------------ | :---------- | :---------------------------------------------------------------- |
| `variant`  | `string`                  | `'outline'` | `default`, `outline`, `ghost`, `secondary`, `destructive`, `link` |
| `size`     | `string`                  | `'default'` | `default`, `sm`, `lg`, `icon`                                     |
| `class`    | `string`                  | —           | Classes CSS adicionais                                            |
| `onclick`  | `(e: MouseEvent) => void` | —           | Callback adicional ao fechar                                      |
| `children` | `Snippet`                 | —           | Conteúdo do botão                                                 |

### Tipos

```typescript
type FocusOption =
 | boolean
 | HTMLElement
 | null
 | (() => HTMLElement | boolean | null | undefined);
```
