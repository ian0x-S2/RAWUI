---
title: Introduction
description: A personal collection of accessible components built with Svelte 5 and Tailwind CSS.
group: Getting Started
order: 1
published: true
---

<script>
  import CodeBlock from '$lib/intern/CodeBlock.svelte';
  import { 
    Accordion, 
    AccordionItem, 
    AccordionTrigger, 
    AccordionContent 
  } from '$lib/components/accordion';

  const installDepsCode = `npm install clsx tailwind-merge class-variance-authority`;
  const floatingUiCode = `npm install @floating-ui/dom`;
  
  const utilsCode = `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;
</script>

# Introduction

I built this collection to have a solid, modern foundation for my own Svelte 5 applications. I am sharing it because I believe in the "copy and paste" philosophy, and it might be useful for your projects too.

<div class="my-8 rounded-lg border bg-muted/50 p-6">
  <p class="text-lg font-medium leading-relaxed">
    This is a <strong>personal toolkit</strong>, not a strictly versioned library.
  </p>
  <p class="mt-2 text-muted-foreground">
    I use these components in my own apps, so they are battle-tested for my needs. Feel free to copy, adapt, and make them your own.
  </p>
</div>

## Motivation

Why did I build this instead of using an existing library?

<div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
  <!-- Feature 1 -->
  <div class="flex flex-col gap-2">
    <div class="flex h-10 w-10 items-center justify-center rounded-md border bg-background shadow-sm">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
    </div>
    <h3 class="font-semibold">Native Svelte 5</h3>
    <p class="text-sm text-muted-foreground leading-relaxed">
      I wanted components written from scratch using <strong>Runes</strong>, without legacy stores or adapters found in older libraries.
    </p>
  </div>

  <!-- Feature 2 -->
  <div class="flex flex-col gap-2">
    <div class="flex h-10 w-10 items-center justify-center rounded-md border bg-background shadow-sm">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 14.14 14.14"/></svg>
    </div>
    <h3 class="font-semibold">Control & Ownership</h3>
    <p class="text-sm text-muted-foreground leading-relaxed">
      NPM packages act as "black boxes". By copying the code, I have full control over the logic and styles, making debugging and customization instant.
    </p>
  </div>

  <!-- Feature 3 -->
  <div class="flex flex-col gap-2">
    <div class="flex h-10 w-10 items-center justify-center rounded-md border bg-background shadow-sm">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" x2="12" y1="22.08" y2="12"/></svg>
    </div>
    <h3 class="font-semibold">Headless Core</h3>
    <p class="text-sm text-muted-foreground leading-relaxed">
      I focus on solid HTML structure, focus management, and ARIA attributes. Styling is applied via Tailwind classes that I (and you) can easily change.
    </p>
  </div>
</div>

## Installation

Since this is not an npm package, "installation" consists of preparing your environment.

### 1. The `cn` Utility

This helper is essential. It allows conditionally combining Tailwind classes (like `clsx`) and resolves style conflicts (like `tailwind-merge`).

Install dependencies:

<CodeBlock language="bash" code={installDepsCode} />

Create the file at `src/lib/utils/index.ts` (or wherever you prefer):

<CodeBlock language="typescript" code={utilsCode} />

### 2. Path Configuration

To make imports easier (e.g., `$lib/components/...`), ensure your `tsconfig.json` or `svelte.config.js` has aliases configured. This is standard in SvelteKit.

```json
"paths": {
  "$lib": ["./src/lib"],
  "$lib/*": ["./src/lib/*"]
}
```

### 3. Floating UI (Optional)

For components that "float" (Dropdown, Tooltip, Popover), I use `floating-ui` for positioning.

<CodeBlock language="bash" code={floatingUiCode} />

## FAQ

<Accordion type="single" class="w-full mt-6">
  <AccordionItem value="item-1">
    <AccordionTrigger>
      Is this actively maintained?
    </AccordionTrigger>
    <AccordionContent>
      I maintain it as long as I use it in my personal projects. Don't expect a strict release schedule or 24/7 support, but do expect code that works in real-world scenarios.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger>
      Can I use this in my projects?
    </AccordionTrigger>
    <AccordionContent>
      Absolutely. The code is MIT licensed. You are free to use it for personal or commercial work. Just remember that once you copy it, it's yours to maintain.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-3">
    <AccordionTrigger>
      How do I handle updates?
    </AccordionTrigger>
    <AccordionContent>
      There is no "npm update". If I add a cool feature or fix a bug here, you'll need to manually update your file. This is a feature, not a bug—it ensures an update never breaks your app unexpectedly.
    </AccordionContent>
  </AccordionItem>
</Accordion>
