---
title: Collapsible
description: An interactive component that expands and collapses content with smooth transitions.
group: Components
componentId: collapsible
---

<script>
  import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '$lib/components/collapsible/index';
  import Button from '$lib/components/button/Button.svelte'; // Usado apenas para botões externos
  import CodeBlock from '$lib/intern/CodeBlock.svelte';
  
  // Icons (SVGs inline)
  const ChevronDown = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-200"><path d="m6 9 6 6 6-6"/></svg>
  `;
  const ChevronsUpDown = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
  `;

  let isOpen = $state(false);
  let basicOpen = $state(false);
  let faqOpen = $state(false);
</script>

<style>
  .collapsible-wrapper {
    min-height: fit-content;
  }
  
  :global(.chevron-icon) {
    transition: transform 200ms ease-in-out;
  }
  
  :global(.chevron-icon[data-state="open"]) {
    transform: rotate(180deg);
  }
</style>

The Collapsible component provides an elegant way to expand and collapse content sections.

## Installation

Copy the component files to your project:

<CodeBlock language="bash" code={`
src/lib/components/collapsible/
├── Collapsible.svelte
├── CollapsibleTrigger.svelte
├── CollapsibleContent.svelte
├── ctx.svelte.ts
└── index.ts
`} />

## Basic Usage

A classical usage example is a details panel or a menu where the header stays fixed and content reveals below.

<div class="preview border rounded-lg p-10 flex items-start justify-center" style="min-height: 350px;">
  <div class="collapsible-wrapper w-[350px]">
    <Collapsible bind:open={basicOpen} class="space-y-2">
      <div class="flex items-center justify-between space-x-4 px-4 py-2 border rounded-md shadow-sm bg-card">
        <h4 class="text-sm font-semibold">
          @pedro_duarte starred 3 repositories
        </h4>
        <!-- CORREÇÃO: Botão direto, sem componente Button aninhado -->
        <CollapsibleTrigger class="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted p-0 shrink-0">
            {@html ChevronsUpDown}
            <span class="sr-only">Toggle</span>
        </CollapsibleTrigger>
      </div>
      
      <div class="rounded-md border px-4 py-3 font-mono text-sm shadow-sm bg-card">
        @sveltejs/svelte
      </div>
      
      <CollapsibleContent class="space-y-2">
        <div class="rounded-md border px-4 py-3 font-mono text-sm shadow-sm bg-card">
          @radix-ui/primitives
        </div>
        <div class="rounded-md border px-4 py-3 font-mono text-sm shadow-sm bg-card">
          @melt-ui/melt-ui
        </div>
      </CollapsibleContent>
    </Collapsible>
  </div>
</div>

<CodeBlock language="svelte" code={`
<script>
  import { 
    Collapsible, 
    CollapsibleTrigger, 
    CollapsibleContent 
  } from '$lib/components/collapsible';
  import { ChevronsUpDown } from 'lucide-svelte';

  let open = $state(false);
</script>

<Collapsible bind:open class="w-[350px] space-y-2">
  <div class="flex items-center justify-between space-x-4 px-4 py-2 border rounded-md shadow-sm">
    <h4 class="text-sm font-semibold">
      @pedro_duarte starred 3 repositories
    </h4>
    <CollapsibleTrigger class="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted">
      <ChevronsUpDown class="h-4 w-4" />
      <span class="sr-only">Toggle</span>
    </CollapsibleTrigger>
  </div>
  
  <div class="rounded-md border px-4 py-3 font-mono text-sm shadow-sm">
    @sveltejs/svelte
  </div>
  
  <CollapsibleContent class="space-y-2">
    <div class="rounded-md border px-4 py-3 font-mono text-sm shadow-sm">
      @radix-ui/primitives
    </div>
    <div class="rounded-md border px-4 py-3 font-mono text-sm shadow-sm">
      @melt-ui/melt-ui
    </div>
  </CollapsibleContent>
</Collapsible>
`} />

## Examples

### FAQ Style

A simple accordion-like behavior using a full-width trigger with animated chevron icon.

