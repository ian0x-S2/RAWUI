---
title: Select
description: Accessible select component with single/multiple selection and keyboard navigation.
group: Components
componentId: select
---

<script>
  import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
  } from '$lib/components/select/index';
  import CodeBlock from '$lib/intern/CodeBlock.svelte';

  // Example states for documentation
  let singleValue = $state('');
  let multipleValues = $state(['apple', 'banana']);
</script>

The Select component provides an accessible dropdown for selecting single or multiple values. Built with Floating UI for positioning, it includes complete keyboard navigation and full accessibility support.

## Installation

Copy the component files to your project:

<CodeBlock language="bash" code={
`src/lib/components/select/
├── Select.svelte
├── SelectTrigger.svelte
├── SelectValue.svelte
├── SelectContent.svelte
├── SelectItem.svelte
├── ctx.svelte.ts
└── index.ts
`} />

**External dependency:**

<CodeBlock language="bash" code={`npm install @floating-ui/dom`} />

> The `SelectContent` depends on the `Portal` component for proper rendering outside the DOM tree.

## Basic Usage

The select consists of a trigger button and content with selectable items. Use `bind:value` for two-way binding:

<div class="preview border rounded-lg p-10 flex items-center justify-center min-h-[200px]">
  <Select bind:value={singleValue}>
    <SelectTrigger>
      <SelectValue placeholder="Select a fruit..." />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="Apple">Apple</SelectItem>
      <SelectItem value="Banana">Banana</SelectItem>
      <SelectItem value="Orange">Orange</SelectItem>
      <SelectItem value="Grape">Grape</SelectItem>
    </SelectContent>
  </Select>
</div>

<CodeBlock language="svelte" code={
`<script>
let selectedFruit = $state('apple');
</script>

<Select bind:value={selectedFruit}>
  <SelectTrigger>
    <SelectValue placeholder="Select a fruit..." />
  </SelectTrigger>
  <SelectContent>
      <SelectItem value="Apple">Apple</SelectItem>
      <SelectItem value="Banana">Banana</SelectItem>
      <SelectItem value="Orange">Orange</SelectItem>
      <SelectItem value="Grape">Grape</SelectItem>
  </SelectContent>
</Select>
`} />

## Features

- **Single/Multiple Selection** — Choose between single value or array of values with TypeScript generics
- **Smart Positioning** — Automatically positions using Floating UI with flip and shift
- **Portal Rendering** — Content rendered in `<body>` to avoid z-index and overflow issues
- **Keyboard Navigation** — Full arrow key navigation, Home/End, Enter/Space selection
- **Accessibility** — ARIA attributes, screen reader support, focus management
- **Disabled Items** — Support for non-interactive items that are visually dimmed and skipped in navigation
- **Auto-close** — Closes on selection (single mode) or stays open (multiple mode)

## Examples

### Multiple Selection

Use the `multiple` prop and bind to an array:

<div class="preview border rounded-lg p-10 flex items-center justify-center min-h-[200px]">
  <Select bind:value={multipleValues} multiple>
    <SelectTrigger>
      <SelectValue placeholder="Select fruits..." />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="Apple">🍎 Apple</SelectItem>
      <SelectItem value="Banana">🍌 Banana</SelectItem>
      <SelectItem value="Orange">🍊 Orange</SelectItem>
      <SelectItem value="Grape">🍇 Grape</SelectItem>
    </SelectContent>
  </Select>
</div>

<CodeBlock language="svelte" code={
`<script>
let selectedFruits = $state(['apple', 'banana']);
</script>

<Select bind:value={selectedFruits} multiple>
  <SelectTrigger>
    <SelectValue placeholder="Select fruits..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">🍎 Apple</SelectItem>
    <SelectItem value="banana">🍌 Banana</SelectItem>
    <SelectItem value="orange">🍊 Orange</SelectItem>
    <SelectItem value="grape">🍇 Grape</SelectItem>
  </SelectContent>
</Select>
`} />

