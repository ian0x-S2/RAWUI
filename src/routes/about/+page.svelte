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
  DropdownItem,
  DropdownSeparator,
  DropdownLabel
 } from '$lib/components/dropdown';
 import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
 } from '$lib/components/accordion/index';

 // Estados
 let openProfile = $state(false);
 let openProfile2 = $state(false);

 function handleSaveProfile() {
  openProfile = false;
 }

 function handleSaveProfile2() {
  openProfile2 = false;
 }

 // Ícone de Link Externo (Sutil e elegante)
 const DocIcon = () => `
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-40 hover:opacity-100 transition-opacity"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
  `;
</script>

<div class="relative min-h-screen bg-background text-foreground selection:bg-primary/10">
 <!-- BACKGROUND TÉCNICO SUTIL -->
 <!-- Um grid muito leve para dar textura sem chamar atenção -->
 <div class="bg-subtle-grid pointer-events-none fixed inset-0 -z-10"></div>

 <div class="container mx-auto max-w-7xl px-6 py-20">
  <!-- HEADER -->
  <div class="mb-20 space-y-3 text-center lg:text-left">
   <h1 class="text-4xl font-bold tracking-tight lg:text-5xl">Component Lab</h1>
   <p class="mx-auto max-w-xl text-lg font-light text-muted-foreground lg:mx-0">
    Ambiente isolado para validação de comportamento e estilo dos componentes.
   </p>
  </div>

  <!-- GRID DE CARDS -->
  <!-- items-start garante que o accordion não estique os vizinhos -->
  <div class="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 xl:grid-cols-3">
   <!-- CARD 1: DIALOG -->
   <div
    class="group rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
   >
    <!-- Header -->
    <div class="flex items-center justify-between border-b p-5">
     <h3 class="font-medium tracking-tight">Dialog</h3>
     <a
      href="/docs/components/dialog"
      class="p-1 text-muted-foreground hover:text-foreground"
     >
      {@html DocIcon()}
     </a>
    </div>
    <!-- Preview -->
    <div class="flex min-h-[300px] flex-col items-center justify-center gap-4 p-8">
     <Dialog bind:open={openProfile}>
      <DialogTrigger variant="outline" class="w-full max-w-xs bg-background">
       Editar Perfil
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
       <DialogHeader>
        <DialogTitle>Editar Perfil</DialogTitle>
        <DialogDescription>Faça alterações no seu perfil aqui.</DialogDescription>
       </DialogHeader>
       <div class="grid gap-4 py-4">
        <div
         class="flex h-24 items-center justify-center rounded border border-dashed bg-muted/30 text-xs text-muted-foreground"
        >
         Area de Conteúdo
        </div>
       </div>
       <DialogFooter>
        <Button onclick={handleSaveProfile}>Salvar</Button>
       </DialogFooter>
      </DialogContent>
     </Dialog>

     <Dialog bind:open={openProfile2}>
      <DialogTrigger
       variant="ghost"
       class="w-full max-w-xs text-muted-foreground hover:text-foreground"
      >
       Configurações
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
       <DialogHeader>
        <DialogTitle>Avançado</DialogTitle>
        <DialogDescription>Preferências do sistema.</DialogDescription>
       </DialogHeader>
       <DialogFooter>
        <Button onclick={handleSaveProfile2}>Confirmar</Button>
       </DialogFooter>
      </DialogContent>
     </Dialog>
    </div>
   </div>

   <!-- CARD 2: ACCORDION -->
   <div
    class="group rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
   >
    <div class="flex items-center justify-between border-b p-5">
     <h3 class="font-medium tracking-tight">Accordion</h3>
     <a
      href="/docs/components/accordion"
      class="p-1 text-muted-foreground hover:text-foreground"
     >
      {@html DocIcon()}
     </a>
    </div>
    <div class="flex min-h-[300px] items-start justify-center p-8">
     <Accordion class="w-full">
      <AccordionItem value="item-1">
       <AccordionTrigger>Acessibilidade</AccordionTrigger>
       <AccordionContent>
        Compatível com leitores de tela e navegação via teclado seguindo padrões WAI-ARIA.
       </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
       <AccordionTrigger>Design System</AccordionTrigger>
       <AccordionContent>
        Tokens de design consistentes para cores, espaçamentos e tipografia.
       </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
       <AccordionTrigger>Performance</AccordionTrigger>
       <AccordionContent>
        Renderização otimizada e animações via CSS transform sempre que possível.
       </AccordionContent>
      </AccordionItem>
     </Accordion>
    </div>
   </div>

   <!-- CARD 3: DROPDOWN -->
   <div
    class="group rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
   >
    <div class="flex items-center justify-between border-b p-5">
     <h3 class="font-medium tracking-tight">Dropdown</h3>
     <a
      href="/docs/components/dropdown"
      class="p-1 text-muted-foreground hover:text-foreground"
     >
      {@html DocIcon()}
     </a>
    </div>
    <div class="flex min-h-[300px] flex-col items-center justify-center gap-8 p-8">
     <DropdownMenu>
      <DropdownTrigger variant="outline" class="w-48 justify-between bg-background">
       Ações
       <span class="scale-75 text-[10px] opacity-40">▼</span>
      </DropdownTrigger>
      <DropdownContent>
       <DropdownItem>Editar</DropdownItem>
       <DropdownItem>Duplicar</DropdownItem>
       <DropdownSeparator />
       <DropdownItem class="text-destructive focus:text-destructive">
        Excluir
       </DropdownItem>
      </DropdownContent>
     </DropdownMenu>

     <DropdownMenu>
      <DropdownTrigger
       variant="ghost"
       class="text-xs text-muted-foreground hover:text-foreground"
      >
       Mais Opções
      </DropdownTrigger>
      <DropdownContent align="center">
       <DropdownLabel>Navegação</DropdownLabel>
       <DropdownItem>Perfil</DropdownItem>
       <DropdownItem>Configurações</DropdownItem>
       <DropdownItem>Sair</DropdownItem>
      </DropdownContent>
     </DropdownMenu>
    </div>
   </div>
  </div>
 </div>
</div>

<style>
 /*
		Grid muito sutil e elegante.
		Usa 'bg-grid-small' logicamente
	*/
 .bg-subtle-grid {
  background-size: 40px 40px;
  background-image: linear-gradient(
    to right,
    hsl(var(--border) / 0.15) 1px,
    transparent 1px
   ),
   linear-gradient(to bottom, hsl(var(--border) / 0.15) 1px, transparent 1px);
  mask-image: radial-gradient(circle at 50% 0%, black 40%, transparent 100%);
 }
</style>
