export class DialogState {
 isOpen = $state(false);
 triggerRef: HTMLElement | null = null;

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
 open = () => (this.isOpen = true);
 close = () => (this.isOpen = false);
}
