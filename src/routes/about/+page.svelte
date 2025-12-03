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

 let open = $state(false);

 function handleSave() {
  console.log('Salvando dados...');
  // Aqui você faria sua lógica (fetch, validação, etc)

  // 2. Fecha o modal programaticamente
  open = false;
 }
</script>

<div class="p-10">
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
</div>
