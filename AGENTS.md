# Svelte Component Library Guidelines

> Uma biblioteca de componentes Svelte inspirada no shadcn/ui, focada em copy-and-paste sem dependências de terceiros.

## Princípios Fundamentais

1. **Zero dependências de UI** - Não usar Radix, Headless UI ou similares
2. **Copy & Paste** - Componentes devem ser copiáveis e customizáveis
3. **Composable** - Componentes pequenos e combináveis
4. **Acessível** - ARIA attributes e keyboard navigation obrigatórios
5. **Type-safe** - TypeScript em todo lugar

---

## Estrutura de Arquivos

Cada componente deve seguir esta estrutura:

```
src/lib/components/[component-name]/
├── ctx.svelte.ts          # Estado e lógica compartilhada
├── index.ts               # Barrel exports
├── [ComponentName].svelte # Componente root
├── [ComponentName]*.svelte # Sub-componentes
```

### Exemplo de Estrutura

```
src/lib/components/dialog/
├── ctx.svelte.ts
├── index.ts
├── Dialog.svelte
├── DialogTrigger.svelte
├── DialogContent.svelte
├── DialogHeader.svelte
├── DialogFooter.svelte
├── DialogTitle.svelte
└── DialogDescription.svelte
```

---

## Arquivo de Contexto (ctx.svelte.ts)

O arquivo `ctx.svelte.ts` contém toda a lógica de estado usando classes com Svelte 5 runes.

### Padrão de State Class

```typescript
// ctx.svelte.ts
import { getContext, setContext } from 'svelte';

type Options = {
  baseId: string;
  // outras opções...
};

export class ComponentState {
  // Estado reativo com $state
  isOpen = $state(false);
  
  // Referências de elementos
  triggerEl: HTMLElement | undefined = $state();
  contentEl: HTMLElement | undefined = $state();
  
  // Opções imutáveis
  options: Options;
  
  constructor(options: Options) {
    this.options = options;
    
    // Effects para side-effects
    $effect(() => {
      if (!this.isOpen) return;
      // setup...
      return () => {
        // cleanup...
      };
    });
  }
  
  // Métodos de ação
  toggle = () => (this.isOpen = !this.isOpen);
  open = () => (this.isOpen = true);
  close = () => (this.isOpen = false);
  
  // Props computadas para elementos
  get triggerProps() {
    return {
      'aria-expanded': this.isOpen,
      'aria-controls': `${this.options.baseId}-content`,
      'data-state': this.isOpen ? 'open' : 'closed',
      onclick: this.toggle,
      // ...
    };
  }
  
  get contentProps() {
    return {
      id: `${this.options.baseId}-content`,
      role: 'dialog',
      'data-state': this.isOpen ? 'open' : 'closed',
      // ...
    };
  }
}

// Context helpers
const ROOT_KEY = 'component-root';
const ITEM_KEY = 'component-item';

export const setComponentRoot = (state: ComponentState) => setContext(ROOT_KEY, state);
export const getComponentRoot = () => getContext<ComponentState>(ROOT_KEY);

// Para componentes com items (accordion, tabs, etc.)
export const setComponentItem = (state: ItemState) => setContext(ITEM_KEY, state);
export const getComponentItem = () => getContext<ItemState>(ITEM_KEY);
```

### Convenções de Naming para Context Keys

| Tipo | Pattern | Exemplo |
|------|---------|---------|
| Root | `[component]-root` | `dialog-root`, `accordion-root` |
| Item | `[component]-item` | `accordion-item`, `tabs-item` |

---

## Arquivo de Exports (index.ts)

- pattern aceito:

### Pattern 1: Exports diretos (recomendado para maioria)

```typescript
// index.ts
import Accordion from './Accordion.svelte';
import AccordionItem from './AccordionItem.svelte';
import AccordionTrigger from './AccordionTrigger.svelte';
import AccordionContent from './AccordionContent.svelte';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
```
---

## Componentes Svelte

### Root Component

O componente raiz instancia o estado e o disponibiliza via context.

