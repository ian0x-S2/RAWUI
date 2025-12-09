<script lang="ts">
 import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
 } from '$lib/components/dialog/index';
 import Button from '$lib/components/button/Button.svelte';
 import {
  DropdownMenu,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownLabel,
  DropdownSub,
  DropdownSubTrigger,
  DropdownSubContent,
  DropdownSubItem
 } from '$lib/components/dropdown';
 import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
 } from '$lib/components/accordion/index';

 let inputRef: HTMLInputElement;

 // Estados do Dialog
 let openProfile = $state(false);
 let openProfile2 = $state(false);

 // Estados para demonstração do Dropdown (closeOnSelect)
 let wifiEnabled = $state(true);
 let bluetoothEnabled = $state(false);
 let airplainMode = $state(false);

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
  <div class="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 xl:grid-cols-3">
   <!-- CARD 1: DIALOG -->
   <div
    class="group rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
   >
    <div class="flex items-center justify-between border-b p-5">
     <h3 class="font-medium tracking-tight">Dialog</h3>
     <a
      href="/docs/components/dialog"
      class="p-1 text-muted-foreground hover:text-foreground"
     >
      {@html DocIcon()}
     </a>
    </div>
    <div class="flex min-h-[300px] flex-col items-center justify-center gap-4 p-8">
     <Dialog>
      <DialogTrigger>Open Dialog</DialogTrigger>
      <DialogContent
       initialFocus={() => inputRef}
       finalFocus={true}
       closeOnBackdropClick={true}
      >
       <DialogHeader>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogDescription>Make changes to your profile here.</DialogDescription>
       </DialogHeader>

       <input bind:this={inputRef} type="text" placeholder="Name" />

       <DialogFooter>
        <DialogClose variant="outline">Cancel</DialogClose>
        <DialogClose variant="default">Save</DialogClose>
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

   <!-- CARD 3: DROPDOWN (DEMO DAS NOVAS FEATURES) -->
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
     <!-- MENU 1: SETTINGS (Demonstra closeOnSelect={false}) -->
     <DropdownMenu>
      <DropdownTrigger variant="default" class="w-48 justify-between">
       Painel de Controle
       <span class="scale-75 text-[10px] opacity-60">▼</span>
      </DropdownTrigger>

      <DropdownContent class="w-56">
       <DropdownLabel>Conectividade</DropdownLabel>

       <!-- Feature: Item mantem aberto ao clicar -->
       <DropdownItem closeOnSelect={false} onclick={() => (wifiEnabled = !wifiEnabled)}>
        <span class="flex-1">Wi-Fi</span>
        <span class={wifiEnabled ? 'font-bold text-primary' : 'text-muted-foreground'}>
         {wifiEnabled ? 'Ligado' : 'Desl.'}
        </span>
       </DropdownItem>

       <DropdownItem
        role="menuitemcheckbox"
        closeOnSelect={false}
        onclick={() => (bluetoothEnabled = !bluetoothEnabled)}
       >
        <span class="flex-1">Bluetooth</span>
        <span
         class={bluetoothEnabled ? 'font-bold text-primary' : 'text-muted-foreground'}
        >
         {bluetoothEnabled ? 'Ligado' : 'Desl.'}
        </span>
       </DropdownItem>

       <DropdownSeparator />

       <DropdownLabel>Ações</DropdownLabel>

       <!-- Feature: Submenu -->
       <DropdownSub>
        <DropdownSubTrigger>Compartilhar</DropdownSubTrigger>
        <DropdownSubContent>
         <DropdownSubItem>Email</DropdownSubItem>
         <DropdownSubItem>Slack</DropdownSubItem>
         <DropdownSeparator />
         <DropdownSubItem>Mais...</DropdownSubItem>
        </DropdownSubContent>
       </DropdownSub>

       <!-- Feature: Item Desabilitado -->
       <DropdownItem disabled>
        <span class="flex-1">Atualizar Sistema</span>
        <span class="text-[10px] uppercase">Baixando...</span>
       </DropdownItem>
      </DropdownContent>
     </DropdownMenu>

     <!-- MENU 2: SIMPLE -->
     <DropdownMenu>
      <DropdownTrigger
       variant="ghost"
       class="text-xs text-muted-foreground hover:text-foreground"
      >
       Menu Simples
      </DropdownTrigger>
      <DropdownContent align="center">
       <DropdownItem onclick={() => alert('Copiado!')}>Copiar Link</DropdownItem>
       <DropdownItem class="text-destructive focus:text-destructive">
        Deletar
       </DropdownItem>
      </DropdownContent>
     </DropdownMenu>
    </div>
   </div>
  </div>
 </div>
</div>

<style>
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
