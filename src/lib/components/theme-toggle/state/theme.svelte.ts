import { getContext, setContext } from 'svelte';
import type { ThemeState } from '../types.ts';
import type { UseStorageReturn } from '$lib/hooks/state/storage.svelte'; // Ajuste o import para onde está seu hook

const THEME_KEY = Symbol('next-themes');

export class ThemeManager implements ThemeState {
 // Agora guardamos a referência ao hook de storage
 #storage: UseStorageReturn<string>;

 #resolvedTheme = $state<string | undefined>(undefined);
 #forcedTheme = $state<string | undefined>(undefined);
 #themes = $state<string[]>([]);
 #enableSystem = $state(true);
 #systemTheme = $state<'dark' | 'light' | undefined>(undefined);

 constructor(
  // Recebe o storage já inicializado pelo componente
  storage: UseStorageReturn<string>,
  initial: Omit<ThemeState, 'theme' | 'setTheme'> & { enableSystem: boolean }
 ) {
  this.#storage = storage;
  this.#themes = initial.themes || [];
  this.#enableSystem = initial.enableSystem;
  this.#forcedTheme = initial.forcedTheme;
 }

 // --- GETTERS ---

 // O tema agora vem direto do seu hook (que é reativo)
 get theme() {
  return this.#storage.value;
 }

 get resolvedTheme() {
  return this.#resolvedTheme;
 }
 get forcedTheme() {
  return this.#forcedTheme;
 }
 get themes() {
  return this.#themes;
 }
 get systemTheme() {
  return this.#systemTheme;
 }

 // --- SETTERS INTERNOS ---
 _setResolvedTheme(v: string | undefined) {
  this.#resolvedTheme = v;
 }
 _setSystemTheme(v: 'dark' | 'light' | undefined) {
  this.#systemTheme = v;
 }
 // Usado quando há um forcedTheme para atualizar o storage sem loop infinito
 _setThemeState(v: string) {
  if (this.#storage.value !== v) {
   this.#storage.set(v);
  }
 }

 // --- API PÚBLICA ---
 setTheme = (value: string) => {
  // Delega a escrita para o seu hook
  this.#storage.set(value);
 };
}

export function createThemeContext(manager: ThemeManager) {
 setContext(THEME_KEY, manager);
}

export function useTheme(): ThemeManager {
 const context = getContext<ThemeManager>(THEME_KEY);
 if (!context) {
  throw new Error('useTheme must be used within a ThemeProvider');
 }
 return context;
}
