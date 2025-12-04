<script lang="ts">
 import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
 } from '$lib/components/dialog/index';
 import Button from '$lib/components/button/Button.svelte';
 import {
  DropdownMenu,
  DropdownTrigger,
  DropdownContent,
  DropdownItem
 } from '$lib/components/dropdown';

 // Crie estados separados para cada modal
 let openProfile = $state(false);
 let openProfile2 = $state(false);

 function handleSaveProfile() {
  console.log('Salvando perfil 1...');
  // Lógica específica do perfil 1
  openProfile = false;
 }

 function handleSaveProfile2() {
  console.log('Salvando perfil 2...');
  // Lógica específica do perfil 2
  openProfile2 = false;
 }
</script>

<div class="mx-auto flex w-1/2 flex-col gap-10 p-10">
 <!-- MODAL 1: Vinculado a openProfile -->
 <Dialog bind:open={openProfile}>
  <DialogTrigger variant="outline">Editar Perfil 1</DialogTrigger>

  <DialogContent class="sm:max-w-[425px]">
   <DialogHeader>
    <DialogTitle>Editar Perfil 1</DialogTitle>
    <DialogDescription>Alterações do perfil 1.</DialogDescription>
   </DialogHeader>

   <div class="grid gap-4 py-4">
    <p>Conteúdo do Modal 1</p>
   </div>

   <DialogFooter>
    <Button onclick={handleSaveProfile} type="submit">Salvar 1</Button>
   </DialogFooter>
  </DialogContent>
 </Dialog>

 <!-- DROPDOWN (Mantido igual) -->
 <div class="preview flex items-center justify-center rounded-lg border p-4">
  <DropdownMenu>
   <DropdownTrigger>Abrir Menu</DropdownTrigger>
   <DropdownContent>
    <DropdownItem>Item A</DropdownItem>
    <DropdownItem>Item B</DropdownItem>
   </DropdownContent>
  </DropdownMenu>
 </div>

 <!-- MODAL 2: Vinculado a openProfile2 -->
 <Dialog bind:open={openProfile2}>
  <DialogTrigger variant="outline">Editar Perfil 2</DialogTrigger>

  <DialogContent class="sm:max-w-[425px]">
   <DialogHeader>
    <DialogTitle>Editar Perfil 2</DialogTitle>
    <DialogDescription>Alterações do perfil 2.</DialogDescription>
   </DialogHeader>

   <div class="grid gap-4 py-4">
    <p>Conteúdo do Modal 2</p>
   </div>

   <DialogFooter>
    <Button onclick={handleSaveProfile2} type="submit">Salvar 2</Button>
   </DialogFooter>
  </DialogContent>
 </Dialog>
</div>
