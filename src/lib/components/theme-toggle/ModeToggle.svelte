<script lang="ts">
 import { useTheme } from '$lib/components/theme-toggle/state/theme.svelte';
 import Button from '$lib/components/button/Button.svelte';

 const themeState = useTheme();

 function toggle() {
  const current = themeState.theme;
  const next = current === 'dark' ? 'light' : 'dark';
  themeState.setTheme(next);
 }
</script>

<Button variant="outline" size="icon" onclick={toggle}>
 <!-- Sol -->
 <span
  class="scale-100 rotate-0 transition-[transform,opacity] dark:scale-0 dark:-rotate-90"
 >
  ☀️
 </span>
 <!-- Lua -->
 <span
  class="absolute scale-0 rotate-90 transition-[transform,opacity] dark:scale-100 dark:rotate-0"
 >
  🌙
 </span>
</Button>
