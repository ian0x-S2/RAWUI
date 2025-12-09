import {
 computePosition,
 autoUpdate,
 flip,
 shift,
 offset,
 type Placement
} from '@floating-ui/dom';
import { createAttachmentKey } from 'svelte/attachments';
import { getContext, setContext, tick } from 'svelte';

type Options = {
 placement?: Placement;
 baseId: string;
};

export class DropdownState {
 isOpen = $state(false);
 isClosing = $state(false);
 triggerEl: HTMLElement | undefined = $state();
 contentEl: HTMLElement | undefined = $state();
 isKeyboardNav = $state(false);

 items: HTMLElement[] = [];
 submenus: DropdownSubState[] = [];

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

 open = () => {
  this.isClosing = false;
  this.isOpen = true;
 };

 close = () => {
  this.isClosing = true;

  this.submenus.forEach((sub) => sub.freezePosition());

  requestAnimationFrame(() => {
   this.isOpen = false;
  });

  setTimeout(() => {
   this.isClosing = false;
  }, 150);

  this.triggerEl?.focus();
 };

 registerItem(node: HTMLElement) {
  this.items.push(node);
  return () => {
   this.items = this.items.filter((n) => n !== node);
  };
 }

 registerSubmenu(sub: DropdownSubState) {
  this.submenus.push(sub);
  return () => {
   this.submenus = this.submenus.filter((s) => s !== sub);
  };
 }

 closeAllSubmenus(except?: DropdownSubState) {
  this.submenus.forEach((sub) => {
   if (sub !== except) sub.close();
  });
 }

 async openAndFocus(target: 'first' | 'last') {
  this.isClosing = false;
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
    this.isKeyboardNav = true;
    this.closeAllSubmenus();
    if (!isFocusingItem) {
     this.items[0]?.focus();
    } else {
     const nextIndex = (currentIndex + 1) % this.items.length;
     this.items[nextIndex]?.focus();
    }
    break;
   case 'ArrowUp':
    e.preventDefault();
    this.isKeyboardNav = true;
    this.closeAllSubmenus();
    if (!isFocusingItem) {
     this.items[this.items.length - 1]?.focus();
    } else {
     const prevIndex = (currentIndex - 1 + this.items.length) % this.items.length;
     this.items[prevIndex]?.focus();
    }
    break;
   case 'Home':
    e.preventDefault();
    this.isKeyboardNav = true;
    this.closeAllSubmenus();
    this.items[0]?.focus();
    break;
   case 'End':
    e.preventDefault();
    this.isKeyboardNav = true;
    this.closeAllSubmenus();
    this.items[this.items.length - 1]?.focus();
    break;

   case 'Enter':
   case ' ':
    e.preventDefault();
    if (isFocusingItem) activeElement.click();
    break;
  }
 };

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

   const clickedOutside =
    this.triggerEl &&
    this.contentEl &&
    !this.triggerEl.contains(target) &&
    !this.contentEl.contains(target);

   const clickedOutsideSubmenus = this.submenus.every((sub) => {
    return !sub.contentEl?.contains(target);
   });

   if (clickedOutside && clickedOutsideSubmenus) {
    this.close();
   }
  };

  document.addEventListener('pointerdown', handleClick);
  return () => {
   document.removeEventListener('pointerdown', handleClick);
  };
 }
}

type SubOptions = {
 baseId: string;
 rootState: DropdownState;
};

export class DropdownSubState {
 isOpen = $state(false);
 triggerEl: HTMLElement | undefined = $state();
 contentEl: HTMLElement | undefined = $state();
 isFrozen = $state(false);
 frozenPosition: { x: number; y: number } | null = null;

 items: HTMLElement[] = [];

 options: SubOptions;

 #closeTimeout: ReturnType<typeof setTimeout> | undefined;
 #cleanupAutoUpdate: (() => void) | undefined;

 constructor(options: SubOptions) {
  this.options = options;

  $effect(() => {
   if (!this.isOpen || !this.triggerEl || !this.contentEl) return;

   const updatePosition = async () => {
    if (
     !this.triggerEl ||
     !this.contentEl ||
     this.isFrozen ||
     this.options.rootState.isClosing
    )
     return;

    const { x, y } = await computePosition(this.triggerEl, this.contentEl, {
     placement: 'right-start',
     strategy: 'fixed',
     middleware: [offset({ mainAxis: 0, crossAxis: -4 }), flip(), shift({ padding: 2 })]
    });

    this.frozenPosition = { x, y };

    Object.assign(this.contentEl.style, {
     left: `${x}px`,
     top: `${y}px`,
     position: 'fixed'
    });
   };

   this.#cleanupAutoUpdate = autoUpdate(this.triggerEl, this.contentEl, updatePosition);

   return () => {
    if (this.#cleanupAutoUpdate) {
     this.#cleanupAutoUpdate();
     this.#cleanupAutoUpdate = undefined;
    }
   };
  });

  $effect(() => {
   if (this.isFrozen && this.contentEl && this.frozenPosition) {
    Object.assign(this.contentEl.style, {
     left: `${this.frozenPosition.x}px`,
     top: `${this.frozenPosition.y}px`,
     position: 'fixed'
    });
   }
  });
 }

