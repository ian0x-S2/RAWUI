import { getContext, setContext } from 'svelte';
import { createAttachmentKey } from 'svelte/attachments';

type CollapsibleContext = {
 baseId: string;
 open: boolean;
 disabled: boolean;
 onOpenChange?: (open: boolean) => void;
};

class CollapsibleState {
 private opts: CollapsibleContext;

 triggerEl = $state<HTMLElement>();

 constructor(options: CollapsibleContext) {
  this.opts = options;
 }

 // --- Getters do State ---
 get baseId() {
  return this.opts.baseId;
 }

 get open() {
  return this.opts.open;
 }
 set open(value: boolean) {
  this.opts.open = value;
 }

 get disabled() {
  return this.opts.disabled;
 }

 // --- Actions ---

 toggle = () => {
  if (this.disabled) return;
  this.open = !this.open;
 };

 // --- Props Getters ---

 get triggerProps() {
  return {
   [createAttachmentKey()]: (node: HTMLElement) => (this.triggerEl = node),
   id: `${this.baseId}-trigger`,
   type: 'button' as const,
   disabled: this.disabled,

   'data-state': this.open ? 'open' : 'closed',
   'data-disabled': this.disabled ? '' : undefined,

   'aria-controls': `${this.baseId}-content`,
   'aria-expanded': this.open,

   onclick: (e: MouseEvent) => {
    e.preventDefault();
    this.toggle();
   }
  };
 }

 get contentProps() {
  return {
   id: `${this.baseId}-content`,
   'data-state': this.open ? 'open' : 'closed',
   'data-disabled': this.disabled ? '' : undefined
  };
 }
}

const COLLAPSIBLE_KEY = Symbol('COLLAPSIBLE_CTX');

export function setCollapsibleContext(options: CollapsibleContext) {
 return setContext(COLLAPSIBLE_KEY, new CollapsibleState(options));
}

export function getCollapsibleContext() {
 return getContext<CollapsibleState>(COLLAPSIBLE_KEY);
}
