export type FocusOption =
 | boolean
 | HTMLElement
 | null
 | (() => HTMLElement | boolean | null | undefined);

export class DialogState {
 isOpen = $state(false);
 triggerRef: HTMLElement | null = null;
 previouslyFocusedElement: HTMLElement | null = null;
 baseId: string;
 titleId: string;
 descriptionId: string;

 constructor(baseId: string, open = false) {
  this.baseId = baseId;
  this.titleId = `${baseId}-title`;
  this.descriptionId = `${baseId}-description`;
  this.isOpen = open;
 }

 toggle = () => (this.isOpen = !this.isOpen);

 open = () => {
  if (typeof document !== 'undefined') {
   this.previouslyFocusedElement = document.activeElement as HTMLElement;
  }
  this.isOpen = true;
 };

 close = () => (this.isOpen = false);

 resolveFocusOption(
  option: FocusOption | undefined
 ): HTMLElement | boolean | null | undefined {
  if (typeof option === 'function') {
   return option();
  }
  return option;
 }
}
