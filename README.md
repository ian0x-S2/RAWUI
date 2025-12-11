# RAWUI Component System

<div align="center">
  <img src="static/yy.svg" alt="RAWUI Logo" width="80" height="80" />
  <br />
  <br />
  <p>
    <strong>Beautiful, accessible, and type-safe components built with Svelte 5 and Tailwind CSS.</strong>
  </p>
  <p>
    <em>Not a library. A collection of reusable components for the modern Svelte era.</em>
  </p>

  <a href="https://svelte.dev">
    <img src="https://img.shields.io/badge/Svelte-5.0+-orange?style=flat-square&logo=svelte" alt="Svelte 5" />
  </a>
  <a href="https://tailwindcss.com">
    <img src="https://img.shields.io/badge/Tailwind-4.0+-blue?style=flat-square&logo=tailwindcss" alt="Tailwind CSS" />
  </a>
  <a href="https://www.typescriptlang.org">
    <img src="https://img.shields.io/badge/TypeScript-Strict-blue?style=flat-square&logo=typescript" alt="TypeScript" />
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" />
  </a>
</div>

<br />

## 📖 Introduction

**RAWUI** is a collection of UI components written from scratch using **Svelte 5 Runes**.

It is **not** a dependency you install via npm. It is a reference code base. You choose the components you need, copy the code into your project, and customize them to your heart's content.

### Why Copy/Paste?

- **Zero Abstraction:** You own the code. No "black box" logic hidden inside `node_modules`.
- **Full Customization:** Want to change the animation speed? The active color? The DOM structure? Just edit the file.
- **Svelte 5 Native:** Built to leverage the fine-grained reactivity system of Runes (`$state`, `$derived`, `$effect`).
- **Accessibility First:** Strict adherence to WAI-ARIA patterns for focus management and keyboard navigation.

---

## 🚀 Getting Started

Since this is not a package, you need to set up your environment to receive the components.

### 1. Prerequisites

Ensure you have a SvelteKit project with Tailwind CSS configured.

### 2. Install Utilities

We use a few tiny libraries to handle class merging and variant management:

```bash
npm install clsx tailwind-merge class-variance-authority
```

## 🤝 Contributing

This is primarily a personal toolkit, but contributions are welcome!

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingComponent`).
3. Commit your changes.
4. Open a Pull Request.

## 📄 License

This project is licensed under the **MIT License** 
You are free to use these components in personal and commercial projects.

---

<div align="center">
  <p>Inspired by <a href="https://ui.shadcn.com/">shadcn/ui</a> and the Svelte community.</p>
</div>
