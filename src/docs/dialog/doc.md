---
title: Dialog
description: Accessible modal overlay for displaying important content. Includes automatic focus, keyboard navigation, backdrop, and scroll management.
group: Components
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
  import  Button  from '$lib/components/button/Button.svelte';  
  import CodeBlock from '$lib/intern/CodeBlock.svelte';

  // Estado para o exemplo de Controle Programático
  let customOpen = $state(false);
</script>

The Dialog component provides an elegant way to display accessible modal content. Fully accessible, with automatic focus, complete keyboard navigation, backdrop with blur, and body scroll locking.

## Installation

Copy the component files to your project:

<CodeBlock language="bash" code={`
src/lib/components/dialog/
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

> The `DialogTrigger` and `DialogClose` use the Button component variants (`buttonVariants`). The `DialogContent` depends on the `Portal` component.

## Basic Usage

The dialog consists of a trigger (button) and content that appears as a modal:

<div class="preview border rounded-lg p-10 flex items-center justify-center min-h-[200px]">
  <Dialog>
    <DialogTrigger>Open Dialog</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogDescription>
          This is a description of the dialog content.
        </DialogDescription>
      </DialogHeader>
      <p>Main dialog content goes here.</p>
      <DialogFooter>
        <DialogClose>Cancel</DialogClose>
        <DialogClose variant="default">Confirm</DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</div>

<CodeBlock language="svelte" code={`
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
  } from '$lib/components/dialog';
</script>

<Dialog>
  <DialogTrigger>Open Dialog</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        This is a description of the dialog content.
      </DialogDescription>
    </DialogHeader>
    <p>Main dialog content goes here.</p>
    <DialogFooter>
      <DialogClose>Cancel</DialogClose>
      <DialogClose variant="default">Confirm</DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
`} />

## Features

- **True Modal** — Backdrop with blur, body scroll locking, and automatic focus
- **Portal** — Content rendered in `<body>`, avoiding z-index and overflow issues
- **Accessibility** — Complete ARIA attributes and keyboard navigation
- **Auto-close** — Closes on backdrop click, Escape key, or close button click
- **Focus Management** — Automatic focus on first interactive element and focus trap
- **Transitions** — Smooth enter and exit animations with fly and scale

## Examples

### Confirmation Dialog

Simple dialog for action confirmations:

<div class="preview border rounded-lg p-10 flex items-center justify-center min-h-[200px]">
  <Dialog>
    <DialogTrigger variant="destructive">Delete Item</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete the item.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose>Cancel</DialogClose>
        <DialogClose variant="destructive" onclick={() => alert('Item deleted!')}>
          Delete
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</div>

<CodeBlock language="svelte" code={`
<Dialog>
  <DialogTrigger variant="destructive">Delete Item</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete the item.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose>Cancel</DialogClose>
      <DialogClose variant="destructive" onclick={handleDelete}>
        Delete
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
`} />

### Form Dialog

Dialog containing a complete form:

<div class="preview border rounded-lg p-10 flex items-center justify-center min-h-[300px]">
  <Dialog>
    <DialogTrigger variant="default">Edit Profile</DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <label for="name" class="text-right text-sm font-medium">Name</label>
          <input id="name" value="João Silva" class="col-span-3 border rounded p-2 text-sm" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <label for="email" class="text-right text-sm font-medium">Email</label>
          <input id="email" value="joao@example.com" class="col-span-3 border rounded p-2 text-sm" />
        </div>
      </div>
      <DialogFooter>
        <DialogClose>Cancel</DialogClose>
        <DialogClose variant="default" onclick={() => alert('Profile saved!')}>
          Save Changes
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</div>

<CodeBlock language="svelte" code={`
<Dialog>
  <DialogTrigger variant="default">Edit Profile</DialogTrigger>
  <DialogContent class="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>

    <div class="grid gap-4 py-4">
      <div class="grid grid-cols-4 items-center gap-4">
        <label for="name" class="text-right">Name</label>
        <input id="name" value="João Silva" class="col-span-3" />
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <label for="email" class="text-right">Email</label>
        <input id="email" value="joao@example.com" class="col-span-3" />
      </div>
    </div>
    
    <DialogFooter>
      <DialogClose>Cancel</DialogClose>
      <DialogClose variant="default" onclick={handleSave}>
        Save Changes
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
`} />

### Programmatic Control

Control the dialog state programmatically using `bind:open`. This is useful when you want to trigger the modal from anywhere or without using the `DialogTrigger` component.

<div class="preview border rounded-lg p-10 flex items-center justify-center min-h-[200px]">
  
  <button
    class="bg-background text-white px-4 py-2 rounded  transition text-sm font-medium"
    onclick={() => customOpen = true}
  >
    Open Custom Dialog
  </button>

  <Dialog bind:open={customOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Hello!</DialogTitle>
        <DialogDescription>
            This modal is controlled by an external state variable.
        </DialogDescription>
      </DialogHeader>

      <p class="py-4">This modal was opened without using the Trigger component.</p>

      <div class="flex justify-end">
        <button 
            class="bg-slate-100 hover:bg-slate-200 text-slate-900 px-4 py-2 rounded text-sm font-medium transition"
            onclick={() => customOpen = false}
        >
            Close
        </button>
      </div>
    </DialogContent>
  </Dialog>
</div>

<CodeBlock language="svelte" code={`
<script lang="ts">
  import { Dialog, DialogContent, DialogHeader, DialogTitle } from '$lib/components/dialog';

  // 1. Your control state
  let isOpen = $state(false);
