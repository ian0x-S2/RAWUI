<script lang="ts">
 import DropdownContent from '$lib/components/dropdown/DropdownContent.svelte';
 import DropdownMenu from '$lib/components/dropdown/DropdownMenu.svelte';
 import DropdownTrigger from '$lib/components/dropdown/DropdownTrigger.svelte';
 import DropdownItem from '$lib/components/dropdown/DropdownItem.svelte';
</script>

<div class="mx-auto mt-10 w-2/3">
 <DropdownMenu>
  <DropdownTrigger>Abrir Menu</DropdownTrigger>

  <DropdownContent>
   <DropdownItem onclick={() => alert('Oi')}>Meu Perfil</DropdownItem>
   <DropdownItem>Sair</DropdownItem>
  </DropdownContent>
 </DropdownMenu>
</div>
