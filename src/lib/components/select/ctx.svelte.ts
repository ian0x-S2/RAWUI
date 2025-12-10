import { getContext, setContext, tick } from 'svelte';
import { createAttachmentKey } from 'svelte/attachments';
import { computePosition, autoUpdate, flip, shift, offset } from '@floating-ui/dom';

class SelectState<Multiple extends boolean = false> {
 open = $state(false);
 value = $state<Multiple extends true ? string[] : string>([] as any);
 focusedIndex = $state(0);
 baseId: string;
 multiple: Multiple;
 isKeyboardNav = $state(false);

 triggerEl = $state<HTMLElement>();
 contentEl = $state<HTMLElement>();
 items = $state<Array<{ value: string; label: string; element?: HTMLElement }>>([]);

 private labelMap = $state<Record<string, string>>({});
 private typeaheadString = '';
 private typeaheadTimeout: ReturnType<typeof setTimeout> | null = null;
 private onValueChange?: (val: Multiple extends true ? string[] : string) => void;

 constructor(
  initialValue: Multiple extends true ? string[] : string,
  baseId: string,
  multiple: Multiple,
  onValueChange?: (val: Multiple extends true ? string[] : string) => void
 ) {
  this.value = initialValue;
  this.baseId = baseId;
  this.multiple = multiple;
  this.onValueChange = onValueChange;

  $effect(() => {
   if (this.onValueChange) {
    this.onValueChange(this.value);
   }
  });

  $effect(() => {
   if (!this.open || !this.triggerEl || !this.contentEl) return;

   Object.assign(this.contentEl.style, {
    position: 'fixed',
    left: '0',
    top: '0'
   });

   const cleanup = autoUpdate(this.triggerEl, this.contentEl, async () => {
    if (!this.triggerEl || !this.contentEl) return;

    const { x, y } = await computePosition(this.triggerEl, this.contentEl, {
     placement: 'bottom-start',
     strategy: 'fixed',
     middleware: [offset(4), flip(), shift({ padding: 5 })]
    });

    Object.assign(this.contentEl.style, {
     left: `${x}px`,
     top: `${y}px`,
     minWidth: `${this.triggerEl.offsetWidth}px`
    });
   });

   return () => cleanup();
  });

  $effect(() => {
   if (this.open && this.contentEl) {
    this.contentEl.focus();
   }
  });
 }

 toggle = () => {
  if (this.open) {
   this.close();
  } else {
   this.openMenu();
  }
 };

 openMenu = async () => {
  this.open = true;
  await tick();

  const currentValue = this.multiple
   ? (this.value as string[])[0]
   : (this.value as string);
  const selectedIndex = this.items.findIndex((item) => item.value === currentValue);
  this.focusedIndex = selectedIndex >= 0 ? selectedIndex : 0;
  this.scrollToFocused();
 };

 close = () => {
  this.open = false;
  this.triggerEl?.focus();
 };

 select = (value: string, label: string) => {
  if (this.multiple) {
   const currentValues = this.value as string[];
   const index = currentValues.indexOf(value);

   if (index >= 0) {
    this.value = currentValues.filter((v) => v !== value) as any;
   } else {
    this.value = [...currentValues, value] as any;
   }
   this.labelMap[value] = label;
  } else {
   this.value = value as any;
   this.labelMap[value] = label;
   this.close();
  }
 };

 isSelected = (value: string): boolean => {
  if (this.multiple) {
   return (this.value as string[]).includes(value);
  }
  return this.value === value;
 };

 registerItem = (value: string, label: string, element?: HTMLElement) => {
  const existingIndex = this.items.findIndex((item) => item.value === value);
  const itemObj = { value, label, element };

  if (existingIndex >= 0) {
   this.items[existingIndex] = itemObj;
  } else {
   this.items.push(itemObj);
  }
  this.labelMap[value] = label;
 };

 unregisterItem = (value: string) => {
  this.items = this.items.filter((item) => item.value !== value);
 };

 get triggerProps() {
  return {
   [createAttachmentKey()]: (node: HTMLElement) => (this.triggerEl = node),
   id: `${this.baseId}-trigger`,
   role: 'combobox',
   type: 'button' as const,
   'aria-haspopup': 'listbox',
   'aria-expanded': this.open,
   'aria-controls': `${this.baseId}-content`,
   'data-state': this.open ? 'open' : 'closed',
   onclick: this.toggle,
   onkeydown: this.handleTriggerKeydown
  };
 }

