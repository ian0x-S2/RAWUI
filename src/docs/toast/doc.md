---
title: Toast
description: Flexible and accessible notifications for your application. Supports multiple types, positioning, promises, and custom content.
group: Components
componentId: toast
---

<script>
  import { Toaster, toast } from '$lib/components/toast';
  import Button from '$lib/components/button/Button.svelte';
  import CodeBlock from '$lib/intern/CodeBlock.svelte';

  const promiseExample = () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) resolve({ name: 'Toast' });
        else reject(new Error('Network error'));
      }, 2000);
    });

    toast.promise(promise, {
      loading: 'Loading...',
      success: (data) => `Successfully loaded ${data.name}`,
      error: 'Could not fetch data',
    });
  };
</script>

The Toast component provides a simple yet powerful way to display ephemeral notifications. It handles multiple toasts, positioning, automatic dismissal, and rich content.

## Promise Handling

The component uses Svelte's declarative `{#await}` blocks to handle promise states elegantly. When you use `toast.promise()`, the component automatically displays different UI for loading, success, and error states without manual state management.


## Installation

Copy the component files to your project:

<CodeBlock language="bash" code={`
src/lib/components/toast/
├── Toast.svelte
├── Toaster.svelte
├── ctx.svelte.ts
├── types.ts
└── index.ts
`} />

## Basic Usage

1. Add the `<Toaster />` component to your root layout (e.g., `+layout.svelte`).
2. Use the `toast` object to trigger notifications.

<div class="preview border rounded-lg p-10 flex flex-col gap-4 items-center justify-center min-h-[200px]">
  <Toaster position="bottom-right" />
  <Button onclick={() => toast.message('Hello from Toast!')}>
    Show Toast
  </Button>
</div>

<CodeBlock language="svelte" code={`
<script>
  import { Toaster, toast } from '$lib/components/toast';
  import Button from '$lib/components/button/Button.svelte';
</script>

<!-- Place this in your root layout -->
<Toaster />

<Button onclick={() => toast.message('Hello from Toast!')}>
  Show Toast
</Button>
`} />

## Features

- **Multiple Types** — Success, Error, Warning, Info, Loading, Default.
- **Positioning** — 6 positions available (top/bottom, left/center/right).
- **Promises** — Built-in support for Promise states (loading, success, error).
- **Actions** — Support for action and cancel buttons inside the toast.
- **Rich Content** — Render custom snippets or icons.
- **Pause on Hover** — Toasts pause their timer when hovered or when the window loses focus.

## Examples

### Toast Types

Different styles for different intentions:

<div class="preview border rounded-lg p-10 flex flex-wrap gap-4 items-center justify-center min-h-[200px]">
  <Button variant="outline" onclick={() => toast.success('Operation successful!')}>Success</Button>
  <Button variant="outline" onclick={() => toast.error('Something went wrong.')}>Error</Button>
  <Button variant="outline" onclick={() => toast.warning('Please be careful.')}>Warning</Button>
  <Button variant="outline" onclick={() => toast.info('Here is some info.')}>Info</Button>
</div>

<CodeBlock language="svelte" code={`
<Button onclick={() => toast.success('Operation successful!')}>Success</Button>
<Button onclick={() => toast.error('Something went wrong.')}>Error</Button>
<Button onclick={() => toast.warning('Please be careful.')}>Warning</Button>
<Button onclick={() => toast.info('Here is some info.')}>Info</Button>
`} />

### With Action

Add an action button to the toast:

<div class="preview border rounded-lg p-10 flex items-center justify-center min-h-[200px]">
  <Button 
    variant="outline" 
    onclick={() => toast.message({
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem with your request.',
      action: {
        label: 'Try again',
        onClick: () => toast.success('Retrying...')
      }
    })}
  >
    Show Action
  </Button>
</div>

<CodeBlock language="svelte" code={`
<Button onclick={() => toast.message({
  title: 'Uh oh! Something went wrong.',
  description: 'There was a problem with your request.',
  action: {
    label: 'Try again',
    onClick: () => console.log('Action clicked')
  }
})}>
  Show Action
</Button>
`} />

### Promise Handling

Automatically handle loading, success, and error states for a Promise:

<div class="preview border rounded-lg p-10 flex items-center justify-center min-h-[200px]">
  <Button variant="outline" onclick={promiseExample}>
    Start Promise
  </Button>
</div>

<CodeBlock language="svelte" code={`
<script>
  const promise = new Promise((resolve) => setTimeout(resolve, 2000));

  function handlePromise() {
    toast.promise(promise, {
      loading: 'Loading...',
      success: 'Data loaded successfully!',
      error: 'Error loading data'
    });
  }
</script>

<Button onclick={handlePromise}>
  Start Promise
</Button>
`} />

### Positioning

Control where toasts appear on screen with the `position` prop on the `<Toaster />` component. Six positions are available:

<div class="preview border rounded-lg p-10 flex flex-col gap-4 items-center justify-center min-h-[200px]">
  <p class="text-sm text-muted-foreground">The position is set on the Toaster component in your layout. Try changing it to see toasts in different locations:</p>
  <div class="flex flex-wrap gap-2 justify-center">
    <Button size="sm" variant="outline" onclick={() => toast.message('Top Left')}>Top Left</Button>
    <Button size="sm" variant="outline" onclick={() => toast.message('Top Center')}>Top Center</Button>
    <Button size="sm" variant="outline" onclick={() => toast.message('Top Right')}>Top Right</Button>
    <Button size="sm" variant="outline" onclick={() => toast.message('Bottom Left')}>Bottom Left</Button>
    <Button size="sm" variant="outline" onclick={() => toast.message('Bottom Center')}>Bottom Center</Button>
    <Button size="sm" variant="outline" onclick={() => toast.message('Bottom Right')}>Bottom Right</Button>
  </div>
</div>

<CodeBlock language="svelte" code={`
<Toaster position="top-center" />

<Toaster />
`} />

## API Reference

### Toaster

The container component for toasts.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `position` | `ToastPosition` | `'bottom-right'` | Where toasts appear: `'top-left'`, `'top-center'`, `'top-right'`, `'bottom-left'`, `'bottom-center'`, `'bottom-right'` |
| `class` | `string` | — | Additional CSS classes for the container |

### toast()

The API to trigger toasts.

Methods:
- `toast.message(options)`
- `toast.success(options)`
- `toast.error(options)`
- `toast.warning(options)`
- `toast.info(options)`
- `toast.loading(options)`
- `toast.promise(promise, data)`
- `toast.dismiss(id)`

`options` can be a string (message/title) or an object:

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | — | Main text of the toast |
| `description` | `string` | — | Subtitle or details |
| `duration` | `number` | `5000` | Time in ms before auto-dismissing (Infinity for loading) |
| `dismissible` | `boolean` | `true` | Whether the close button is shown |
| `action` | `{ label: string, onClick: func }` | — | Action button configuration |
| `cancel` | `{ label: string, onClick: func }` | — | Cancel/Secondary button configuration |
| `icon` | `Snippet` | — | Custom icon snippet |
| `component` | `Snippet` | — | Custom content snippet |
