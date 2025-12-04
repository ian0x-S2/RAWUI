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
 let open = $state(false);

 function handleSave() {
  console.log('Salvando dados...');
  // Aqui você faria sua lógica (fetch, validação, etc)

  // 2. Fecha o modal programaticamente
  open = false;
 }
</script>

<div class="mx-auto flex w-1/2 flex-col p-10">
 <!-- 3. Faça o bind aqui -->
 <Dialog bind:open>
  <DialogTrigger variant="outline">Editar Perfil</DialogTrigger>

  <DialogContent class="sm:max-w-[425px]">
   <DialogHeader>
    <DialogTitle>Editar Perfil</DialogTitle>
    <DialogDescription>Faça alterações no seu perfil aqui.</DialogDescription>
   </DialogHeader>

   <div class="grid gap-4 py-4">
    <!-- inputs... -->
   </div>

   <DialogFooter>
    <!-- 4. Chame a função no clique -->
    <Button onclick={handleSave} type="submit">Salvar Alterações</Button>
   </DialogFooter>
  </DialogContent>
 </Dialog>

 <div
  class="preview flex min-h-[200px] items-center justify-center rounded-lg border p-10"
 >
  <DropdownMenu class=" ">
   <DropdownTrigger>Abrir Menu</DropdownTrigger>
   <DropdownContent class="  ">
    <DropdownItem>Perfil</DropdownItem>
    <DropdownItem>Configurações</DropdownItem>
    <DropdownItem>Ajuda</DropdownItem>
    <DropdownItem>Sair</DropdownItem>
   </DropdownContent>
  </DropdownMenu>
 </div>
</div>