<div class="preview border rounded-lg p-10 flex items-start justify-center" style="min-height: 250px;">
  <div class="collapsible-wrapper w-full max-w-md">
    <Collapsible bind:open={faqOpen} class="border rounded-md bg-card overflow-hidden">
      <CollapsibleTrigger class="flex w-full items-center justify-between p-4 font-medium hover:bg-muted/50 transition-colors [&[data-state=open]_.chevron-icon]:rotate-180">
        <span>Is this component accessible?</span>
        <span class="chevron-icon transition-transform duration-200 shrink-0" data-state={faqOpen ? 'open' : 'closed'}>
          {@html ChevronDown}
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div class="px-4 py-3 text-muted-foreground text-sm border-t">
          Yes. It adheres to the WAI-ARIA design pattern for disclosures.
        </div>
      </CollapsibleContent>
    </Collapsible>
  </div>
</div>

<CodeBlock language="svelte" code={`
<script>
  let open = $state(false);
</script>

<Collapsible bind:open class="w-full max-w-md border rounded-md overflow-hidden">
  <CollapsibleTrigger 
    class="flex w-full items-center justify-between p-4 font-medium hover:bg-muted/50 transition-colors [&[data-state=open]_.chevron-icon]:rotate-180"
  >
    <span>Is this component accessible?</span>
    <ChevronDown class="h-4 w-4 chevron-icon transition-transform duration-200" />
  </CollapsibleTrigger>
  <CollapsibleContent>
    <div class="px-4 py-3 text-muted-foreground text-sm border-t">
      Yes. It adheres to the WAI-ARIA design pattern for disclosures.
    </div>
  </CollapsibleContent>
</Collapsible>
`} />

### Controlled State

Control the collapsible state programmatically from external buttons.

<div class="preview border rounded-lg p-10 flex flex-col items-center justify-center gap-4" style="min-height: 280px;">
  <div class="flex items-center gap-2">
    <Button variant="outline" size="sm" onclick={() => isOpen = !isOpen}>
      {isOpen ? 'Close via Prop' : 'Open via Prop'}
    </Button>
    <Button variant="outline" size="sm" onclick={() => isOpen = true} disabled={isOpen}>
      Force Open
    </Button>
    <Button variant="outline" size="sm" onclick={() => isOpen = false} disabled={!isOpen}>
      Force Close
    </Button>
  </div>

  <div class="collapsible-wrapper w-[350px]">
    <Collapsible bind:open={isOpen} class="border rounded-md p-4 space-y-3 bg-card">
      <div class="flex items-center justify-between">
         <span class="text-sm font-semibold">System Status</span>
         <!-- CORREÇÃO: Botão direto, sem aninhamento -->
         <CollapsibleTrigger class="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted p-0 shrink-0">
            {@html ChevronsUpDown}
         </CollapsibleTrigger>
      </div>
      
      <CollapsibleContent class="space-y-2">
        <div class="text-xs text-muted-foreground bg-muted p-3 rounded-md space-y-1">
          <div class="font-medium text-foreground">All systems operational</div>
          <div class="flex justify-between"><span>CPU Load:</span><span class="font-mono">12%</span></div>
          <div class="flex justify-between"><span>Memory:</span><span class="font-mono">1.2GB</span></div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  </div>
</div>

<CodeBlock language="svelte" code={`
<script>
  let isOpen = $state(false);
</script>

<Button onclick={() => isOpen = !isOpen}>
  Toggle
</Button>

<Collapsible bind:open={isOpen} class="w-[350px] border rounded-md p-4">
  <div class="flex items-center justify-between">
     <span class="text-sm font-semibold">System Status</span>
     <CollapsibleTrigger class="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted">
        <ChevronsUpDown class="h-4 w-4" />
     </CollapsibleTrigger>
  </div>
  
  <CollapsibleContent class="space-y-2 mt-3">
    <div class="text-xs text-muted-foreground bg-muted p-3 rounded-md">
      <div>All systems operational</div>
      <div>CPU Load: 12%</div>
      <div>Memory: 1.2GB</div>
    </div>
  </CollapsibleContent>
</Collapsible>
`} />

## API Reference

### Collapsible

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| open | `boolean` | `false` | Controls the expanded/collapsed state |
| disabled | `boolean` | `false` | Disables the collapsible interaction |
| onOpenChange | `(open: boolean) => void` | - | Callback when open state changes |

### CollapsibleTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| disabled | `boolean` | `false` | Disables the trigger |

### CollapsibleContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| transition | `SlideParams` | `{ duration: 300 }` | Customize the slide transition |
