import { browser } from '$app/environment';

/* The use storage initial value type */
export type UseStorageInitialValue<Value> = (() => Value) | Value;

/* The use storage options type */
export interface UseStorageOptions<Value> {
 /* The initial value of the storage */
 initialValue?: UseStorageInitialValue<Value>;
 /* The storage to be used */
 storage?: Storage;
 /* The deserializer function to be invoked */
 deserializer?: (value: string) => Value;
 /* The serializer function to be invoked */
 serializer?: (value: Value) => string;
}

/* The use storage return type */
export interface UseStorageReturn<Value> {
 /* The value of the storage (getter reativo) */
 readonly value: Value | undefined;
 /* A função para remover o item */
 remove: () => void;
 /* A função para definir o valor */
 set: (value: Value) => void;
}

export const STORAGE_EVENT = 'svelte-storage-event';

export const dispatchStorageEvent = (params: Partial<StorageEvent>) => {
 if (browser) {
  window.dispatchEvent(new StorageEvent(STORAGE_EVENT, params));
 }
};

const setStorageItem = (storage: Storage, key: string, value: string) => {
 const oldValue = storage.getItem(key);
 storage.setItem(key, value);
 dispatchStorageEvent({
  key,
  oldValue,
  newValue: value,
  storageArea: storage
 });
};

const removeStorageItem = (storage: Storage, key: string) => {
 const oldValue = storage.getItem(key);
 storage.removeItem(key);
 dispatchStorageEvent({ key, oldValue, newValue: null, storageArea: storage });
};

const getStorageItem = (storage: Storage, key: string) => {
 const value = storage.getItem(key);
 if (!value) return undefined;
 return value;
};

/**
 * Hook/Função que gerencia o valor do storage usando Svelte 5 Runes.
 * Toda a interação com 'localStorage' é isolada no $effect.
 */
export function useStorage<Value>(
 key: string,
 params?: UseStorageInitialValue<Value> | UseStorageOptions<Value>
): UseStorageReturn<Value> {
 const options = (
  typeof params === 'object' &&
  params !== null &&
  ('serializer' in params ||
   'deserializer' in params ||
   'initialValue' in params ||
   'storage' in params)
   ? params
   : undefined
 ) as UseStorageOptions<Value> | undefined;

 const initialValue = (
  options ? options?.initialValue : params
 ) as UseStorageInitialValue<Value>;

 // Define o storage, protegido por SSR.
 const storage = browser ? (options?.storage ?? window.localStorage) : undefined;

 // Inicializa o estado com o valor inicial (ou undefined) de forma síncrona.
 let current = $state<Value | undefined>(() => {
  if (typeof initialValue === 'function') {
   if (!browser) {
    // CORREÇÃO: Converte explicitamente para '() => Value' para satisfazer o TS.
    return (initialValue as () => Value)();
   }
  }
  return initialValue as Value | undefined;
 });

 // === Funções de Utility ===

 const serializer = (value: Value) => {
  if (options?.serializer) return options.serializer(value);
  if (typeof value === 'string') return value;
  return JSON.stringify(value);
 };

 const deserializer = (value: string) => {
  if (options?.deserializer) return options.deserializer(value);
  if (value === 'undefined') return undefined as unknown as Value;
  try {
   return JSON.parse(value) as Value;
  } catch {
   return value as Value;
  }
 };

 const set = (value: Value) => {
  if (!storage) return; // Ignora no SSR
  const s = serializer(value);
  setStorageItem(storage, key, s);
  current = value; // Atualiza o estado local imediatamente
 };

 const remove = () => {
  if (!storage) return; // Ignora no SSR
  removeStorageItem(storage, key);
  current = undefined;
 };

 // === LÓGICA DE CLIENTE ($effect) ===
 $effect(() => {
  if (storage) {
   // 1. CARREGAMENTO INICIAL: Executado apenas no cliente (após a montagem)
   const storageValue = getStorageItem(storage, key);

   if (storageValue !== undefined) {
    // Se o storage tem valor, usa ele.
    current = deserializer(storageValue);
   } else if (initialValue !== undefined) {
    // Se não tem, usa o valor inicial e persiste no storage.
    const v =
     typeof initialValue === 'function'
      ? (initialValue as () => Value)() // Correto: usa Value
      : initialValue;

    setStorageItem(storage, key, serializer(v));
    current = v;
   }

   // 2. LISTENERS: Sincronização entre abas/eventos customizados
   const onChange = (e: Event) => {
    if (e instanceof StorageEvent || e.type === STORAGE_EVENT) {
     const updatedStorageValue = getStorageItem(storage, key);
     current = updatedStorageValue ? deserializer(updatedStorageValue) : undefined;
    }
   };

   window.addEventListener(STORAGE_EVENT, onChange);
   window.addEventListener('storage', onChange);

   return () => {
    window.removeEventListener(STORAGE_EVENT, onChange);
    window.removeEventListener('storage', onChange);
   };
  }
 });

 // Retorna um objeto com getter para manter a reatividade (Runes)
 return {
  get value() {
   return current;
  },
  set,
  remove
 };
}

/**
 * useLocalStorage: Wrapper que usa o localStorage por padrão.
 */
export const useLocalStorage = <Value>(
 key: string,
 initialValue?: UseStorageInitialValue<Value>,
 options?: Omit<UseStorageOptions<Value>, 'initialValue' | 'storage'>
) =>
 useStorage(key, {
  ...options,
  initialValue,
  storage: browser ? window.localStorage : undefined
 });
