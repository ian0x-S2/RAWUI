---
title: Dropdown Menu
description: Accessible dropdown menu for displaying contextual actions. Includes automatic positioning, keyboard navigation, and submenu support.
group: Components
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
  
  // Example states for documentation
  let notifications = $state(true);
</script>

The Dropdown Menu component provides an elegant way to display lists of actions or options in a dropdown menu. Fully accessible, with complete keyboard navigation and support for one level of submenus.

## Installation

Copy the component files to your project:

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

**External dependency:**

<CodeBlock language="bash" code={`npm install @floating-ui/dom`} />

> The `DropdownTrigger` uses the Button component variants (`buttonVariants`). The `DropdownContent` and `DropdownSubContent` depend on the `Portal` component.

## Basic Usage

The dropdown consists of a trigger (button) and content that appears when clicked:

<div class="preview border rounded-lg p-10 flex items-center justify-center min-h-[200px]">
  <DropdownMenu>
    <DropdownTrigger>Open Menu</DropdownTrigger>
    <DropdownContent>
      <DropdownItem>Profile</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>Help</DropdownItem>
      <DropdownItem>Sign out</DropdownItem>
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
  <DropdownTrigger>Open Menu</DropdownTrigger>
  <DropdownContent>
    <DropdownItem>Profile</DropdownItem>
    <DropdownItem>Settings</DropdownItem>
    <DropdownItem>Help</DropdownItem>
    <DropdownItem>Sign out</DropdownItem>
  </DropdownContent>
</DropdownMenu>
`} />

## Features

- **Smart Positioning** — The menu automatically adjusts to stay visible on screen using Floating UI.
- **Portal** — Content is rendered in `<body>`, avoiding z-index and overflow issues.
- **Accessibility** — ARIA attributes and complete keyboard navigation (Arrow keys, Home, End, Enter, Escape).
- **Auto-close** — Closes on outside click, Escape key, or item selection.
- **Submenus** — Support for submenus with hover or keyboard opening (Right Arrow / Enter).
- **Flexible Interactions** — Control whether items close the menu on selection with `closeOnSelect`.
- **Disabled Items** — Support for non-interactive items that are visually dimmed and **skipped** during keyboard navigation.

## Examples

### Items with Icons

Add icons to items using the `gap-2` class for proper spacing:

<div class="preview border rounded-lg p-10 flex items-center justify-center min-h-[200px]">
  <DropdownMenu>
    <DropdownTrigger variant="default">Actions</DropdownTrigger>
    <DropdownContent>
       <DropdownItem class="gap-2">
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
         Edit
       </DropdownItem>
       <DropdownItem class="gap-2">
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
         Duplicate
       </DropdownItem>
       <DropdownSeparator />
       <DropdownItem class="gap-2 text-destructive focus:text-destructive">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
        Delete
      </DropdownItem>
    </DropdownContent>
  </DropdownMenu>
</div>
<CodeBlock language="svelte" code={
`<DropdownMenu>
  <DropdownTrigger variant="default">Actions</DropdownTrigger>
  <DropdownContent>
    <DropdownItem class="gap-2" onclick={handleEdit}>
      <EditIcon class="h-4 w-4" />
      Edit
    </DropdownItem>
    <DropdownItem class="gap-2" onclick={handleDuplicate}>
      <CopyIcon class="h-4 w-4" />
      Duplicate
    </DropdownItem>
    <DropdownSeparator />
    <DropdownItem class="gap-2 text-destructive focus:text-destructive" onclick={handleDelete}>
      <TrashIcon class="h-4 w-4" />
      Delete
    </DropdownItem>
  </DropdownContent>
</DropdownMenu>
`}
/>

### Submenus

Create hierarchical menus with `DropdownSub`, `DropdownSubTrigger`, `DropdownSubContent`, and `DropdownSubItem`. The submenu opens on hover or by navigating with arrow keys (Right):

<div class="preview border rounded-lg p-10 flex items-center justify-center min-h-[250px]">
  <DropdownMenu>
    <DropdownTrigger>Invite</DropdownTrigger>
    <DropdownContent class="w-48">
      <DropdownItem>New photo</DropdownItem>
      <DropdownSeparator />
      <DropdownSub>
        <DropdownSubTrigger class="gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
          Invite users
        </DropdownSubTrigger>
        <DropdownSubContent>
         <DropdownSubItem>By email</DropdownSubItem>
         <DropdownSubItem>By link</DropdownSubItem>
         <DropdownSeparator />
         <DropdownSubItem>From contacts</DropdownSubItem>
        </DropdownSubContent>
      </DropdownSub>
      <DropdownSeparator />
      <DropdownItem>Settings</DropdownItem>
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
  <DropdownTrigger>Invite</DropdownTrigger>
  <DropdownContent class="w-48">
    <DropdownItem>New photo</DropdownItem>
    <DropdownSeparator />
    
    <DropdownSub>
      <DropdownSubTrigger class="gap-2">
        <UserPlus class="size-4" />
        Invite users
      </DropdownSubTrigger>
      <DropdownSubContent>
        <DropdownSubItem>By email</DropdownSubItem>
        <DropdownSubItem>By link</DropdownSubItem>
        <DropdownSeparator />
        <DropdownSubItem>From contacts</DropdownSubItem>
      </DropdownSubContent>
    </DropdownSub>
    
    <DropdownSeparator />
    <DropdownItem>Settings</DropdownItem>
  </DropdownContent>
</DropdownMenu>
`}
/>

