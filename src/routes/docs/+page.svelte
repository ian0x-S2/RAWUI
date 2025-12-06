<script lang="ts">
 import type { PageData } from './$types';
 import { fade, fly } from 'svelte/transition';

 let { data }: { data: PageData } = $props();

 const groups = data.docsTree?.filter((g) => g.groupName !== 'Outros') || [];
</script>

{#snippet githubIcon()}
 <svg
  xmlns="http://www.w3.org/2000/svg"
  width="15"
  height="15"
  viewBox="0 0 24 24"
  fill="currentColor"
 >
  <path
   d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
  />
 </svg>
{/snippet}

<div
 class="flex min-h-screen flex-col items-center justify-center bg-background py-12 font-sans text-foreground selection:bg-primary/20"
 in:fade={{ duration: 200 }}
>
 <div class="w-full max-w-3xl px-6">
  <!-- HEADER SECTION -->
  <div class="flex flex-col items-start gap-5">
   <div in:fly={{ y: 10, duration: 300 }} class="space-y-3">
    <div class="flex items-center gap-3">
     <h1 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
      Design System
     </h1>
     <span
      class="rounded-full border border-border bg-muted/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
     >
      v1.0.0
     </span>
    </div>

    <p
     class="max-w-lg text-sm leading-relaxed text-muted-foreground"
     in:fly={{ y: 10, duration: 300, delay: 100 }}
    >
     Componentes, tokens e guias para interfaces consistentes. Simples, modular e pronto
     para produção.
    </p>
   </div>

   <div
    class="flex w-full items-center gap-3 sm:w-auto"
    in:fly={{ y: 10, duration: 300, delay: 200 }}
   >
    <a
     href="/doc/introduction"
     class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
    >
     Começar
    </a>
    <a
     href="https://github.com/seu-repo"
     target="_blank"
     rel="noreferrer"
     class="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
    >
     {@render githubIcon()}
     GitHub
    </a>
   </div>
  </div>

  <!-- DIVIDER -->
  <div
   class="my-8 w-full border-t border-border/40"
   in:fade={{ duration: 300, delay: 300 }}
  ></div>

  <!-- COMPACT FOOTER / CONTRIBUTE -->
  <div
   class="flex flex-col justify-between gap-4 text-sm sm:flex-row sm:items-center"
   in:fly={{ y: 10, duration: 300, delay: 400 }}
  >
   <div class="text-muted-foreground">
    <span class="font-medium text-foreground">Contribua:</span> O projeto é open-source.
   </div>
   <a
    href="https://github.com/seu-repo/issues"
    target="_blank"
    class="text-xs font-medium text-primary underline-offset-4 hover:underline"
   >
    Abrir Issue &rarr;
   </a>
  </div>
 </div>
</div>
