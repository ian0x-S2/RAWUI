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
 // Estado Visual
 open = $state(false);
 isKeyboardNav = $state(false);

 // Estado de Dados
 // Usamos _value interno para controlar o proxy corretamente
 _value = $state<Multiple extends true ? string[] : string>([] as any);

 highlightedValue = $state<string | null>(null);

 triggerEl = $state<HTMLElement>();
 contentEl = $state<HTMLElement>();

 // Lista de itens
 items = $state<Item[]>([]);

 baseId: string;
 multiple: Multiple;
 loopFocus: boolean;
 onValueChange?: (val: Multiple extends true ? string[] : string) => void;

 private typeaheadString = '';
 private typeaheadTimer: ReturnType<typeof setTimeout> | null = null;

 constructor(options: SelectOptions<Multiple>) {
  this._value = options.value;
  this.baseId = options.baseId;
  this.multiple = options.multiple;
  this.loopFocus = options.loopFocus ?? false;
  this.onValueChange = options.onValueChange;

  // 1. Gerenciamento do Floating UI (Posicionamento)
  $effect(() => {
   if (!this.open || !this.triggerEl || !this.contentEl) return;

   Object.assign(this.contentEl.style, {
    position: 'fixed',
    left: '0',
    top: '0',
    minWidth: 'max-content',
    zIndex: '50',
    display: 'block' // Garante que não esteja hidden
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

  // 2. Efeito para sincronizar Highlight quando abre (CORRIGIDO)
  $effect(() => {
   if (this.open) {
    // Pequeno delay para garantir que os itens foram montados e registrados
    tick().then(() => {
     // Lógica para encontrar o item a ser destacado
     let valueToHighlight: string | null = null;

     // Se for múltiplo, tenta pegar o primeiro item selecionado
     if (this.multiple) {
      const valArray = this.value as string[];
      if (valArray.length > 0) valueToHighlight = valArray[0];
     } else {
      // Se for single, pega o valor atual
      const valString = this.value as string;
      if (valString) valueToHighlight = valString;
     }

     // Verifica se o valor selecionado existe na lista atual de itens
     const itemExists = valueToHighlight
      ? this.items.some((i) => i.value === valueToHighlight && !i.disabled)
      : false;

     if (itemExists && valueToHighlight) {
      this.highlightedValue = valueToHighlight;
     } else {
      // Fallback: destaca o primeiro item não desabilitado
      this.highlightedValue = this.items.find((i) => !i.disabled)?.value ?? null;
     }

     this.scrollToHighlighted();
     this.contentEl?.focus({ preventScroll: true });
    });
   } else {
    // Ao fechar, limpa o highlight
    this.highlightedValue = null;
    this.typeaheadString = '';
   }
  });
 }

 // Getter/Setter para value para disparar o callback
 get value() {
  return this._value;
 }
 set value(val) {
  this._value = val;
  if (this.onValueChange) this.onValueChange(val);
 }

 // --- Actions ---

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

 // --- Item Registration ---

 registerItem = (item: Item) => {
  this.items.push(item);

  return () => {
   const index = this.items.findIndex((i) => i.value === item.value);
   if (index !== -1) {
    this.items.splice(index, 1);
   }
  };
 };

 // --- Helpers ---

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

 // --- Keydown & Typeahead Logic ---

 handleContentKeydown = (e: KeyboardEvent) => {
  if (!this.open) return;

  // Previne scroll padrão para teclas de navegação
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
   default:
    if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
     this.handleTypeahead(e.key);
    }
  }
 };

 moveHighlight(step: 1 | -1) {
  const validItems = this.items.filter((i) => !i.disabled);
  if (!validItems.length) return;

  const idx = validItems.findIndex((i) => i.value === this.highlightedValue);
  let nextIdx = idx + step;

  // Loop focus logic
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

 handleTypeahead = (key: string) => {
  if (this.typeaheadTimer) clearTimeout(this.typeaheadTimer);
  this.typeaheadString += key.toLowerCase();

  const match = this.items.find(
   (i) => !i.disabled && i.label.toLowerCase().startsWith(this.typeaheadString)
  );

  if (match) {
   this.highlightedValue = match.value;
   this.scrollToHighlighted();
  }

  this.typeaheadTimer = setTimeout(() => {
   this.typeaheadString = '';
  }, 1000);
 };

 handleTriggerKeydown = (e: KeyboardEvent) => {
  if (this.open) return;
  if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
   e.preventDefault();
   this.openMenu();
  }
 };

 // --- Props ---

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
   tabindex: -1,
   'aria-activedescendant': this.highlightedValue
    ? `${this.baseId}-option-${this.highlightedValue}`
    : undefined,
   'aria-multiselectable': this.multiple ? 'true' : undefined,
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
