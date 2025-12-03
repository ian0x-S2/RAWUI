<script lang="ts">
 import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
 } from '$lib/components/accordion/index';

 // Opcional: bindable state
 let value = $state('item-1');
</script>

<div class="mx-auto mt-10 w-[500px] rounded-lg border p-4">
 <Accordion type="single" bind:value class="w-full">
  <AccordionItem value="item-1">
   <AccordionTrigger>É acessível?</AccordionTrigger>
   <AccordionContent>Sim. Segue o padrão WAI-ARIA Design pattern.</AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
   <AccordionTrigger>É estilizado?</AccordionTrigger>
   <AccordionContent>
    Sim. Vem com estilos padrão que combinam com o resto dos componentes UI.
   </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-3">
   <AccordionTrigger>É animado?</AccordionTrigger>
   <AccordionContent>
    Sim. Usa a transição nativa <code>slide</code> do Svelte para suavidade.
   </AccordionContent>
  </AccordionItem>
 </Accordion>
</div>
