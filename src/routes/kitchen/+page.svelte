<script>
 import { Toaster } from '$lib/components/toast';
 import { toast } from '$lib/components/toast';
 import Button from '$lib/components/button/Button.svelte';
 function save() {
  const promise = new Promise((resolve) => setTimeout(resolve, 2000));

  toast.promise(promise, {
   loading: 'Salvando alterações...',
   success: 'Dados salvos com sucesso!',
   error: 'Erro ao salvar.'
  });
 }
</script>

<Button onclick={save}>Salvar</Button>
<Toaster />
