---
title: Introdução
description: Componentes reutilizáveis construídos com Svelte 5 e Tailwind CSS.
group: Começando
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
  
  // Ícones
  const icons = {
    copy: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`,
    custom: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>`,
    light: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    a11y: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 14.14 14.14"/></svg>`
  };

  const installDepsCode = `npm install clsx tailwind-merge class-variance-authority`;

  const utilsCode = `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

  const buttonUsageCode = `<script>
  import Button from '$lib/components/ui/button/Button.svelte';
<\/script>

<Button variant="default" onclick={() => console.log('Click')}>
  Clique aqui
</Button>`;

  const floatingUiCode = `npm install @floating-ui/dom`;
</script>

# Components on demand

    Isso ***não***  é uma biblioteca tradicional. É uma coleção de componentes que você copia e cola.

    Pacotes npm trazem abstrações excessivas e "caixas pretas" que  obscurecem a implementação, tornando o debugging um labirinto e o entendimento do código uma tarefa exaustiva.

## Características

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="flex flex-col gap-2 rounded-lg border p-4 bg-card text-card-foreground hover:bg-muted/40 transition-colors">
    <div class="flex items-center gap-2 font-semibold">
      {@html icons.copy}
      <span>Copie e Cole</span>
    </div>
    <span class="text-sm text-muted-foreground">Sem instalações npm complexas. Pegue apenas o que precisa.</span>
  </div>
  <div class="flex flex-col gap-2 rounded-lg border p-4 bg-card text-card-foreground hover:bg-muted/40 transition-colors">
    <div class="flex items-center gap-2 font-semibold">
      {@html icons.custom}
      <span>Totalmente Customizável</span>
    </div>
    <span class="text-sm text-muted-foreground">O código vive no seu projeto. Altere estilos, lógica e comportamento livremente.</span>
  </div>
   <div class="flex flex-col gap-2 rounded-lg border p-4 bg-card text-card-foreground hover:bg-muted/40 transition-colors">
    <div class="flex items-center gap-2 font-semibold">
      {@html icons.light}
      <span>Svelte 5 & Runes</span>
    </div>
    <span class="text-sm text-muted-foreground">Escrito nativamente com a nova sintaxe de reatividade do Svelte 5.</span>
  </div>
  <div class="flex flex-col gap-2 rounded-lg border p-4 bg-card text-card-foreground hover:bg-muted/40 transition-colors">
    <div class="flex items-center gap-2 font-semibold">
      {@html icons.a11y}
      <span>Acessível</span>
    </div>
    <span class="text-sm text-muted-foreground">Foco em padrões WAI-ARIA, gerenciamento de foco e navegação por teclado.</span>
  </div>
</div>

## Pré-requisitos

Antes de começar, certifique-se de ter um projeto SvelteKit configurado com Tailwind CSS.

### 1. Utilitários e Variantes

Instale os pacotes necessários para gerenciamento de classes condicionais e variantes de componentes:

<CodeBlock language="bash" code={installDepsCode} />

- `clsx` e `tailwind-merge`: Utilizados para mesclar classes CSS de forma inteligente.
- `class-variance-authority`: Utilizado para criar variantes de estilo (ex: botões `primary`, `outline`, `ghost`).

Em seguida, crie o helper `cn` em `src/lib/utils/index.ts`:

<CodeBlock language="typescript" code={utilsCode} />

### 2. Configure os caminhos (Aliases)

Para facilitar as importações, recomendamos configurar o alias `$lib` no seu `tsconfig.json` ou `svelte.config.js`, o que é padrão no SvelteKit.

```json
"paths": {
  "$lib": ["./src/lib"],
  "$lib/*": ["./src/lib/*"]
}
```

### 3. Dependências para Flutuantes

Componentes que precisam de posicionamento dinâmico (como **Dropdowns**, **Popovers** e **Tooltips**) utilizam a biblioteca `@floating-ui/dom`.

<CodeBlock language="bash" code={floatingUiCode} />

## FAQ

<Accordion type="single" class="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Posso usar isso em produção?</AccordionTrigger>
    <AccordionContent>
      Sim. O código é seu para auditar e manter. Como não há dependências ocultas de terceiros para a lógica, você tem controle total sobre a estabilidade.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger>Vocês usam alguma lib de headless UI?</AccordionTrigger>
    <AccordionContent>
      Apenas para posicionamento (<code>@floating-ui</code>). A lógica de estado, acessibilidade e interatividade é 100% nativa do Svelte 5 usando Runes, evitando o peso e a complexidade de adaptadores para outras bibliotecas.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-3">
    <AccordionTrigger>Como atualizo os componentes?</AccordionTrigger>
    <AccordionContent>
      Como você copia o código, não há "atualização automática". Você pode voltar aqui para ver se houve melhorias e aplicá-las manualmente se desejar. Isso evita que atualizações automáticas quebrem seu layout silenciosamente.
    </AccordionContent>
  </AccordionItem>
</Accordion>
