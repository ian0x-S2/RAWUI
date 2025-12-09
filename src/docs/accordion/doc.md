---
title: Accordion
description: A vertically stacked set of interactive headings that each reveal a section of content.
componentId: accordion
---

<script>
  import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent
  } from '$lib/components/accordion/index';
  import CodeBlock from '$lib/intern/CodeBlock.svelte';
</script>

The Accordion component manages a list of items that can be expanded or collapsed to reveal content. It uses Svelte's native `slide` transition for smooth animations and includes a rotating chevron indicator by default.

## Installation

Copy the component files to your project:

<CodeBlock language="bash" code={
`src/lib/components/accordion/
├── Accordion.svelte
├── AccordionItem.svelte
├── AccordionTrigger.svelte
├── AccordionContent.svelte
├── ctx.svelte.ts
└── index.ts
`} />

## Basic Usage

<div class="preview border rounded-lg p-10 flex items-center justify-center min-h-[300px]">
  <Accordion type="single" class="w-full max-w-[500px]">
    <AccordionItem value="item-1">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Is it styled?</AccordionTrigger>
      <AccordionContent>
        Yes. It comes with default styles that match the other components' aesthetic.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionTrigger>Is it animated?</AccordionTrigger>
      <AccordionContent>
        Yes. It uses Svelte's native slide transition for smooth height animations.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</div>

<CodeBlock language="svelte" code={
`<script>
  import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent
  } from '$lib/components/accordion';
</script>

<Accordion type="single" class="w-full max-w-[500px]">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>
      Yes. It comes with default styles that match the other components' aesthetic.
    </AccordionContent>
  </AccordionItem>
</Accordion>
`} />

## Features

- **Flexible Modes** — Supports allowing one (`single`) or multiple (`multiple`) items open at the same time.
- **Smooth Animations** — Uses `svelte/transition` (`slide`) for performant height animations.
- **Keyboard Navigation** — Fully accessible trigger buttons.
- **Auto-rotating Icon** — Comes with a Chevron Down that rotates automatically when expanded.
- **Icon Customization** — Easily replace the default icon with your own snippet.

## Examples

### Multiple Open Items

Set `type="multiple"` to allow the user to expand multiple sections at once.

<div class="preview border rounded-lg p-10 flex items-center justify-center min-h-[300px]">
  <Accordion type="multiple" class="w-full max-w-[500px]">
    <AccordionItem value="step-1">
      <AccordionTrigger>Step 1: Design</AccordionTrigger>
      <AccordionContent>
        Create the mockups and define the user experience.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="step-2">
      <AccordionTrigger>Step 2: Develop</AccordionTrigger>
      <AccordionContent>
        Implement the components using Svelte 5 and Tailwind CSS.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</div>

<CodeBlock language="svelte" code={
`<Accordion type="multiple">
  <AccordionItem value="step-1">
    <AccordionTrigger>Step 1: Design</AccordionTrigger>
    <AccordionContent>...</AccordionContent>
  </AccordionItem>
  <AccordionItem value="step-2">
    <AccordionTrigger>Step 2: Develop</AccordionTrigger>
    <AccordionContent>...</AccordionContent>
  </AccordionItem>
</Accordion>
`} />

### Custom Icon

You can replace the default Chevron icon by passing an `icon` snippet to the `AccordionTrigger`. The component will still handle the rotation animation automatically if you use an SVG.

<div class="preview border rounded-lg p-10 flex items-center justify-center min-h-[200px]">
  <Accordion type="single" class="w-full max-w-[500px]">
    <AccordionItem value="custom-1">
      <AccordionTrigger>
        Custom Plus Icon
        {#snippet icon()}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 shrink-0 transition-transform duration-200"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        {/snippet}
      </AccordionTrigger>
      <AccordionContent>
        This trigger uses a Plus icon instead of the default Chevron.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</div>

<CodeBlock language="svelte" code={
`<AccordionItem value="custom-1">
  <AccordionTrigger>
    Custom Plus Icon
    {#snippet icon()}
      <PlusIcon class="h-4 w-4 shrink-0 transition-transform duration-200" />
    {/snippet}
  </AccordionTrigger>
  <AccordionContent>
    This trigger uses a Plus icon.
  </AccordionContent>
</AccordionItem>
`} />

### Disabled Items

Pass the `disabled` prop to an `AccordionItem` to prevent user interaction.

<div class="preview border rounded-lg p-10 flex items-center justify-center min-h-[200px]">
  <Accordion type="single" class="w-full max-w-[500px]">
    <AccordionItem value="active">
      <AccordionTrigger>Available Feature</AccordionTrigger>
      <AccordionContent>
        You can access this feature right now.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="disabled" disabled>
      <AccordionTrigger class="text-muted-foreground decoration-current">Premium Feature (Locked)</AccordionTrigger>
      <AccordionContent>
        Upgrade your plan to access this content.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</div>

<CodeBlock language="svelte" code={
`<Accordion type="single">
  <AccordionItem value="active">
    <AccordionTrigger>Available Feature</AccordionTrigger>
    <AccordionContent>...</AccordionContent>
  </AccordionItem>
  <AccordionItem value="disabled" disabled>
    <AccordionTrigger class="text-muted-foreground">Premium Feature</AccordionTrigger>
    <AccordionContent>...</AccordionContent>
  </AccordionItem>
</Accordion>
`} />

## API Reference

### Accordion

The root component that manages state.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `type` | `'single' \| 'multiple'` | `'single'` | Determines whether one or multiple items can be opened at the same time. |
| `value` | `string \| string[]` | `undefined` | The controlled value of the item(s) to expand. |
| `class` | `string` | — | Additional CSS classes. |
| `children` | `Snippet` | — | Should contain `AccordionItem` components. |

### AccordionItem

A single collapsible item.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string` | **Required** | A unique value for the item. |
| `disabled` | `boolean` | `false` | When true, prevents the user from interacting with the item. |
| `class` | `string` | — | Additional CSS classes (applied to the wrapper div). |
| `children` | `Snippet` | — | Should contain `AccordionTrigger` and `AccordionContent`. |

### AccordionTrigger

The interactive header that toggles the content. Accepts all standard HTML Button attributes.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `icon` | `Snippet` | `ChevronDown` | Optional snippet to replace the default icon. |
| `class` | `string` | — | Additional CSS classes. |
| `children` | `Snippet` | — | The content of the header. |

### AccordionContent

The wrapper for the collapsible content.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `class` | `string` | — | Additional CSS classes. |
| `children` | `Snippet` | — | The content to be revealed. |
