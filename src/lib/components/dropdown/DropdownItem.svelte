<script lang="ts">
 import { type Snippet } from 'svelte';
 import type { HTMLAttributes } from 'svelte/elements';
 import { getDropdownRoot } from './ctx.svelte.js';
 import { cn } from '$lib/utils';

 type Props = {
  children: Snippet;
  class?: string;
  onclick?: (e: MouseEvent) => void;
  /**
   * Determina se o menu deve fechar após selecionar este item.
   * Útil para manter aberto em ações como "Copiar link" ou toggles.
   * @default true
   */
  closeOnSelect?: boolean;
  /**
   * Desabilita a interação com o item.
   * Bloqueia clique (mouse e teclado) e aplica estilos visuais.
   * @default false
   */
  disabled?: boolean;
 } & HTMLAttributes<HTMLDivElement>;

 let {
  children,
  class: className,
  onclick,
  closeOnSelect = true,
  disabled = false,
  ...restProps
 }: Props = $props();

 const root = getDropdownRoot();

 let el: HTMLElement;

 $effect(() => {
  if (el) return root.registerItem(el);
 });

 function handleClick(e: MouseEvent) {
  // Proteção Real: Impede a execução se estiver desabilitado.
  // Isso bloqueia tanto o clique do mouse quanto o 'Enter' via teclado.
  if (disabled) {
   e.preventDefault();
   e.stopPropagation();
   return;
  }

  if (onclick) onclick(e);

  // Flexibilidade: Verifica a prop antes de fechar o menu
  if (closeOnSelect) {
   root.close();
  }
 }

 function handlePointerEnter() {
  // Opcional: pointer-events-none no CSS já deve bloquear isso,
  // mas essa verificação garante segurança extra na lógica JS.
  if (disabled) return;

  if (!root.isKeyboardNav) {
   el?.focus();
  }
 }

 function handlePointerMove() {
  if (disabled) return;
  root.isKeyboardNav = false;
 }

 function handleFocus() {
  if (root.isKeyboardNav) {
   root.closeAllSubmenus();
  }
 }
</script>

<div
 bind:this={el}
 role="menuitem"
 tabindex="-1"
 onclick={handleClick}
 onpointerenter={handlePointerEnter}
 onpointermove={handlePointerMove}
 onfocus={handleFocus}
 data-orientation="vertical"
 aria-disabled={disabled ? 'true' : undefined}
 data-disabled={disabled ? '' : undefined}
 {...restProps}
 class={cn(
  'relative my-1 flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none',
  'focus:bg-accent focus:text-accent-foreground',
  'data-disabled:pointer-events-none data-disabled:opacity-50',
  '[div:not([data-keyboard-nav])_&]:hover:bg-accent [div:not([data-keyboard-nav])_&]:hover:text-accent-foreground',
  className
 )}
>
 {@render children()}
</div>
