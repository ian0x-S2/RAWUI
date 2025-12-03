import { getContext, setContext } from 'svelte';

export type AccordionType = 'single' | 'multiple';

export class AccordionState {
 value = $state<string | string[] | undefined>(undefined);
 type: AccordionType;

 constructor(type: AccordionType = 'single', defaultValue?: string | string[]) {
  this.type = type;
  this.value = defaultValue;

  if (type === 'multiple' && !Array.isArray(this.value)) {
   this.value = this.value ? [this.value as string] : [];
  }
 }

 isSelected(itemValue: string) {
  if (this.type === 'multiple') {
   return Array.isArray(this.value) && this.value.includes(itemValue);
  }
  return this.value === itemValue;
 }

 toggle(itemValue: string) {
  if (this.type === 'multiple') {
   const current = (this.value as string[]) || [];
   if (current.includes(itemValue)) {
    this.value = current.filter((v) => v !== itemValue);
   } else {
    this.value = [...current, itemValue];
   }
  } else {
   this.value = this.value === itemValue ? undefined : itemValue;
  }
 }
}

export class AccordionItemState {
 value: string;
 disabled: boolean;

 constructor(value: string, disabled: boolean) {
  this.value = value;
  this.disabled = disabled;
 }
}

const ROOT_KEY = 'accordion-root';
const ITEM_KEY = 'accordion-item';

export const setAccordionRoot = (state: AccordionState) => setContext(ROOT_KEY, state);
export const getAccordionRoot = () => getContext<AccordionState>(ROOT_KEY);

export const setAccordionItem = (state: AccordionItemState) =>
 setContext(ITEM_KEY, state);
export const getAccordionItem = () => getContext<AccordionItemState>(ITEM_KEY);
