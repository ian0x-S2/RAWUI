<script lang="ts">
 import DropdownContent from '$lib/components/dropdown/DropdownContent.svelte';
 import DropdownMenu from '$lib/components/dropdown/DropdownMenu.svelte';
 import DropdownTrigger from '$lib/components/dropdown/DropdownTrigger.svelte';
 import DropdownItem from '$lib/components/dropdown/DropdownItem.svelte';
</script>

<div class="mx-auto mt-10 w-2/3">
 <DropdownMenu>
  <DropdownTrigger
   class="rounded bg-black px-4 py-2
      text-white"
  >
   Abrir Menu
  </DropdownTrigger>

  <DropdownContent>
   <DropdownItem onclick={() => alert('Oi')}>Meu Perfil</DropdownItem>
   <DropdownItem>Sair</DropdownItem>
  </DropdownContent>
 </DropdownMenu>
</div>
