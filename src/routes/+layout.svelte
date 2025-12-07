<script lang="ts">
 import './layout.css';
 import type { LayoutProps } from './$types';

 import ThemeProvider from '$lib/components/theme-toggle/ThemeProvider.svelte';

 import SidebarProvider from '$lib/components/sidebar/SidebarProvider.svelte';

 let { data, children }: LayoutProps = $props();
</script>

<ThemeProvider disableTransitionOnChange={true} defaultTheme="dark" enableSystem={true}>
 <SidebarProvider variant="default" open={data.sidebarOpen}>
  {@render children()}
 </SidebarProvider>
</ThemeProvider>
