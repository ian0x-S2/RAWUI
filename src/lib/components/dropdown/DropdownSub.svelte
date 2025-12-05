<script lang="ts">
 import { type Snippet } from 'svelte';
 import { DropdownSubState, getDropdownRoot, setDropdownSub } from './ctx.svelte.js';

 type Props = {
  children: Snippet;
 };

 let { children }: Props = $props();

 const uid = $props.id();
 const root = getDropdownRoot();

 const state = new DropdownSubState({ baseId: uid, rootState: root });

 setDropdownSub(state);

 $effect(() => {
  return root.registerSubmenu(state);
 });

 $effect(() => {
  if (!root.isOpen) {
   state.close();
  }
 });
</script>

{@render children()}
