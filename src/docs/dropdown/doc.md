---
title: Dropdown Menu
description: Accessible dropdown menu for displaying contextual actions. Includes automatic positioning, keyboard navigation, and submenu support.
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

- **Smart Positioning** — The menu automatically adjusts to stay visible on screen
- **Portal** — Content is rendered in `<body>`, avoiding z-index and overflow issues
- **Accessibility** — ARIA attributes and complete keyboard navigation
- **Auto-close** — Closes on outside click, Escape key, or item selection
- **Submenus** — Support for one level of submenus with hover or keyboard opening

## Examples

### Items with Icons

Add icons to items using the `gap-2` class for proper spacing:

<div class="preview border rounded-lg p-10 flex items-center justify-center min-h-[200px]">
  <DropdownMenu>
    <DropdownTrigger variant="default">Actions</DropdownTrigger>
    <DropdownContent>
      <DropdownItem class="gap-2" onclick={() => alert('Edit')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
        Edit
      </DropdownItem>
      <DropdownItem class="gap-2" onclick={() => alert('Duplicate')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
        Duplicate
      </DropdownItem>
      <DropdownItem class="gap-2" onclick={() => alert('Archive')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>
        Archive
      </DropdownItem>
      <DropdownSeparator />
      <DropdownItem class="gap-2 text-destructive focus:text-destructive" onclick={() => alert('Delete')}>
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
    <DropdownItem class="gap-2" onclick={handleArchive}>
      <ArchiveIcon class="h-4 w-4" />
      Archive
    </DropdownItem>
    <DropdownSeparator />
    <DropdownItem
      class="gap-2 text-destructive focus:text-destructive"
      onclick={handleDelete}
    >
      <TrashIcon class="h-4 w-4" />
      Delete
    </DropdownItem>
  </DropdownContent>
</DropdownMenu>
`} />

### Separators and Labels

Organize items into groups using `DropdownLabel` and `DropdownSeparator`:

<div class="preview border rounded-lg p-10 flex items-center justify-center min-h-[200px]">
  <DropdownMenu>
    <DropdownTrigger>My Account</DropdownTrigger>
    <DropdownContent class="w-56">
      <DropdownLabel>Account</DropdownLabel>
      <DropdownSeparator />
      <DropdownItem class="gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        Profile
      </DropdownItem>
      <DropdownItem class="gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
        Settings
      </DropdownItem>
      <DropdownSeparator />
      <DropdownLabel>Team</DropdownLabel>
      <DropdownSeparator />
      <DropdownItem class="gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        Members
      </DropdownItem>
      <DropdownItem class="gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
        Invite
      </DropdownItem>
    </DropdownContent>
  </DropdownMenu>
</div>

<CodeBlock language="svelte" code={
`<DropdownMenu>
  <DropdownTrigger>My Account</DropdownTrigger>
  <DropdownContent class="w-56">
    <DropdownLabel>Account</DropdownLabel>
    <DropdownSeparator />
    <DropdownItem>Profile</DropdownItem>
    <DropdownItem>Settings</DropdownItem>
    <DropdownSeparator />
    <DropdownLabel>Team</DropdownLabel>
    <DropdownSeparator />
    <DropdownItem>Members</DropdownItem>
    <DropdownItem>Invite</DropdownItem>
  </DropdownContent>
</DropdownMenu>
`} />

### Submenus

Create hierarchical menus with `DropdownSub`, `DropdownSubTrigger`, `DropdownSubContent`, and `DropdownSubItem`. The submenu opens on hover or by navigating with arrow keys:

<div class="preview border rounded-lg p-10 flex items-center justify-center min-h-[250px]">
  <DropdownMenu>
    <DropdownTrigger>Options</DropdownTrigger>
    <DropdownContent class="w-48">
      <DropdownItem class="gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
        New photo
      </DropdownItem>
      <DropdownSeparator />
      <DropdownSub>
        <DropdownSubTrigger class="gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
          Invite users
        </DropdownSubTrigger>
        <DropdownSubContent>
          <DropdownSubItem onclick={() => alert('Email')}>
            By email
          </DropdownSubItem>
          <DropdownSubItem onclick={() => alert('Link')}>
            By link
          </DropdownSubItem>
          <DropdownSeparator />
          <DropdownSubItem onclick={() => alert('Contacts')}>
            From contacts list
          </DropdownSubItem>
        </DropdownSubContent>
      </DropdownSub>
      <DropdownSub>
        <DropdownSubTrigger class="gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
          Share
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
        Settings
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
  <DropdownTrigger>Options</DropdownTrigger>
  <DropdownContent class="w-48">
    <DropdownItem>New photo</DropdownItem>
    <DropdownSeparator />

    <DropdownSub>
      <DropdownSubTrigger>Invite users</DropdownSubTrigger>
      <DropdownSubContent>
        <DropdownSubItem onclick={handleEmailInvite}>
          By email
        </DropdownSubItem>
        <DropdownSubItem onclick={handleLinkInvite}>
          By link
        </DropdownSubItem>
        <DropdownSeparator />
        <DropdownSubItem onclick={handleContactsInvite}>
          From contacts list
        </DropdownSubItem>
      </DropdownSubContent>
    </DropdownSub>

    <DropdownSub>
      <DropdownSubTrigger>Share</DropdownSubTrigger>
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
    <DropdownItem>Settings</DropdownItem>

  </DropdownContent>
</DropdownMenu>
`} />

### Positioning

Define the preferred menu position through the `placement` prop. The component automatically adjusts if there's no space:

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
`<!-- Basic positions -->
<DropdownMenu placement="top">...</DropdownMenu>
<DropdownMenu placement="bottom">...</DropdownMenu>
<DropdownMenu placement="left">...</DropdownMenu>
<DropdownMenu placement="right">...</DropdownMenu>

<!-- With alignment -->

<DropdownMenu placement="top-start">...</DropdownMenu>
<DropdownMenu placement="top-end">...</DropdownMenu>
<DropdownMenu placement="bottom-start">...</DropdownMenu>
<DropdownMenu placement="bottom-end">...</DropdownMenu>
`} />

## Styling

All components accept the `class` prop for customization:

<CodeBlock language="svelte" code={
`<!-- Custom width -->
<DropdownContent class="w-64">
...
</DropdownContent>

<!-- Item with danger style -->
<DropdownItem class="text-destructive focus:text-destructive focus:bg-destructive/10">
  Delete
</DropdownItem>

<!-- Item with icon -->
<DropdownItem class="gap-2">
  <Icon class="h-4 w-4" />
  Text
</DropdownItem>

<!-- Custom label -->
<DropdownLabel class="text-primary">
  Main Section
</DropdownLabel>
`} />

## Complete Example

User menu with avatar, multiple sections, and submenu:

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
        Profile
      </DropdownItem>
      <DropdownItem class="gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
        Settings
      </DropdownItem>
      
      <DropdownSeparator />
      
      <DropdownSub>
        <DropdownSubTrigger class="gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
          Theme
        </DropdownSubTrigger>
        <DropdownSubContent>
          <DropdownSubItem>Light</DropdownSubItem>
          <DropdownSubItem>Dark</DropdownSubItem>
          <DropdownSubItem>System</DropdownSubItem>
        </DropdownSubContent>
      </DropdownSub>
      
      <DropdownSeparator />
      
      <DropdownItem 
        class="gap-2 text-destructive focus:text-destructive focus:bg-destructive/10"
        onclick={() => alert('Logout')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
        Sign out
      </DropdownItem>
    </DropdownContent>
  </DropdownMenu>
</div>

## Navegação por Teclado

### Main Menu

| Key               | Action                                                            |
| :---------------- | :---------------------------------------------------------------- |
| `Space` / `Enter` | Opens the menu (on trigger) or selects the focused item           |
| `↓`               | Opens the menu and focuses the first item / Moves to next item    |
| `↑`               | Opens the menu and focuses the last item / Moves to previous item |
| `Home`            | Focuses the first item                                            |
| `End`             | Focuses the last item                                             |
| `Esc`             | Closes the menu and returns focus to the trigger                  |
| `Tab`             | Closes the menu                                                   |

### Submenus

| Key                     | Action                                        |
| :---------------------- | :-------------------------------------------- |
| `→` / `Enter` / `Space` | Opens the submenu (on submenu trigger)        |
| `←` / `Esc`             | Closes the submenu and returns to parent item |
| `↓` / `↑`               | Navigates between submenu items               |

## API Reference

### DropdownMenu

Root component that manages the dropdown state.

| Prop        | Type        | Default    | Description                                                                                |
| :---------- | :---------- | :--------- | :----------------------------------------------------------------------------------------- |
| `placement` | `Placement` | `'bottom'` | Preferred position: `top`, `bottom`, `left`, `right` and variations with `-start` / `-end` |
| `children`  | `Snippet`   | —          | Must contain `DropdownTrigger` and `DropdownContent`                                       |

### DropdownTrigger

Button that opens/closes the dropdown.

| Prop       | Type      | Default     | Description                                                       |
| :--------- | :-------- | :---------- | :---------------------------------------------------------------- |
| `variant`  | `string`  | `'outline'` | `default`, `outline`, `ghost`, `secondary`, `destructive`, `link` |
| `size`     | `string`  | `'default'` | `default`, `sm`, `lg`, `icon`                                     |
| `class`    | `string`  | —           | Additional CSS classes                                            |
| `children` | `Snippet` | —           | Button content                                                    |

### DropdownContent

Dropdown menu container.

| Prop       | Type      | Default | Description            |
| :--------- | :-------- | :------ | :--------------------- |
| `class`    | `string`  | —       | Additional CSS classes |
| `children` | `Snippet` | —       | Menu items             |

### DropdownItem

Clickable menu item.

| Prop       | Type                      | Default | Description            |
| :--------- | :------------------------ | :------ | :--------------------- |
| `onclick`  | `(e: MouseEvent) => void` | —       | Click callback         |
| `class`    | `string`                  | —       | Additional CSS classes |
| `children` | `Snippet`                 | —       | Item content           |

### DropdownSeparator

Divider line between item groups.

| Prop    | Type     | Default | Description            |
| :------ | :------- | :------ | :--------------------- |
| `class` | `string` | —       | Additional CSS classes |

### DropdownLabel

Non-interactive text to identify sections.

| Prop       | Type      | Default | Description            |
| :--------- | :-------- | :------ | :--------------------- |
| `class`    | `string`  | —       | Additional CSS classes |
| `children` | `Snippet` | —       | Label text             |

### DropdownSub

Wrapper to create a submenu.

| Prop       | Type      | Default | Description                                                |
| :--------- | :-------- | :------ | :--------------------------------------------------------- |
| `children` | `Snippet` | —       | Must contain `DropdownSubTrigger` and `DropdownSubContent` |

### DropdownSubTrigger

Item that opens the submenu on hover or keyboard.

| Prop       | Type      | Default | Description                      |
| :--------- | :-------- | :------ | :------------------------------- |
| `class`    | `string`  | —       | Additional CSS classes           |
| `children` | `Snippet` | —       | Content (text and optional icon) |

### DropdownSubContent

Submenu container.

| Prop       | Type      | Default | Description            |
| :--------- | :-------- | :------ | :--------------------- |
| `class`    | `string`  | —       | Additional CSS classes |
| `children` | `Snippet` | —       | Submenu items          |

### DropdownSubItem

Clickable item within submenu.

| Prop       | Type                      | Default | Description            |
| :--------- | :------------------------ | :------ | :--------------------- |
| `onclick`  | `(e: MouseEvent) => void` | —       | Click callback         |
| `class`    | `string`                  | —       | Additional CSS classes |
| `children` | `Snippet`                 | —       | Item content           |
