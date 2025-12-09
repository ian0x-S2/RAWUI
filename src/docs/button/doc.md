---
title: Button
description: Displays a button or a component that looks like a button.
componentId: button
---

<script>
  import Button from '$lib/components/button/Button.svelte';
  import CodeBlock from '$lib/intern/CodeBlock.svelte';
</script>

The Button component is a fundamental interactive element that triggers an action or navigates to another page. It supports multiple variants, sizes, and automatically handles links when an `href` prop is provided.

## Installation

Copy the component file to your project:

<CodeBlock language="bash" code={
`src/lib/components/button/
└── Button.svelte
`} />

**External dependencies:**

<CodeBlock language="bash" code={`npm install class-variance-authority`} />

## Basic Usage

<div class="preview border rounded-lg p-10 flex items-center justify-center min-h-[150px]">
  <Button>Click me</Button>
</div>

<CodeBlock language="svelte" code={
`<script>
  import Button from '$lib/components/button/Button.svelte';
</script>

<Button>Click me</Button>
`} />

## Features

- **Polymorphic Rendering** — Renders as an `<a>` tag automatically if an `href` prop is provided, otherwise renders as a `<button>`.
- **Style Variants** — Includes Primary, Secondary, Destructive, Outline, Ghost, and Link styles.
- **Responsive Sizes** — Supports Default, Small, Large, and Icon-only sizes.
- **Icon Intelligence** — Automatically sizes and positions SVGs inside the button.
- **Accessibility** — Built-in focus rings and keyboard navigation support.

## Examples

### Variants

Use the `variant` prop to change the visual style of the button.

<div class="preview border rounded-lg p-10 flex flex-wrap items-center justify-center gap-4 min-h-[200px]">
  <Button variant="default">Default</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="destructive">Destructive</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>
</div>

<CodeBlock language="svelte" code={
`<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
`} />

### Sizes

Use the `size` prop to control the dimensions of the button.

<div class="preview border rounded-lg p-10 flex flex-wrap items-end justify-center gap-4 min-h-[200px]">
  <Button size="sm">Small</Button>
  <Button size="default">Default</Button>
  <Button size="lg">Large</Button>
</div>

<CodeBlock language="svelte" code={
`<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
`} />

### With Icons

The button automatically styles SVG icons found within the children. It adjusts gap and sizing automatically.

<div class="preview border rounded-lg p-10 flex flex-wrap items-center justify-center gap-4 min-h-[200px]">
  <Button>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/></svg>
    Upload
  </Button>
  <Button variant="secondary">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
    Download
  </Button>
  <Button variant="outline" size="icon">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
  </Button>
</div>

<CodeBlock language="svelte" code={
`<Button>
  <UploadIcon /> Upload
</Button>

<Button variant="secondary">
  <DownloadIcon /> Download
</Button>

<Button variant="outline" size="icon">
  <ChevronRightIcon />
</Button>
`} />

### As Link

If you provide an `href` prop, the component renders as an anchor `<a>` tag but maintains the button styling.

<div class="preview border rounded-lg p-10 flex items-center justify-center min-h-[150px]">
  <Button href="#" variant="outline">
    Go to Home
  </Button>
</div>

<CodeBlock language="svelte" code={
`<Button href="/login" variant="default">
  Login
</Button>
`} />

### Disabled State

Add the standard `disabled` HTML attribute to prevent interactions. It applies `pointer-events-none` and opacity styles.

<div class="preview border rounded-lg p-10 flex items-center justify-center min-h-[150px]">
  <Button disabled>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
    Please wait
  </Button>
</div>

<CodeBlock language="svelte" code={
`<Button disabled>
  <LoaderIcon class="animate-spin" />
  Please wait
</Button>
`} />

## API Reference

### Button

Accepts all standard HTML attributes for `<button>` and `<a>`.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `string` | `'default'` | Visual style: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`. |
| `size` | `string` | `'default'` | Dimension: `default`, `sm`, `lg`, `icon`, `icon-sm`, `icon-lg`. |
| `href` | `string` | `undefined` | If defined, renders as an `<a>` tag. |
| `class` | `string` | — | Additional CSS classes. |
| `children` | `Snippet` | — | The content of the button. |
| `disabled` | `boolean` | `false` | Disables interaction and dim styles. |
