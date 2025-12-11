import { getContext, setContext, tick } from 'svelte';
import { createAttachmentKey } from 'svelte/attachments';
import {
 computePosition,
 autoUpdate,
 flip,
 shift,
 offset,
 type Placement,
 type Middleware
} from '@floating-ui/dom';

type PopoverOptions = {
 baseId: string;
 open: boolean;
 modal?: boolean;
 placement?: Placement;
 offset?: number;
 closeOnOutsideClick?: boolean;
 closeOnEscape?: boolean;
 onOpenChange?: (open: boolean) => void;
};

class PopoverState {
 private opts: PopoverOptions;

 // Elementos
 triggerEl = $state<HTMLElement>();
 contentEl = $state<HTMLElement>();

 // Estado
 currentPlacement = $state<Placement>('bottom');
 styles = $state({ top: '0', left: '0' });

 constructor(options: PopoverOptions) {
  this.opts = options;

  // Gerenciamento de Posicionamento (Floating UI)
  $effect(() => {
   if (!this.open || !this.triggerEl || !this.contentEl) return;

   const updatePosition = async () => {
    if (!this.triggerEl || !this.contentEl) return;

    const middleware: Middleware[] = [
     offset(this.opts.offset ?? 8),
     flip(),
     shift({ padding: 5 })
    ];

    const { x, y, placement } = await computePosition(this.triggerEl, this.contentEl, {
     placement: this.opts.placement ?? 'bottom',
     strategy: 'fixed',
     middleware
    });

    this.currentPlacement = placement;
    this.styles = { left: `${x}px`, top: `${y}px` };
   };

   const cleanup = autoUpdate(this.triggerEl, this.contentEl, updatePosition);
   return () => cleanup();
  });

  // Gerenciamento de Foco e Eventos Globais
  $effect(() => {
   if (this.open) {
    // Click Outside
    const handlePointerDown = (e: PointerEvent) => {
     const target = e.target as Node;
     const isOutside =
      this.contentEl &&
      !this.contentEl.contains(target) &&
      this.triggerEl &&
      !this.triggerEl.contains(target);

     if (isOutside && (this.opts.closeOnOutsideClick ?? true)) {
      this.close();
     }
    };

    // Escape Key
    const handleKeyDown = (e: KeyboardEvent) => {
     if (e.key === 'Escape' && (this.opts.closeOnEscape ?? true)) {
      e.preventDefault();
      this.close();
     }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    // Foco inicial no conteúdo
    tick().then(() => {
     if (this.contentEl) {
      const focusable = this.contentEl.querySelector(
       'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      focusable?.focus();
     }
    });

    return () => {
     document.removeEventListener('pointerdown', handlePointerDown);
     document.removeEventListener('keydown', handleKeyDown);
     // Restaura foco ao fechar
     this.triggerEl?.focus();
    };
   }
  });
 }

 // --- Getters/Setters ---
 get baseId() {
  return this.opts.baseId;
 }
 get open() {
  return this.opts.open;
 }
 set open(value: boolean) {
  this.opts.open = value;
 }

 // --- Actions ---
 toggle = () => {
  this.open = !this.open;
  this.opts.onOpenChange?.(this.open);
 };

 close = () => {
  this.open = false;
  this.opts.onOpenChange?.(false);
 };

 // --- Props Getters (Zag Style + Attachments) ---
 get triggerProps() {
  return {
   [createAttachmentKey()]: (node: HTMLElement) => (this.triggerEl = node),
   id: `${this.baseId}-trigger`,
   type: 'button' as const,
   'aria-haspopup': 'dialog' as const,
   'aria-expanded': this.open,
   'aria-controls': `${this.baseId}-content`,
   'data-state': this.open ? 'open' : 'closed',
   'data-placement': this.currentPlacement,
   onclick: (e: MouseEvent) => {
    // e.preventDefault(); // Opcional: depende se o trigger for submit
    this.toggle();
   }
  };
 }

 get contentProps() {
  return {
   [createAttachmentKey()]: (node: HTMLElement) => (this.contentEl = node),
   id: `${this.baseId}-content`,
   role: 'dialog',
   'aria-modal': this.opts.modal ? ('true' as const) : undefined,
   'data-state': this.open ? 'open' : 'closed',
   'data-placement': this.currentPlacement,
   tabindex: -1,
   style: `
				position: fixed;
				left: ${this.styles.left};
				top: ${this.styles.top};
				z-index: 50;
			`
  };
 }
}

const POPOVER_KEY = Symbol('POPOVER_CTX');

export function setPopoverContext(options: PopoverOptions) {
 return setContext(POPOVER_KEY, new PopoverState(options));
}

export function getPopoverContext() {
 return getContext<PopoverState>(POPOVER_KEY);
}