### Disabled Items

Use the `disabled` prop to create non-interactive items:

<div class="preview border rounded-lg p-10 flex items-center justify-center min-h-[200px]">
  <Select bind:value={singleValue}>
    <SelectTrigger>
      <SelectValue placeholder="Select an option..." />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="Active Option">Active Option</SelectItem>
      <SelectItem value="Disabled" disabled>Disabled Option</SelectItem>
      <SelectItem value="Another Option">Another Option</SelectItem>
    </SelectContent>
  </Select>
</div>

<CodeBlock language="svelte" code={
`<Select bind:value={selectedValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select an option..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="active">Active Option</SelectItem>
    <SelectItem value="disabled" disabled>Disabled Option</SelectItem>
    <SelectItem value="another">Another Option</SelectItem>
  </SelectContent>
</Select>
`} />

### With Custom Labels

Use the `label` prop when the display text differs from the value:

<CodeBlock language="svelte" code={
`<script>
let country = $state('us');
</script>

<Select bind:value={country}>
  <SelectTrigger>
    <SelectValue placeholder="Select country..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="us" label="United States">🇺🇸 United States</SelectItem>
    <SelectItem value="ca" label="Canada">🇨🇦 Canada</SelectItem>
    <SelectItem value="mx" label="Mexico">🇲🇽 Mexico</SelectItem>
  </SelectContent>
</Select>
`} />

## Keyboard Navigation

This component implements comprehensive keyboard navigation that respects disabled items.

| Key               | Action                                                      |
| :---------------- | :---------------------------------------------------------- |
| `Enter` / `Space` | Opens the menu (on trigger) or selects the highlighted item |
| `ArrowDown`       | Opens menu or moves highlight down                          |
| `ArrowUp`         | Opens menu or moves highlight up                            |
| `Home`            | Moves highlight to first item                               |
| `End`             | Moves highlight to last item                                |
| `Escape`          | Closes the menu                                             |
| `Tab`             | Closes the menu and moves focus to next element             |

## API Reference

### Select

Root component that manages selection state.

| Prop            | Type                 | Default | Description                                      |
| :-------------- | :------------------- | :------ | :----------------------------------------------- |
| `value`         | `string \| string[]` | —       | Selected value(s). Use with `bind:value`         |
| `onValueChange` | `(value) => void`    | —       | Callback when value changes                      |
| `multiple`      | `boolean`            | `false` | Enables multiple selection mode                  |
| `children`      | `Snippet`            | —       | Must contain `SelectTrigger` and `SelectContent` |

### SelectTrigger

Button that opens the select dropdown.

| Prop       | Type      | Default | Description                            |
| :--------- | :-------- | :------ | :------------------------------------- |
| `class`    | `string`  | —       | Additional CSS classes                 |
| `children` | `Snippet` | —       | Button content (usually `SelectValue`) |

### SelectValue

Displays the selected value(s) or placeholder.

| Prop          | Type     | Default       | Description                       |
| :------------ | :------- | :------------ | :-------------------------------- |
| `placeholder` | `string` | `'Select...'` | Text shown when no value selected |
| `class`       | `string` | —             | Additional CSS classes            |

### SelectContent

Container for selectable items.

| Prop       | Type      | Default | Description            |
| :--------- | :-------- | :------ | :--------------------- |
| `class`    | `string`  | —       | Additional CSS classes |
| `children` | `Snippet` | —       | SelectItem components  |

### SelectItem

Individual selectable option.

| Prop       | Type      | Default | Description                                                  |
| :--------- | :-------- | :------ | :----------------------------------------------------------- |
| `value`    | `string`  | —       | Unique value for this item                                   |
| `label`    | `string`  | —       | Display text (defaults to children text)                     |
| `disabled` | `boolean` | `false` | If `true`, item is non-interactive and skipped in navigation |
| `class`    | `string`  | —       | Additional CSS classes                                       |
| `children` | `Snippet` | —       | Item content                                                 |
