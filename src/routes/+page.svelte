<script lang="ts">
 import Button from '$lib/components/button/Button.svelte';
 import ModeToggle from '$lib/components/theme-toggle/ModeToggle.svelte';
 import { fly } from 'svelte/transition';
</script>

{#snippet terminalIcon()}
 <svg
  width="14"
  height="14"
  viewBox="0 0 15 15"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
 >
  <path
   d="M4.79289 11.2071C4.60536 11.3946 4.60536 11.6987 4.79289 11.8862C4.98043 12.0737 5.28448 12.0737 5.47202 11.8862L8.97202 8.38623C9.15956 8.1987 9.15956 7.89465 8.97202 7.70712L5.47202 4.20712C5.28448 4.01959 4.98043 4.01959 4.79289 4.20712C4.60536 4.39465 4.60536 4.6987 4.79289 4.88623L7.95333 8.04668L4.79289 11.2071ZM10.5 10.5C10.5 10.2239 10.2761 10 10 10H8.5C8.22386 10 8 10.2239 8 10.5C8 10.7761 8.22386 11 8.5 11H10C10.2761 11 10.5 10.7761 10.5 10.5Z"
   fill="currentColor"
   fill-rule="evenodd"
   clip-rule="evenodd"
  ></path>
 </svg>
{/snippet}

<div class="fixed inset-0 z-[-1] bg-background">
 <div
  class="absolute inset-0 opacity-[0.04]"
  style="background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC43IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI24pIiBvcGFjaXR5PSIwLjUiLz48L3N2Zz4=');"
 ></div>
</div>

<div
 class="relative flex min-h-screen w-full flex-col font-sans selection:bg-foreground selection:text-background"
>
 <header
  class="fixed top-4 left-1/2 z-50 flex h-9 w-auto -translate-x-1/2 items-center gap-3 rounded-full border border-border/40 bg-background/50 pr-2 pl-4 backdrop-blur-md"
 >
  <a
   href="/"
   class="flex items-center gap-2 text-[11px] font-bold tracking-widest text-foreground uppercase transition-opacity hover:opacity-70"
  >
   <img src="/yy.svg" alt="RawUI Logo" class="h-4 w-4 opacity-90 dark:invert" />
   RAWUI
  </a>

  <div class="mx-1 h-2.5 w-px bg-border/60"></div>

  <!-- NAV -->
  <nav class="flex items-center gap-3 text-[11px] font-medium text-muted-foreground">
   <a href="/docs" class="transition-colors hover:text-foreground">Docs</a>
   <a
    href="https://github.com/ian0x-S2/RAWUI"
    target="_blank"
    class="transition-colors hover:text-foreground">GitHub</a
   >
  </nav>

  <div class="mx-1 h-2.5 w-px bg-border/60"></div>

  <div class="flex items-center">
   <div class="scale-75">
    <ModeToggle />
   </div>
  </div>
 </header>

 <main class="flex w-full flex-1 flex-col items-center justify-center px-4">
  <div class="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
   <h1
    class="mb-4 text-7xl font-bold tracking-tighter text-foreground sm:text-8xl md:text-9xl"
    style="letter-spacing: -0.06em;"
    in:fly={{ y: 10, duration: 400, delay: 50 }}
   >
    RAWUI
   </h1>

   <p
    class="mb-8 max-w-sm text-sm leading-relaxed font-medium text-muted-foreground md:text-base"
    in:fly={{ y: 10, duration: 400, delay: 100 }}
   >
    Raw components. No abstractions.<br />
    <span class="text-foreground/80">The code is yours, the rule is yours.</span>
   </p>

   <div class="flex items-center gap-3" in:fly={{ y: 10, duration: 400, delay: 150 }}>
    <Button href="/docs" size="sm" class="h-8 rounded-md px-5 text-xs font-semibold">
     {@render terminalIcon()}
     Docs
    </Button>

    <a
     href="/docs/button"
     class="px-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
     Components
    </a>
   </div>
  </div>
 </main>

 <footer class="pointer-events-none fixed bottom-4 left-0 w-full text-center">
  <p class="font-mono text-[9px] tracking-widest text-muted-foreground/50 uppercase">
   Svelte 5 &bull; Tailwind &bull; No Runtime
  </p>
 </footer>
</div>