 freezePosition = () => {
  if (this.isOpen && this.frozenPosition) {
   this.isFrozen = true;
   this.#clearCloseTimeout();
  }
 };

 open = () => {
  this.#clearCloseTimeout();
  this.options.rootState.closeAllSubmenus(this);
  this.isFrozen = false;
  this.isOpen = true;
 };

 close = () => {
  this.isOpen = false;
  this.isFrozen = false;
  this.frozenPosition = null;
 };

 scheduleClose = () => {
  if (this.options.rootState.isClosing) return;

  this.#closeTimeout = setTimeout(() => {
   this.close();
  }, 100);
 };

 cancelClose = () => {
  this.#clearCloseTimeout();
 };

 #clearCloseTimeout() {
  if (this.#closeTimeout) {
   clearTimeout(this.#closeTimeout);
   this.#closeTimeout = undefined;
  }
 }

 registerItem(node: HTMLElement) {
  this.items.push(node);
  return () => {
   this.items = this.items.filter((n) => n !== node);
  };
 }

 async openAndFocus(target: 'first' | 'last') {
  this.open();
  await tick();

  if (target === 'first') {
   this.items[0]?.focus();
  } else {
   this.items[this.items.length - 1]?.focus();
  }
 }

 handleTriggerKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
   case 'ArrowRight':
   case 'Enter':
   case ' ':
    e.preventDefault();
    e.stopPropagation();
    this.openAndFocus('first');
    break;
  }
 };

 handleContentKeydown = (e: KeyboardEvent) => {
  const activeElement = document.activeElement as HTMLElement;
  const currentIndex = this.items.indexOf(activeElement);
  const isFocusingItem = currentIndex !== -1;

  switch (e.key) {
   case 'ArrowLeft':
   case 'Escape':
    e.preventDefault();
    e.stopPropagation();
    this.close();
    this.triggerEl?.focus();
    break;
   case 'ArrowDown':
    e.preventDefault();
    e.stopPropagation();
    if (!isFocusingItem) {
     this.items[0]?.focus();
    } else {
     const nextIndex = (currentIndex + 1) % this.items.length;
     this.items[nextIndex]?.focus();
    }
    break;
   case 'ArrowUp':
    e.preventDefault();
    e.stopPropagation();
    if (!isFocusingItem) {
     this.items[this.items.length - 1]?.focus();
    } else {
     const prevIndex = (currentIndex - 1 + this.items.length) % this.items.length;
     this.items[prevIndex]?.focus();
    }
    break;
   case 'Home':
    e.preventDefault();
    e.stopPropagation();
    this.items[0]?.focus();
    break;
   case 'End':
    e.preventDefault();
    e.stopPropagation();
    this.items[this.items.length - 1]?.focus();
    break;
   case 'Enter':
   case ' ':
    e.preventDefault();
    e.stopPropagation();
    if (isFocusingItem) activeElement.click();
    break;
  }
 };

 get triggerProps() {
  return {
   [createAttachmentKey()]: (node: HTMLElement) => (this.triggerEl = node),
   id: `${this.options.baseId}-sub-trigger`,
   role: 'menuitem',
   'aria-haspopup': 'menu' as const,
   'aria-expanded': this.isOpen,
   'aria-controls': `${this.options.baseId}-sub-content`,
   'data-state': this.isOpen ? 'open' : 'closed',
   tabindex: -1,
   onpointerenter: this.open,
   onpointerleave: this.scheduleClose,
   onkeydown: this.handleTriggerKeydown
  };
 }

 get contentProps() {
  return {
   [createAttachmentKey()]: (node: HTMLElement) => (this.contentEl = node),
   id: `${this.options.baseId}-sub-content`,
   role: 'menu',
   'aria-labelledby': `${this.options.baseId}-sub-trigger`,
   'data-state': this.isOpen ? 'open' : 'closed',
   tabindex: -1,
   onpointerenter: this.cancelClose,
   onpointerleave: this.scheduleClose,
   onkeydown: this.handleContentKeydown
  };
 }
}

const ROOT_KEY = 'dropdown-root';
const SUB_KEY = 'dropdown-sub';

export const setDropdownRoot = (state: DropdownState) => setContext(ROOT_KEY, state);
export const getDropdownRoot = () => getContext<DropdownState>(ROOT_KEY);

export const setDropdownSub = (state: DropdownSubState) => setContext(SUB_KEY, state);
export const getDropdownSub = () => getContext<DropdownSubState>(SUB_KEY);