 get contentProps() {
  return {
   [createAttachmentKey()]: (node: HTMLElement) => (this.contentEl = node),
   id: `${this.baseId}-content`,
   role: 'listbox',
   tabindex: 0,
   'aria-activedescendant': this.focusedValue
    ? `${this.baseId}-option-${this.focusedValue}`
    : undefined,
   'aria-multiselectable': this.multiple ? 'true' : undefined,
   'data-state': this.open ? 'open' : 'closed',
   'data-keyboard-nav': this.isKeyboardNav ? '' : undefined,
   onkeydown: this.handleContentKeydown,
   style: 'position: fixed; display: block;'
  };
 }

 handleTriggerKeydown = (e: KeyboardEvent) => {
  if (this.open) {
   this.handleContentKeydown(e);
   return;
  }

  if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
   e.preventDefault();
   this.isKeyboardNav = true;
   this.openMenu();
  }
 };

 handleContentKeydown = (e: KeyboardEvent) => {
  if (!this.open) return;

  switch (e.key) {
   case 'ArrowDown':
    e.preventDefault();
    this.isKeyboardNav = true;
    this.focusNext();
    break;
   case 'ArrowUp':
    e.preventDefault();
    this.isKeyboardNav = true;
    this.focusPrevious();
    break;
   case 'Home':
    e.preventDefault();
    this.isKeyboardNav = true;
    this.focusedIndex = 0;
    this.scrollToFocused();
    break;
   case 'End':
    e.preventDefault();
    this.isKeyboardNav = true;
    this.focusedIndex = this.items.length - 1;
    this.scrollToFocused();
    break;
   case 'PageUp':
    e.preventDefault();
    this.isKeyboardNav = true;
    this.focusedIndex = Math.max(0, this.focusedIndex - 10);
    this.scrollToFocused();
    break;
   case 'PageDown':
    e.preventDefault();
    this.isKeyboardNav = true;
    this.focusedIndex = Math.min(this.items.length - 1, this.focusedIndex + 10);
    this.scrollToFocused();
    break;
   case 'Enter':
   case ' ':
    e.preventDefault();
    const item = this.items[this.focusedIndex];
    if (item) this.select(item.value, item.label);
    break;
   case 'Escape':
    e.preventDefault();
    this.close();
    break;
   case 'Tab':
    this.close();
    break;
   default:
    if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
     e.preventDefault();
     this.isKeyboardNav = true;
     this.handleTypeahead(e.key);
    }
  }
 };

 private focusNext() {
  this.focusedIndex = (this.focusedIndex + 1) % this.items.length;
  this.scrollToFocused();
 }

 private focusPrevious() {
  this.focusedIndex = (this.focusedIndex - 1 + this.items.length) % this.items.length;
  this.scrollToFocused();
 }

 private handleTypeahead(key: string) {
  if (this.typeaheadTimeout) {
   clearTimeout(this.typeaheadTimeout);
  }

  this.typeaheadString += key.toLowerCase();

  const matchIndex = this.items.findIndex((item) =>
   item.label.toLowerCase().startsWith(this.typeaheadString)
  );

  if (matchIndex !== -1) {
   this.focusedIndex = matchIndex;
   this.scrollToFocused();
  }

  this.typeaheadTimeout = setTimeout(() => {
   this.typeaheadString = '';
  }, 500);
 }

 scrollToFocused = () => {
  const item = this.items[this.focusedIndex];
  item?.element?.scrollIntoView({ block: 'nearest' });
 };

 get selectedLabel() {
  if (this.multiple) {
   const values = this.value as string[];
   return values
    .map((v) => this.labelMap[v])
    .filter(Boolean)
    .join(', ');
  }
  return this.labelMap[this.value as string];
 }

 get focusedValue() {
  return this.items[this.focusedIndex]?.value;
 }

 get selectedValues() {
  if (this.multiple) {
   return this.value as string[];
  }
  return this.value ? [this.value as string] : [];
 }
}

const SELECT_KEY = Symbol('SELECT_CTX');

export function setSelectContext<Multiple extends boolean = false>(
 value: Multiple extends true ? string[] : string,
 baseId: string,
 multiple: Multiple,
 onValueChange?: (val: Multiple extends true ? string[] : string) => void
) {
 return setContext(SELECT_KEY, new SelectState(value, baseId, multiple, onValueChange));
}

export function getSelectContext<Multiple extends boolean = false>() {
 return getContext<SelectState<Multiple>>(SELECT_KEY);
}
