<!-- src/lib/components/portal/Portal.svelte -->
<script lang="ts">
 import { mount, unmount, getAllContexts } from 'svelte';
 import PortalConsumer from './PortalConsumer.svelte';

 let { target = document.body, children } = $props();

 const context = getAllContexts();
 let instance: any;

 $effect(() => {
  instance = mount(PortalConsumer, {
   target,
   props: { children, context }
  });

  return () => {
   if (instance) {
    unmount(instance);
   }
  };
 });
</script>
