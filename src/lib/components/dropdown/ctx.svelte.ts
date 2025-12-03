// src/lib/components/ui/dropdown-menu/ctx.svelte.ts
import {
 computePosition,
 autoUpdate,
 flip,
 shift,
 offset,
 type Placement
} from '@floating-ui/dom';
import { createAttachmentKey } from 'svelte/attachments';

type Options = {
 placement?: Placement;
 baseId: string;
};

export class DropdownState {
 isOpen = $state(false);
 triggerEl: HTMLElement | undefined = $state();
 contentEl: HTMLElement | undefined = $state();
 options: Options;

 constructor(options: Options) {
  this.options = { placement: 'bottom', ...options };

  $effect(() => {
   if (!this.isOpen || !this.triggerEl || !this.contentEl) return;

   // Posicionamento (Strategy FIXED é obrigatório para Portal)
   const cleanupPos = autoUpdate(this.triggerEl, this.contentEl, async () => {
    if (!this.triggerEl || !this.contentEl) return;

    const { x, y } = await computePosition(this.triggerEl, this.contentEl, {
     placement: this.options.placement,
     strategy: 'fixed',
     middleware: [offset(4), flip(), shift({ padding: 2 })]
    });

    Object.assign(this.contentEl.style, {
     left: `${x}px`,
     top: `${y}px`,
     position: 'fixed'
    });
   });

   // Click Outside e ESC
   const cleanupEvents = this.#setupGlobalEvents();

   return () => {
    cleanupPos();
    cleanupEvents();
   };
  });
 }

 toggle = () => {
  this.isOpen = !this.isOpen;
 };
 close = () => {
  this.isOpen = false;
 };

 // Props do Trigger
 get triggerProps() {
  return {
   [createAttachmentKey()]: (node: HTMLElement) => (this.triggerEl = node),
   id: `${this.options.baseId}-trigger`,
   'aria-haspopup': 'menu' as const,
   'aria-expanded': this.isOpen,
   'aria-controls': `${this.options.baseId}-content`,
   'data-state': this.isOpen ? 'open' : 'closed',
   onclick: this.toggle,
   type: 'button' as const
  };
 }

 // Props do Content
 get contentProps() {
  return {
   [createAttachmentKey()]: (node: HTMLElement) => (this.contentEl = node),
   id: `${this.options.baseId}-content`,
   role: 'menu',
   'aria-labelledby': `${this.options.baseId}-trigger`,
   'data-state': this.isOpen ? 'open' : 'closed'
  };
 }

 #setupGlobalEvents() {
  const handleClick = (e: MouseEvent) => {
   const target = e.target as Node;
   if (
    this.triggerEl &&
    this.contentEl &&
    !this.triggerEl.contains(target) &&
    !this.contentEl.contains(target)
   ) {
    this.close();
   }
  };

  const handleKeydown = (e: KeyboardEvent) => {
   if (e.key === 'Escape') this.close();
  };

  document.addEventListener('pointerdown', handleClick);
  document.addEventListener('keydown', handleKeydown);

  return () => {
   document.removeEventListener('pointerdown', handleClick);
   document.removeEventListener('keydown', handleKeydown);
  };
 }
}
