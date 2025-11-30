<script lang="ts">
 import { cn } from '$lib/utils';

 interface Props {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  class?: string;
 }

 let { open = $bindable(false), onOpenChange, class: className }: Props = $props();
</script>

<button
 onclick={() => {
  open = !open;
  onOpenChange?.(!open);
 }}
 class={cn(
  'inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground lg:hidden',
  className
 )}
 aria-label="Toggle sidebar"
>
 <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path
   stroke-linecap="round"
   stroke-linejoin="round"
   stroke-width="2"
   d="M4 6h16M4 12h16M4 18h16"
  />
 </svg>
</button>