</script>

<!-- 2. Your custom button anywhere on the screen -->
<button
  class="bg-background text-white px-4 py-2 rounded"
  onclick={() => isOpen = true}
>
  Open Custom Dialog
</button>

<!-- 3. The "invisible" Dialog that obeys the variable -->
<Dialog bind:open={isOpen}>
  <!-- Note that we removed <DialogTrigger> from here -->
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Hello!</DialogTitle>
    </DialogHeader>

    <p>This modal was opened without using the Trigger component.</p>

    <button onclick={() => isOpen = false}>
      Close
    </button>
  </DialogContent>
</Dialog>
`} />

## Styling

All components accept the `class` prop for customization:

<CodeBlock language="svelte" code={`
<!-- Custom width -->
<DialogContent class="sm:max-w-[600px]">
  ...
</DialogContent>

<!-- Custom header -->
<DialogHeader class="text-center">
  ...
</DialogHeader>

<!-- Custom footer -->
<DialogFooter class="justify-between">
  ...
</DialogFooter>

<!-- Custom close button -->
<DialogClose class="absolute top-4 right-4">
  <XIcon class="h-4 w-4" />
</DialogClose>
`} />

## Keyboard Navigation

| Key           | Action                                             |
| :------------ | :------------------------------------------------- |
| `Tab`         | Navigate between interactive elements (focus trap) |
| `Shift + Tab` | Navigate backward between interactive elements     |
| `Esc`         | Close the dialog                                   |
| `Enter`       | Activate the focused element (buttons, links)      |

## API Reference

### Dialog

Root component that manages the dialog state.

| Prop       | Type      | Default | Description                                      |
| :--------- | :-------- | :------ | :----------------------------------------------- |
| `open`     | `boolean` | `false` | Open state (supports bidirectional binding)      |
| `children` | `Snippet` | —       | Must contain `DialogTrigger` and `DialogContent` |

### DialogTrigger

Button that opens the dialog.

| Prop       | Type      | Default     | Description                                                       |
| :--------- | :-------- | :---------- | :---------------------------------------------------------------- |
| `variant`  | `string`  | `'outline'` | `default`, `outline`, `ghost`, `secondary`, `destructive`, `link` |
| `size`     | `string`  | `'default'` | `default`, `sm`, `lg`, `icon`                                     |
| `class`    | `string`  | —           | Additional CSS classes                                            |
| `children` | `Snippet` | —           | Button content                                                    |

### DialogContent

Modal content container.

| Prop                   | Type          | Default | Description               |
| :--------------------- | :------------ | :------ | :------------------------ |
| `class`                | `string`      | —       | Additional CSS classes    |
| `initialFocus`         | `FocusOption` | `true`  | Element for initial focus |
| `finalFocus`           | `FocusOption` | `true`  | Element for final focus   |
| `closeOnBackdropClick` | `boolean`     | `true`  | Close on backdrop click   |
| `closeOnEscape`        | `boolean`     | `true`  | Close on Escape key       |
| `children`             | `Snippet`     | —       | Dialog content            |

### DialogHeader

Container for the dialog header.

| Prop       | Type      | Default | Description            |
| :--------- | :-------- | :------ | :--------------------- |
| `class`    | `string`  | —       | Additional CSS classes |
| `children` | `Snippet` | —       | Header content         |

### DialogTitle

Dialog title.

| Prop       | Type      | Default | Description            |
| :--------- | :-------- | :------ | :--------------------- |
| `class`    | `string`  | —       | Additional CSS classes |
| `children` | `Snippet` | —       | Title text             |

### DialogDescription

Dialog description.

| Prop       | Type      | Default | Description            |
| :--------- | :-------- | :------ | :--------------------- |
| `class`    | `string`  | —       | Additional CSS classes |
| `children` | `Snippet` | —       | Description text       |

### DialogFooter

Container for action buttons.

| Prop       | Type      | Default | Description            |
| :--------- | :-------- | :------ | :--------------------- |
| `class`    | `string`  | —       | Additional CSS classes |
| `children` | `Snippet` | —       | Action buttons         |

### DialogClose

Button that closes the dialog.

| Prop       | Type                      | Default     | Description                                                       |
| :--------- | :------------------------ | :---------- | :---------------------------------------------------------------- |
| `variant`  | `string`                  | `'outline'` | `default`, `outline`, `ghost`, `secondary`, `destructive`, `link` |
| `size`     | `string`                  | `'default'` | `default`, `sm`, `lg`, `icon`                                     |
| `class`    | `string`                  | —           | Additional CSS classes                                            |
| `onclick`  | `(e: MouseEvent) => void` | —           | Additional callback on close                                      |
| `children` | `Snippet`                 | —           | Button content                                                    |

### Types

```typescript
type FocusOption =
 | boolean
 | HTMLElement
 | null
 | (() => HTMLElement | boolean | null | undefined);
