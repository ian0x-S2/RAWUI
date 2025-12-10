# Svelte Component Library Agent Guidelines



## Code Style Guidelines

- **TypeScript**: Strict mode enabled, no `any` types, use Svelte 5 runes
- **Imports**: Group by type (Svelte, external, internal), use absolute paths with `$lib/`
- **Naming**: PascalCase for components, camelCase for variables/functions, kebab-case for files
- **Error handling**: Use try/catch for async operations, validate props at runtime
- **Accessibility**: Always include ARIA attributes, keyboard navigation, focus management

## Component Architecture

- **Structure**: `ctx.svelte.ts` (state), `index.ts` (exports), `[Component].svelte` (root + subs)
- **State**: Use `$state` runes in classes, getters for computed props, `$effect` are functions that run when state updates
- **Styling**: Use `cn()` for class merging, Tailwind design tokens, `class` prop support
- **Context**: `[component]-root` keys, set/get helpers for state sharing

## Core Principles

- Copy-paste friendly, composable, accessible, type-safe
- No comments in code, prioritize readability, follow existing patterns
