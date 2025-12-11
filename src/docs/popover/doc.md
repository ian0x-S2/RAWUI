---
title: Popover
description: A floating overlay component that displays content positioned relative to a trigger element.
group: Components
componentId: popover
---

<script>
  import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from '$lib/components/popover/index';
  import Button from '$lib/components/button/Button.svelte';
  import CodeBlock from '$lib/intern/CodeBlock.svelte';

  // Icons (SVGs inline)
  const SettingsIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`;

  // State for examples
  let basicOpen = $state(false);
  let modalOpen = $state(false);
  let controlledOpen = $state(false);
</script>

<style>
  .preview-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 350px;
    background-color: var(--background, #fff);
  }
</style>

The Popover component displays floating content positioned relative to a trigger element. It uses **Floating UI** for robust positioning, collision detection, and flip logic.



## Installation

1. Install the required dependency:

<CodeBlock language="bash" code={`npm install @floating-ui/dom`} />

2. Ensure you have your utility class merger (`cn`) available in `$lib/utils`.

3. Copy the component files to your project:

<CodeBlock language="bash" code={`src/lib/components/popover/
├── Popover.svelte
├── PopoverTrigger.svelte
├── PopoverContent.svelte
├── PopoverClose.svelte
├── ctx.svelte.ts
└── index.ts`} />

## Basic Usage

A simple popover that opens when clicking the trigger. It automatically handles focus management and "click outside" events.

<div class="preview-container border rounded-lg p-10">
    <Popover bind:open={basicOpen}>
      <PopoverTrigger class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
        Open Popover
      </PopoverTrigger>
      <PopoverContent class="w-80">
        <div class="grid gap-4">
          <div class="space-y-2">
            <h4 class="font-medium leading-none">Dimensions</h4>
            <p class="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div class="grid gap-2">
            <div class="grid grid-cols-3 items-center gap-4">
              <label class="text-sm font-medium" for="width">Width</label>
              <input class="col-span-2 flex h-8 w-full rounded-md border border-input bg-background px-3 text-sm" id="width" value="100%" />
            </div>
            <div class="grid grid-cols-3 items-center gap-4">
              <label class="text-sm font-medium" for="height">Height</label>
              <input class="col-span-2 flex h-8 w-full rounded-md border border-input bg-background px-3 text-sm" id="height" value="25px" />
            </div>
          </div>
        </div>
        <PopoverClose />
      </PopoverContent>
    </Popover>
</div>

<CodeBlock language="svelte" code={`<script>
  import { 
    Popover, 
    PopoverTrigger, 
    PopoverContent, 
    PopoverClose 
  } from '$lib/components/popover';
</script>

<Popover>
  <PopoverTrigger class="btn">
    Open Popover
  </PopoverTrigger>
  
  <PopoverContent class="w-80 p-4">
    <h4 class="font-medium">Dimensions</h4>
    <p class="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
    
    <div class="grid gap-2 py-4">
       </div>

    <PopoverClose />
  </PopoverContent>
</Popover>`} />

## Examples

### Positioning

The popover automatically positions itself to avoid collisions. You can set a preferred `placement` (e.g., `top`, `bottom`, `left`, `right`).

<div class="preview-container border rounded-lg p-10 flex-col gap-8">
  <div class="flex gap-4">
      <Popover placement="top">
        <PopoverTrigger class="px-4 py-2 border rounded hover:bg-gray-100">Top</PopoverTrigger>
        <PopoverContent><p class="text-sm">Content at Top</p></PopoverContent>
      </Popover>
  </div>
  
  <div class="flex gap-16">
      <Popover placement="left">
        <PopoverTrigger class="px-4 py-2 border rounded hover:bg-gray-100">Left</PopoverTrigger>
        <PopoverContent><p class="text-sm">Content at Left</p></PopoverContent>
      </Popover>

      <Popover placement="right">
        <PopoverTrigger class="px-4 py-2 border rounded hover:bg-gray-100">Right</PopoverTrigger>
        <PopoverContent><p class="text-sm">Content at Right</p></PopoverContent>
      </Popover>
  </div>

  <div class="flex gap-4">
      <Popover placement="bottom">
        <PopoverTrigger class="px-4 py-2 border rounded hover:bg-gray-100">Bottom</PopoverTrigger>
        <PopoverContent><p class="text-sm">Content at Bottom</p></PopoverContent>
      </Popover>
  </div>
</div>

<CodeBlock language="svelte" code={`<Popover placement="top">
  <PopoverTrigger>Top</PopoverTrigger>
  <PopoverContent>...</PopoverContent>
