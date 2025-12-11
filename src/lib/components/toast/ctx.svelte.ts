import type { ToastData, ToastOptions, ToastType, PromiseData } from './types';
import { browser } from '$app/environment';

export class ToastTimer {
 private remaining: number;
 private startTime: number;
 private timerId: number | null = null;
 private callback: () => void;

 constructor(duration: number, callback: () => void) {
  this.remaining = duration;
  this.startTime = 0; // Initialize to 0, will be set in start()
  this.callback = callback;
 }

 start() {
  if (!browser) return;
  this.startTime = Date.now();
  // Limpa timer anterior se existir por segurança
  if (this.timerId) window.clearTimeout(this.timerId);
  this.timerId = window.setTimeout(this.callback, this.remaining);
 }

 pause() {
  if (!browser || !this.timerId) return;
  window.clearTimeout(this.timerId);
  this.timerId = null;

  const elapsed = Math.max(0, Date.now() - this.startTime); // Prevent negative values
  this.remaining = Math.max(0, this.remaining - elapsed); // Ensure remaining doesn't go below 0
 }

 resume() {
  if (!browser || this.timerId) return;
  if (this.remaining <= 0) {
   this.callback();
   return;
  }
  this.start();
 }

 clear() {
  if (!browser || !this.timerId) return;
  window.clearTimeout(this.timerId);
  this.timerId = null;
 }
}

export class ToastState {
 toasts = $state<ToastData[]>([]);
 isPaused = $state(false);
 max = 5;

 add(options: ToastOptions, type: ToastType = 'default') {
  if (!browser) return '';

  const id = options.id || crypto.randomUUID();

  const newToast: ToastData = {
   id,
   type,
   title: options.title,
   description: options.description,
   duration: options.duration ?? 5000,
   dismissible: options.dismissible ?? true,
   action: options.action,
   cancel: options.cancel,
   component: options.component,
   icon: options.icon,
   onStatusChange: options.onStatusChange
  };

  if (this.toasts.length >= this.max) {
   this.dismiss(this.toasts[0].id);
  }

  this.toasts = [...this.toasts, newToast];
  return id;
 }

 update(id: string, data: Partial<ToastData>) {
  const index = this.toasts.findIndex((t) => t.id === id);
  if (index !== -1) {
   this.toasts[index] = { ...this.toasts[index], ...data };
  }
 }

 dismiss(id: string) {
  const t = this.toasts.find((i) => i.id === id);
  if (t?.onStatusChange) t.onStatusChange('dismissing');
  this.toasts = this.toasts.filter((t) => t.id !== id);
 }

 message = (opts: ToastOptions | string) =>
  this.add(typeof opts === 'string' ? { title: opts } : opts, 'default');

 success = (opts: ToastOptions | string) =>
  this.add(typeof opts === 'string' ? { title: opts } : opts, 'success');

 error = (opts: ToastOptions | string) =>
  this.add(typeof opts === 'string' ? { title: opts } : opts, 'error');

 warning = (opts: ToastOptions | string) =>
  this.add(typeof opts === 'string' ? { title: opts } : opts, 'warning');

 info = (opts: ToastOptions | string) =>
  this.add(typeof opts === 'string' ? { title: opts } : opts, 'info');

 loading = (opts: ToastOptions | string) =>
  this.add(
   typeof opts === 'string' ? { title: opts } : { ...opts, duration: Infinity },
   'loading'
  );

 promise = <T>(promise: Promise<T>, data: PromiseData<T>) => {
  if (!browser) return promise;
  const id = this.loading(data.loading);
  promise
   .then((p) => {
    const toastOptions =
     typeof data.success === 'function' ? data.success(p) : data.success;
    const opts =
     typeof toastOptions === 'string' ? { title: toastOptions } : toastOptions;
    this.update(id, { type: 'success', duration: 3000, ...opts });
   })
   .catch((e) => {
    const toastOptions = typeof data.error === 'function' ? data.error(e) : data.error;
    const opts =
     typeof toastOptions === 'string' ? { title: toastOptions } : toastOptions;
    this.update(id, { type: 'error', duration: 3000, ...opts });
   });
  return promise;
 };

 pauseAll = () => (this.isPaused = true);
 resumeAll = () => (this.isPaused = false);
}

export const toast = new ToastState();
