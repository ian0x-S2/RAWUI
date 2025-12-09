---
title: Portal
description: Renders content into a DOM node that exists outside the DOM hierarchy of the parent component.
componentId: portal
group: Utils
order: 1
published: true
---

<script>
  import CodeBlock from '$lib/intern/CodeBlock.svelte';
  import Portal from '$lib/components/portal/Portal.svelte';
  import Button from '$lib/components/button/Button.svelte';
  import { setContext, getContext } from 'svelte';

  // Demo state
  let show = $state(false);
</script>

The Portal component allows you to render a child component into a different part of the DOM (usually `document.body`), escaping the styling constraints of the parent container (like `overflow: hidden` or `z-index`).

## Installation

Copy the component files to your project. This implementation consists of two files: the main component and a consumer to handle context tunneling.

<CodeBlock language="bash" code={
`src/lib/components/portal/
├── Portal.svelte
└── PortalConsumer.svelte
`} />

## Basic Usage

By default, the Portal renders its content at the end of `document.body`.

<div class="preview border rounded-lg p-10 flex items-center justify-center min-h-[150px]">
  <div class="p-4 border border-dashed rounded bg-muted/20 overflow-hidden relative">
    <p class="text-sm text-muted-foreground mb-4">I have <code>overflow: hidden</code></p>
    
    <Button onclick={() => show = !show}>
      {show ? 'Close Portal' : 'Open Portal'}
    </Button>

    {#if show}
      <Portal>
        <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background border p-6 rounded-lg shadow-xl z-50 animate-in fade-in zoom-in-95 duration-200">
          <h3 class="font-bold text-lg">I am outside!</h3>
          <p class="text-muted-foreground mt-2">I am a direct child of body.</p>
          <Button class="mt-4" variant="secondary" onclick={() => show = false}>Close</Button>
        </div>
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/50 z-40" onclick={() => show = false}></div>
      </Portal>
    {/if}
  </div>
</div>

<CodeBlock language="svelte" code={
`<script>
  import Portal from '$lib/components/portal/Portal.svelte';
  let show = $state(false);
</script>

<div class="overflow-hidden relative">
  <button onclick={() => show = true}>Open</button>

  {#if show}
    <Portal>
      <div class="fixed top-1/2 left-1/2 ...">
        I escaped the overflow-hidden container!
      </div>
    </Portal>
  {/if}
</div>
`} />

## Key Features

### Context Tunneling

It automatically captures all contexts from the parent (`getAllContexts`) and restores them inside the Portal (`PortalConsumer`). This means you can use :
- Toasts
- Theme providers
- Dialog logic
- Any `getContext()` calls inside the portal content.

### Svelte 5 Native

It uses the new `mount` and `unmount` APIs from Svelte 5 to programmatically inject the component into the target, ensuring proper lifecycle management (including transitions).

## Advanced Usage

### Custom Target

You can render the content into a specific element instead of the body by passing an `HTMLElement` to the `target` prop.

<CodeBlock language="svelte" code={
`<script>
  let container: HTMLElement;
</script>

<div bind:this={container} id="custom-root"></div>

<Portal target={container}>
  I live inside #custom-root now.
</Portal>
`} />

## API Reference

### Portal

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `target` | `HTMLElement` | `document.body` | The DOM element where the children will be mounted. |
| `children` | `Snippet` | — | The content to be teleported. |
