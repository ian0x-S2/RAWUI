<script lang="ts">
 import { mount, unmount, getAllContexts, type Snippet } from 'svelte';
 import PortalConsumer from './PortalConsumer.svelte';

 let {
  target = undefined,
  children
 }: { target?: HTMLElement | undefined; children: Snippet } = $props();

 const context = getAllContexts();
 let instance: any;

 $effect(() => {
  const container = target || document.body;

  instance = mount(PortalConsumer, {
   target: container,
   props: { children, context }
  });

  return () => {
   if (instance) {
    unmount(instance, { outro: true });
   }
  };
 });
</script>
