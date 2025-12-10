import { getContext, setContext, tick } from 'svelte';
import { createAttachmentKey } from 'svelte/attachments';
import { computePosition, autoUpdate, flip, shift, offset } from '@floating-ui/dom';

type Item = {
 value: string;
 label: string;
 element: HTMLElement;
 disabled: boolean;
};

type SelectOptions<Multiple extends boolean> = {
 value: Multiple extends true ? string[] : string;
 baseId: string;
 multiple: Multiple;
 loopFocus?: boolean;
 onValueChange?: (val: Multiple extends true ? string[] : string) => void;
};

class SelectState<Multiple extends boolean = false> {
 open = $state(false);
 isKeyboardNav = $state(false);

 _value = $state<Multiple extends true ? string[] : string>([] as any);

 highlightedValue = $state<string | null>(null);

 triggerEl = $state<HTMLElement>();
 contentEl = $state<HTMLElement>();

 items = $state<Item[]>([]);

 baseId: string;
 multiple: Multiple;
 loopFocus: boolean;
 onValueChange?: (val: Multiple extends true ? string[] : string) => void;

 constructor(options: SelectOptions<Multiple>) {
  this._value = options.value;
  this.baseId = options.baseId;
  this.multiple = options.multiple;
  this.loopFocus = options.loopFocus ?? false;
  this.onValueChange = options.onValueChange;

  $effect(() => {
   if (!this.open || !this.triggerEl || !this.contentEl) return;

   Object.assign(this.contentEl.style, {
    position: 'fixed',
    left: '0',
    top: '0',
    minWidth: 'max-content',
    zIndex: '50',
    display: 'block'
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
   if (this.open) {
    tick().then(() => {
     let valueToHighlight: string | null = null;

     if (this.multiple) {
      const valArray = this.value as string[];
      if (valArray.length > 0) valueToHighlight = valArray[0];
     } else {
      const valString = this.value as string;
      if (valString) valueToHighlight = valString;
     }

     const itemExists = valueToHighlight
      ? this.items.some((i) => i.value === valueToHighlight && !i.disabled)
      : false;

     if (itemExists && valueToHighlight) {
      this.highlightedValue = valueToHighlight;
     } else {
      this.highlightedValue = this.items.find((i) => !i.disabled)?.value ?? null;
     }

     this.scrollToHighlighted();
     this.contentEl?.focus({ preventScroll: true });
    });
   } else {
    this.highlightedValue = null;
   }
  });
 }

 get value() {
  return this._value;
 }
 set value(val) {
  this._value = val;
  if (this.onValueChange) this.onValueChange(val);
 }

 toggle = (e?: Event) => {
  e?.preventDefault();
  if (this.open) this.close();
  else this.openMenu();
 };

 openMenu = async () => {
  this.open = true;
  this.isKeyboardNav = true;
  await tick();
 };

 close = () => {
  this.open = false;
  this.triggerEl?.focus();
 };

 select = (value: string) => {
  if (this.multiple) {
   const currentValues = this.value as string[];
   const exists = currentValues.includes(value);
   const newValue = exists
    ? currentValues.filter((v) => v !== value)
    : [...currentValues, value];
   this.value = newValue as any;
  } else {
   this.value = value as any;
   this.close();
  }
 };

 registerItem = (item: Item) => {
  this.items.push(item);
  return () => {
   const index = this.items.findIndex((i) => i.value === item.value);
   if (index !== -1) {
    this.items.splice(index, 1);
   }
  };
 };

 isSelected = (value: string): boolean => {
  if (this.multiple) {
   return (this.value as string[]).includes(value);
  }
  return this.value === value;
 };

 get selectedLabel() {
  if (this.multiple) {
   return (this.value as string[])
    .map((v) => this.items.find((i) => i.value === v)?.label)
    .filter(Boolean)
    .join(', ');
  }
  return this.items.find((i) => i.value === this.value)?.label;
 }

 get selectedValues() {
  if (this.multiple) return this.value as string[];
  return this.value ? [this.value as string] : [];
 }

 handleContentKeydown = (e: KeyboardEvent) => {
  if (!this.open) return;

  if (['ArrowUp', 'ArrowDown', 'Home', 'End', 'Enter', ' '].includes(e.key)) {
   e.preventDefault();
  }

  this.isKeyboardNav = true;

  switch (e.key) {
   case 'ArrowDown':
    this.moveHighlight(1);
    break;
   case 'ArrowUp':
    this.moveHighlight(-1);
    break;
   case 'Home':
    this.highlightedValue = this.items.find((i) => !i.disabled)?.value ?? null;
    this.scrollToHighlighted();
    break;
   case 'End':
    this.highlightedValue = this.items.findLast((i) => !i.disabled)?.value ?? null;
    this.scrollToHighlighted();
    break;
   case 'Enter':
   case ' ':
    if (this.highlightedValue) this.select(this.highlightedValue);
    break;
   case 'Escape':
   case 'Tab':
    this.close();
    break;
  }
 };

 moveHighlight(step: 1 | -1) {
  const validItems = this.items.filter((i) => !i.disabled);
  if (!validItems.length) return;

  const idx = validItems.findIndex((i) => i.value === this.highlightedValue);
  let nextIdx = idx + step;

  if (nextIdx < 0) nextIdx = this.loopFocus ? validItems.length - 1 : 0;
  if (nextIdx >= validItems.length) nextIdx = this.loopFocus ? 0 : validItems.length - 1;

  this.highlightedValue = validItems[nextIdx].value;
  this.scrollToHighlighted();
 }

 scrollToHighlighted = () => {
  if (!this.highlightedValue) return;
  const item = this.items.find((i) => i.value === this.highlightedValue);
  item?.element?.scrollIntoView({ block: 'nearest' });
 };

 handleTriggerKeydown = (e: KeyboardEvent) => {
  if (this.open) return;
  if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
   e.preventDefault();
   this.openMenu();
  }
 };

 get triggerProps() {
  return {
   [createAttachmentKey()]: (node: HTMLElement) => (this.triggerEl = node),
   id: `${this.baseId}-trigger`,
   role: 'combobox',
   type: 'button' as const,
   'aria-haspopup': 'listbox' as const,
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
   tabindex: -1,
   'aria-activedescendant': this.highlightedValue
    ? `${this.baseId}-option-${this.highlightedValue}`
    : undefined,
   'aria-multiselectable': this.multiple ? ('true' as const) : undefined,
   onkeydown: this.handleContentKeydown
  };
 }
}

const SELECT_KEY = Symbol('SELECT_CTX');

export function setSelectContext<Multiple extends boolean = false>(
 value: Multiple extends true ? string[] : string,
 baseId: string,
 multiple: Multiple,
 onValueChange?: (val: Multiple extends true ? string[] : string) => void
) {
 return setContext(
  SELECT_KEY,
  new SelectState({ value, baseId, multiple, onValueChange, loopFocus: true })
 );
}

export function getSelectContext<Multiple extends boolean = false>() {
 return getContext<SelectState<Multiple>>(SELECT_KEY);
}