```svelte
<script lang="ts">
  import { setContext, type Snippet } from 'svelte';
  import { ComponentState } from './ctx.svelte.js';

  type Props = {
    children: Snippet;
    open?: boolean;           // Para binding bidirecional
    // outras props...
  };

  let { children, open = $bindable(false), ...restProps }: Props = $props();

  // ID único e consistente (Server/Client)
  const uid = $props.id();

  // Instancia o state
  const state = new ComponentState({ baseId: uid });

  // Sincronização bidirecional
  $effect(() => {
    open = state.isOpen;
  });

  $effect(() => {
    if (open !== state.isOpen) state.isOpen = open;
  });

  // Disponibiliza no context
  setContext('component-root', state);
</script>

{@render children()}
```

### Trigger Component

```svelte
<script lang="ts">
  import { getContext, type Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { ComponentState } from './ctx.svelte.js';
  import { cn } from '$lib/utils';
  import { buttonVariants } from '$lib/components/button/Button.svelte';
  import type { VariantProps } from 'class-variance-authority';

  type ButtonVariantProps = VariantProps<typeof buttonVariants>;

  type Props = {
    children: Snippet;
    class?: string;
    variant?: ButtonVariantProps['variant'];
    size?: ButtonVariantProps['size'];
  } & HTMLButtonAttributes;

  let {
    children,
    class: className,
    variant = 'outline',
    size = 'default',
    ...restProps
  }: Props = $props();

  const root = getContext<ComponentState>('component-root');
</script>

<button
  class={cn(buttonVariants({ variant, size }), className)}
  {...root.triggerProps}
  {...restProps}
>
  {@render children()}
</button>
```

### Content Component (com Portal)

```svelte
<script lang="ts">
  import { getContext, type Snippet } from 'svelte';
  import { scale } from 'svelte/transition';
  import type { ComponentState } from './ctx.svelte.js';
  import Portal from '$lib/components/portal/Portal.svelte';
  import { cn } from '$lib/utils';

  type Props = {
    children: Snippet;
    class?: string;
  };

  let { children, class: className, ...restProps }: Props = $props();
  
  const root = getContext<ComponentState>('component-root');
</script>

<Portal>
  {#if root.isOpen}
    <div
      {...root.contentProps}
      {...restProps}
      transition:scale={{ duration: 100, start: 0.95 }}
      class={cn(
        'fixed z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
        className
      )}
    >
      {@render children()}
    </div>
  {/if}
</Portal>
```

### Sub-component Simples (Estilização)

```svelte
<script lang="ts">
  import { cn } from '$lib/utils';
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = {
    children: Snippet;
    class?: string;
  } & HTMLAttributes<HTMLDivElement>;

  let { children, class: className, ...restProps }: Props = $props();
</script>

<div class={cn('flex flex-col space-y-1.5', className)} {...restProps}>
  {@render children()}
</div>
```

### Sub-component com Context Access

```svelte
<script lang="ts">
  import { getContext } from 'svelte';
  import type { ComponentState } from './ctx.svelte.js';
  import { cn } from '$lib/utils';

  let { children, class: className, ...restProps } = $props();
  
  const root = getContext<ComponentState>('component-root');
</script>

<h2 id={root.titleId} class={cn('text-lg font-semibold', className)} {...restProps}>
  {@render children()}
</h2>
```

---

## Acessibilidade (A11y)

### ARIA Attributes Obrigatórios

| Componente | Attributes |
|------------|------------|
| Trigger | `aria-haspopup`, `aria-expanded`, `aria-controls` |
| Dialog | `role="dialog"`, `aria-modal`, `aria-labelledby`, `aria-describedby` |
| Menu | `role="menu"`, `aria-labelledby` |
| MenuItem | `role="menuitem"`, `tabindex="-1"` |
| Accordion | `aria-expanded`, `aria-controls` |

### data-state

Sempre incluir `data-state` para hooks de CSS:

```typescript
'data-state': isOpen ? 'open' : 'closed'
```

### Keyboard Navigation

Implementar para componentes interativos:

```typescript
handleKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'Enter':
    case ' ':
      e.preventDefault();
      this.toggle();
      break;
    case 'Escape':
      e.preventDefault();
      this.close();
      break;
    case 'ArrowDown':
      e.preventDefault();
      this.focusNext();
      break;
    case 'ArrowUp':
      e.preventDefault();
      this.focusPrevious();
      break;
    case 'Home':
      e.preventDefault();
      this.focusFirst();
      break;
    case 'End':
      e.preventDefault();
      this.focusLast();
      break;
    case 'Tab':
      // Geralmente fecha o componente
      this.close();
      break;
  }
};
```

### Focus Management

Para modais e overlays:

```typescript
const manageFocus: Attachment = (node) => {
  const el = node as HTMLElement;
  
  // Focus inicial
  setTimeout(() => el.focus(), 10);
  
  // Focus trap
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      const focusableEls = el.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
    }
  };
  el.addEventListener('keydown', handleKeyDown);
  
  return () => {
    el.removeEventListener('keydown', handleKeyDown);
    // Retornar focus ao trigger
    triggerRef?.focus();
  };
};
```

---

## Estilos

### Função cn()

Sempre usar `cn()` para merge de classes:

```typescript
import { cn } from '$lib/utils';

class={cn('base-classes here', className)}
```

### Design Tokens (Tailwind)

Usar os tokens do shadcn:

| Token | Uso |
|-------|-----|
| `bg-background` | Background principal |
| `bg-popover` | Background de popovers/dropdowns |
| `text-foreground` | Texto principal |
| `text-popover-foreground` | Texto em popovers |
| `text-muted-foreground` | Texto secundário |
| `bg-accent` | Background de hover/focus |
| `text-accent-foreground` | Texto em accent |
| `border` / `border-border` | Bordas |
| `ring` / `ring-ring` | Focus rings |

### Pattern de Props de Estilo

```svelte
<script lang="ts">
  let { class: className = undefined, ...restProps } = $props();
</script>

<div
  class={cn('classes-fixas-aqui', className)}
  {...restProps}
>
```

## Dependências Permitidas

### Core (sempre disponíveis)

- `svelte` - Runes, transitions, context
- `clsx` + `tailwind-merge` - Via `cn()`
- `class-variance-authority` - Para variantes

### Opcionais (quando necessário)

- `@floating-ui/dom` - Posicionamento de popovers/dropdowns

---

## Checklist para Novos Componentes

### Estrutura
- [ ] Criar pasta em `src/lib/components/[nome]/`
- [ ] Criar `ctx.svelte.ts` com state class
- [ ] Criar `index.ts` com exports
- [ ] Criar componentes `.svelte`

### Estado (ctx.svelte.ts)
- [ ] Usar classe com $state para reatividade
- [ ] Implementar métodos de ação (open, close, toggle)
- [ ] Criar getters para props de elementos (triggerProps, contentProps)
- [ ] Configurar context keys consistentes
- [ ] Implementar cleanup em $effect quando necessário

### Componentes
- [ ] Root: instanciar state e setContext
- [ ] Root: suportar $bindable para valores controlados
- [ ] Root: usar `$props.id()` para IDs únicos
- [ ] Trigger: usar buttonVariants quando apropriado
- [ ] Content: usar Portal para overlays
- [ ] Todos: aceitar `class` prop e usar `cn()`
- [ ] Todos: spread `...restProps`

### Acessibilidade
- [ ] ARIA attributes apropriados
- [ ] data-state para CSS hooks
- [ ] Keyboard navigation completa
- [ ] Focus management para modais
- [ ] Roles semânticos corretos

### TypeScript
- [ ] Props tipadas
- [ ] Usar types do svelte/elements
- [ ] Exportar types quando necessário

---
 
## Notas para AI

Ao criar novos componentes:
1. **Sempre analise os componentes existentes** antes de criar novos
2. **Siga os patterns estabelecidos** - não invente novos patterns
3. **Priorize acessibilidade** - ARIA e keyboard são obrigatórios
4. **Mantenha simplicidade** - código legível > código clever
5. **TypeScript strict** - tipar tudo, sem `any`
6. Nunca comente no codigo