### Persisting Menu State (`closeOnSelect`)

Use `closeOnSelect={false}` to keep the menu open after selecting an item. This is perfect for toggles, switches, or "Copy" actions where you want to provide immediate feedback without forcing the user to reopen the menu.

<div class="preview border rounded-lg p-10 flex items-center justify-center min-h-[200px]">
  <DropdownMenu>
    <DropdownTrigger>Preferences</DropdownTrigger>
    <DropdownContent class="w-56">
      <DropdownLabel>Notifications</DropdownLabel>
      <DropdownItem 
        closeOnSelect={false} 
        onclick={() => notifications = !notifications}
        class="justify-between "
      >
        <span class="pr-1">Push Notifications</span>
        <span class={notifications ? "text-primary font-bold text-xs" : "text-muted-foreground text-xs"}>
          {notifications ? 'On' : 'Off'}
        </span>
      </DropdownItem>
      <DropdownSeparator />
      <DropdownItem onclick={() => alert('Saved!')}>Save Changes</DropdownItem>
    </DropdownContent>
  </DropdownMenu>
</div>

<CodeBlock language="svelte" code={
`<script>
let notifications = $state(true);
</script>

<DropdownMenu>
  <DropdownTrigger>Preferences</DropdownTrigger>
  <DropdownContent class="w-56">
    <DropdownLabel>Notifications</DropdownLabel>
    
    <!-- This item will NOT close the menu when clicked -->
    <DropdownItem 
      closeOnSelect={false} 
      onclick={() => notifications = !notifications}
      class="justify-between"
    >
      <span>Push Notifications</span>
      <span>{notifications ? 'On' : 'Off'}</span>
    </DropdownItem>
    
    <DropdownSeparator />
    <!-- This item WILL close the menu (default behavior) -->
    <DropdownItem onclick={save}>Save Changes</DropdownItem>
  </DropdownContent>
</DropdownMenu>
`}
/>

### Disabled Items

Use the `disabled` prop to create non-interactive items. These items are visually dimmed and **automatically skipped** during keyboard navigation for accessibility.

<div class="preview border rounded-lg p-10 flex items-center justify-center min-h-[200px]">
  <DropdownMenu>
    <DropdownTrigger>Account</DropdownTrigger>
    <DropdownContent class="w-56">
      <DropdownItem>Profile</DropdownItem>
      <DropdownItem disabled class="justify-between">
        Billing
        <span class="text-[10px] uppercase font-bold">Soon</span>
      </DropdownItem>
      <DropdownItem>Team</DropdownItem>
      <DropdownSeparator />
      <DropdownItem>Log out</DropdownItem>
    </DropdownContent>
  </DropdownMenu>
</div>

<CodeBlock language="svelte" code={
`<DropdownMenu>
<DropdownTrigger>Account</DropdownTrigger>
<DropdownContent class="w-56">
<DropdownItem>Profile</DropdownItem>

    <!-- This item cannot be clicked or focused via keyboard -->
    <DropdownItem disabled class="justify-between">
      Billing
      <span class="text-[10px] uppercase font-bold">Soon</span>
    </DropdownItem>

    <DropdownItem>Team</DropdownItem>
    <DropdownSeparator />
    <DropdownItem>Log out</DropdownItem>

  </DropdownContent>
</DropdownMenu>
`}
/>

### Positioning

Define the preferred menu position through the `placement` prop. The component automatically adjusts if there's no space.

<CodeBlock language="svelte" code={
`<!-- Basic positions -->
<DropdownMenu placement="top">...</DropdownMenu>
<DropdownMenu placement="bottom">...</DropdownMenu>
<DropdownMenu placement="left">...</DropdownMenu>
<DropdownMenu placement="right">...</DropdownMenu>

<!-- With alignment -->

<DropdownMenu placement="bottom-start">...</DropdownMenu>
<DropdownMenu placement="bottom-end">...</DropdownMenu>
`} />

