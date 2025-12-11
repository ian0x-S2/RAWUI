<script lang="ts">
 import { Toaster, ToastState } from '$lib/components/toast';
 import Button from '$lib/components/button/Button.svelte';
 import type { ToastPosition } from '$lib/components/toast/types';

 let { position }: { position: ToastPosition } = $props();

 // Cada instância tem seu próprio state de toast
 const toastInstance = new ToastState();
 const instanceId = $props.id();

 function showToast() {
  toastInstance.message(`Toast at ${position}`);
 }

 const label = position
  .split('-')
  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
  .join(' ');
</script>

<div data-toast-demo={instanceId}>
 <Toaster {position} toastState={toastInstance} />
 <Button size="sm" variant="outline" onclick={showToast}>
  {label}
 </Button>
</div>