</Popover>

<Popover placement="right">
  <PopoverTrigger>Right</PopoverTrigger>
  <PopoverContent>...</PopoverContent>
</Popover>`} />

### Modal Behavior

Use the `modal` prop to create a modal-like experience. This adds a backdrop behind the popover and traps focus inside the content, preventing interaction with the rest of the page until closed.

<div class="preview-container border rounded-lg p-10">
    <Popover bind:open={modalOpen} modal>
      <PopoverTrigger class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
        Open Modal Popover
      </PopoverTrigger>
      <PopoverContent class="w-80">
        <div class="grid gap-4">
          <div class="space-y-2">
            <h4 class="font-medium leading-none">Modal Content</h4>
            <p class="text-sm text-muted-foreground">
              This popover has a backdrop and focus is trapped inside.
            </p>
          </div>
          <div class="flex justify-end gap-2">
            <Button variant="outline" size="sm" onclick={() => modalOpen = false}>Cancel</Button>
            <Button size="sm" onclick={() => modalOpen = false}>Save</Button>
          </div>
        </div>
        <PopoverClose />
      </PopoverContent>
    </Popover>
</div>

<CodeBlock language="svelte" code={`<Popover modal>
  <PopoverTrigger>Open Modal</PopoverTrigger>
  <PopoverContent>
    <h3>I have a backdrop!</h3>
    <p>And you can't tab outside of me.</p>
  </PopoverContent>
</Popover>`} />

### Controlled State

You can control the open state programmatically using `bind:open`.

<div class="preview-container border rounded-lg p-10 flex-col gap-4">
  <div class="flex items-center gap-2">
    <Button variant="outline" size="sm" onclick={() => controlledOpen = !controlledOpen}>
      {controlledOpen ? 'Close' : 'Open'} via External Button
    </Button>
  </div>

  <Popover bind:open={controlledOpen}>
      <PopoverTrigger class="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent h-10 px-4 py-2 gap-2">
        {@html SettingsIcon} Settings
      </PopoverTrigger>
      <PopoverContent class="w-80">
        <div class="grid gap-4">
          <h4 class="font-medium leading-none">Settings</h4>
          <p class="text-sm text-muted-foreground">Managed programmatically.</p>
        </div>
      </PopoverContent>
    </Popover>
</div>

<CodeBlock language="svelte" code={`<script>
  let open = $state(false);
</script>

<Button onclick={() => open = !open}>
  Toggle via Prop
</Button>

<Popover bind:open>
  <PopoverTrigger>Settings</PopoverTrigger>
  <PopoverContent>...</PopoverContent>
</Popover>`} />

## Accessibility

The Popover component follows WAI-ARIA design patterns for the Dialog (Modal) and Popover widgets.

### Keyboard Interactions

| Key | Description |
| --- | --- |
| `Enter` / `Space` | Opens the popover when focus is on the trigger. |
| `Escape` | Closes the popover and moves focus back to the trigger. |
| `Tab` | Traps focus within the content when `modal={true}`. |

## API Reference

### Popover

The root component that manages popover state and context.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | `false` | Controls the open/closed state. |
| `modal` | `boolean` | `false` | Enables modal mode (backdrop + focus trap). |
| `placement` | `Placement` | `'bottom'` | Preferred position (`top`, `bottom`, `left`, `right`). |
| `offset` | `number` | `8` | Distance from trigger in pixels. |
| `closeOnOutsideClick` | `boolean` | `true` | Close when clicking outside content. |
| `closeOnEscape` | `boolean` | `true` | Close when pressing Escape. |
| `onOpenChange` | `(v: boolean) => void` | - | Callback when state changes. |

### PopoverTrigger

The element that toggles the popover.

| Prop | Type | Description |
| --- | --- | --- |
| `children` | `Snippet` | Trigger content. |
| `class` | `string` | CSS classes. |

### PopoverContent

The floating container. It renders inside a Portal when open.

| Prop | Type | Description |
| --- | --- | --- |
| `children` | `Snippet` | Popover content. |
| `class` | `string` | CSS classes. |

### PopoverClose

A utility button to close the popover from inside.

| Prop | Type | Description |
| --- | --- | --- |
| `children` | `Snippet` | Optional custom content (default is 'X' icon). |
| `class` | `string` | CSS classes. |
