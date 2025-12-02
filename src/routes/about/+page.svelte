<script lang="ts">
 import Button from '$lib/components/button/Button.svelte';
 import { useLocalStorage } from '$lib/hooks/state/storage.svelte';

 // Cria o estado. Note que não usamos $state aqui, pois a função já encapsula o estado.
 const myData = useLocalStorage('user-settings', { theme: 'dark' });

 function toggleTheme() {
  if (myData.value?.theme === 'dark') {
   myData.set({ theme: 'light' });
  } else {
   myData.set({ theme: 'dark' });
  }
 }
</script>

<h1>Tema atual: {myData.value?.theme}</h1>

<button onclick={toggleTheme}> Mudar Tema </button>

<button onclick={myData.remove}> Remover do Storage </button>
<div>
 <Button href="https://google.com" variant="outline" size="sm">Hello</Button>
</div>