## Keyboard Navigation

This component implements a robust keyboard navigation system that respects disabled items.

| Key               | Action                                                                 |
| :---------------- | :--------------------------------------------------------------------- |
| `Enter` / `Space` | Opens the menu (on trigger) or activates the focused item.             |
| `ArrowDown`       | Focuses the next valid item. Skips disabled items.                     |
| `ArrowUp`         | Focuses the previous valid item. Skips disabled items.                 |
| `Home`            | Focuses the first valid item.                                          |
| `End`             | Focuses the last valid item.                                           |
| `Escape`          | Closes the menu and returns focus to the trigger.                      |
| `ArrowRight`      | Opens a submenu if the focused item is a `DropdownSubTrigger`.         |
| `ArrowLeft`       | Closes the current submenu and returns focus to the parent menu.       |
| `Tab`             | Closes the menu and moves focus to the next focusable element on page. |

## API Reference

### DropdownMenu

Root component that manages the dropdown state.

| Prop        | Type        | Default    | Description                                           |
| :---------- | :---------- | :--------- | :---------------------------------------------------- |
| `placement` | `Placement` | `'bottom'` | Preferred position options from Floating UI.          |
| `children`  | `Snippet`   | —          | Must contain `DropdownTrigger` and `DropdownContent`. |

### DropdownTrigger

Button that opens the dropdown menu.

| Prop       | Type            | Default     | Description                               |
| :--------- | :-------------- | :---------- | :---------------------------------------- |
| `variant`  | `ButtonVariant` | `'outline'` | Button variant from the Button component. |
| `size`     | `ButtonSize`    | `'default'` | Button size from the Button component.    |
| `class`    | `string`        | —           | Additional CSS classes.                   |
| `children` | `Snippet`       | —           | Button content.                           |

### DropdownItem

Clickable menu item.

| Prop            | Type                      | Default | Description                                                                |
| :-------------- | :------------------------ | :------ | :------------------------------------------------------------------------- |
| `onclick`       | `(e: MouseEvent) => void` | —       | Click event handler.                                                       |
| `closeOnSelect` | `boolean`                 | `true`  | If `false`, the menu remains open after clicking.                          |
| `disabled`      | `boolean`                 | `false` | If `true`, the item is non-interactive and skipped by keyboard navigation. |
| `class`         | `string`                  | —       | Additional CSS classes.                                                    |
| `children`      | `Snippet`                 | —       | Item content.                                                              |

### DropdownSeparator

Visual separator between menu sections.

| Prop    | Type     | Default | Description             |
| :------ | :------- | :------ | :---------------------- |
| `class` | `string` | —       | Additional CSS classes. |

### DropdownLabel

Non-interactive label for grouping menu items.

| Prop       | Type      | Default | Description             |
| :--------- | :-------- | :------ | :---------------------- |
| `class`    | `string`  | —       | Additional CSS classes. |
| `children` | `Snippet` | —       | Label content.          |

### DropdownSub

Wrapper to create a submenu.

| Prop       | Type      | Default | Description                                                 |
| :--------- | :-------- | :------ | :---------------------------------------------------------- |
| `children` | `Snippet` | —       | Must contain `DropdownSubTrigger` and `DropdownSubContent`. |

### DropdownSubTrigger

Item that opens the submenu on hover or keyboard.

| Prop       | Type      | Default | Description                       |
| :--------- | :-------- | :------ | :-------------------------------- |
| `class`    | `string`  | —       | Additional CSS classes.           |
| `children` | `Snippet` | —       | Content (text and optional icon). |

### DropdownSubContent

Container for submenu items.

| Prop       | Type      | Default | Description             |
| :--------- | :-------- | :------ | :---------------------- |
| `class`    | `string`  | —       | Additional CSS classes. |
| `children` | `Snippet` | —       | Submenu items.          |

### DropdownSubItem

Clickable submenu item. Always closes the menu when selected.

| Prop       | Type                      | Default | Description                                                                |
| :--------- | :------------------------ | :------ | :------------------------------------------------------------------------- |
| `onclick`  | `(e: MouseEvent) => void` | —       | Click event handler.                                                       |
| `disabled` | `boolean`                 | `false` | If `true`, the item is non-interactive and skipped by keyboard navigation. |
| `class`    | `string`                  | —       | Additional CSS classes.                                                    |
| `children` | `Snippet`                 | —       | Item content.                                                              |

### DropdownContent

Container for menu items.

| Prop       | Type      | Default | Description             |
| :--------- | :-------- | :------ | :---------------------- |
| `class`    | `string`  | —       | Additional CSS classes. |
| `children` | `Snippet` | —       | Menu items.             |
