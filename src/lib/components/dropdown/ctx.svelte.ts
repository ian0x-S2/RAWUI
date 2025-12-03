import {
 computePosition,
 autoUpdate,
 flip,
 shift,
 offset,
 type Placement
} from '@floating-ui/dom';
import { createAttachmentKey } from 'svelte/attachments';
import { tick } from 'svelte';

type Options = {
 placement?: Placement;
 baseId: string;
};

export class DropdownState {
 isOpen = $state(false);
 triggerEl: HTMLElement | undefined = $state();
 contentEl: HTMLElement | undefined = $state();

 items: HTMLElement[] = [];

 options: Options;

 constructor(options: Options) {
  this.options = { placement: 'bottom', ...options };

  $effect(() => {
   if (!this.isOpen || !this.triggerEl || !this.contentEl) return;

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

   const cleanupEvents = this.#setupGlobalEvents();

   return () => {
    cleanupPos();
    cleanupEvents();
   };
  });
 }

 toggle = () => {
  if (this.isOpen) {
   this.close();
  } else {
   this.openAndFocus('first');
  }
 };

 open = () => (this.isOpen = true);

 close = () => {
  this.isOpen = false;
  this.triggerEl?.focus();
 };

 registerItem(node: HTMLElement) {
  this.items.push(node);
  return () => {
   this.items = this.items.filter((n) => n !== node);
  };
 }

 async openAndFocus(target: 'first' | 'last') {
  this.isOpen = true;
  await tick();

  if (target === 'first') {
   this.items[0]?.focus();
  } else {
   this.items[this.items.length - 1]?.focus();
  }
 }

 handleTriggerKeydown = (e: KeyboardEvent) => {
  if (!this.triggerEl) return;

  switch (e.key) {
   case 'Enter':
   case ' ':
   case 'ArrowDown':
    e.preventDefault();
    this.openAndFocus('first');
    break;
   case 'ArrowUp':
    e.preventDefault();
    this.openAndFocus('last');
    break;
  }
 };

 handleContentKeydown = (e: KeyboardEvent) => {
  const activeElement = document.activeElement as HTMLElement;
  const currentIndex = this.items.indexOf(activeElement);
  const isFocusingItem = currentIndex !== -1;

  switch (e.key) {
   case 'Escape':
    e.preventDefault();
    this.close();
    break;
   case 'Tab':
    this.close();
    break;
   case 'ArrowDown':
    e.preventDefault();
    if (!isFocusingItem) {
     this.items[0]?.focus();
    } else {
     const nextIndex = (currentIndex + 1) % this.items.length;
     this.items[nextIndex]?.focus();
    }
    break;
   case 'ArrowUp':
    e.preventDefault();
    if (!isFocusingItem) {
     this.items[this.items.length - 1]?.focus();
    } else {
     const prevIndex = (currentIndex - 1 + this.items.length) % this.items.length;
     this.items[prevIndex]?.focus();
    }
    break;
   case 'Home':
    e.preventDefault();
    this.items[0]?.focus();
    break;
   case 'End':
    e.preventDefault();
    this.items[this.items.length - 1]?.focus();
    break;

   case 'Enter':
   case ' ':
    e.preventDefault();
    if (isFocusingItem) activeElement.click();
    break;
  }
 };

 // --- Props ---

 get triggerProps() {
  return {
   [createAttachmentKey()]: (node: HTMLElement) => (this.triggerEl = node),
   id: `${this.options.baseId}-trigger`,
   'aria-haspopup': 'menu' as const,
   'aria-expanded': this.isOpen,
   'aria-controls': `${this.options.baseId}-content`,
   'data-state': this.isOpen ? 'open' : 'closed',
   onclick: this.toggle,
   onkeydown: this.handleTriggerKeydown,
   type: 'button' as const
  };
 }

 get contentProps() {
  return {
   [createAttachmentKey()]: (node: HTMLElement) => (this.contentEl = node),
   id: `${this.options.baseId}-content`,
   role: 'menu',
   'aria-labelledby': `${this.options.baseId}-trigger`,
   'data-state': this.isOpen ? 'open' : 'closed',
   onkeydown: this.handleContentKeydown,
   tabindex: -1
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

  document.addEventListener('pointerdown', handleClick);
  return () => {
   document.removeEventListener('pointerdown', handleClick);
  };
 }
}
