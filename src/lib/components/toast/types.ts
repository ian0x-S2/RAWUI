import type { Snippet } from 'svelte';

export type ToastType = 'success' | 'error' | 'loading' | 'info' | 'warning' | 'default';

export type ToastPosition =
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';

export interface ToastData {
    id: string;
    title?: string;
    description?: string;
    type: ToastType;
    duration: number;
    dismissible: boolean;
    icon?: Snippet;
    action?: {
        label: string;
        onClick: (event: MouseEvent) => void;
    };
    cancel?: {
        label: string;
        onClick: (event: MouseEvent) => void;
    };
    onStatusChange?: (status: 'visible' | 'dismissing' | 'unmounted') => void;
    component?: Snippet;
    promise?: Promise<any>;
    promiseData?: PromiseData;
}

export interface ToastOptions extends Partial<Omit<ToastData, 'id' | 'component'>> {
    id?: string;
    component?: Snippet;
}

export type PromiseData<T = any> = {
    loading: string | ToastOptions;
    success: string | ToastOptions | ((data: T) => string | ToastOptions);
    error: string | ToastOptions | ((error: any) => string | ToastOptions);
};
