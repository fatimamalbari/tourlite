# Project Status & Phase 4 Roadmap: TourAI

## Overview
TourAI is an AI-native onboarding SDK designed to generate product tours automatically by scanning the DOM and reasoning with LLMs.

---

## 1. Progress Report (Phases 1 - 3 Complete ✅)

### Phase 1: Core Tour SDK
- [x] **Monorepo Architecture**: Setup with `pnpm` and `Turborepo`.
- [x] **Tooltip Engine**: Built with React and `Floating UI` for precise positioning.
- [x] **Spotlight Focus**: Implemented SVG-based mask for dimming background and highlighting targets.
- [x] **Navigation Logic**: Full support for `next`, `back`, `close`, and progress tracking (e.g., "Step 1 of 3").
- [x] **Styling**: Premium look and feel with smooth CSS transitions.

### Phase 2: AI DOM Scanner
- [x] **Discovery**: Robust query for all interactable elements (`button`, `a`, `role="button"`, etc.).
- [x] **Visibility Layer**: Filters out hidden or non-rendered elements using `offsetWidth` and `getClientRects`.
- [x] **Metadata Extraction**: Captures `aria-labels`, `placeholders`, and text for AI context.
- [x] **Robust Selectors**: Generates unique CSS paths using IDs or hierarchical `nth-of-type` fallbacks.

### Phase 3: AI Suggestions (The Brain)
- [x] **Multi-LLM Support**: Configured for Google Gemini (`gemini-3.5-flash`).
- [x] **Prompt Engineering**: System prompt designed to act as a "UX Onboarding Engineer."
- [x] **Magic Wand UI**: Floating developer tool to trigger real-time AI generation.
- [x] **Secure Bridge**: Next.js API route created to handle AI requests without exposing keys to the client.
- [x] **Demo Environment**: Fully functional dashboard with multiple pages and complex forms for testing.

---

## 2. Pending Phase: Phase 4 (Chrome Extension) 🚧

**Objective**: Allow developers to generate tours on *any* website (e.g., their own live production site or a competitor's site) without installing the SDK code first.

### Step 1: Extension Architecture
- Create a new package `apps/extension`.
- **Content Script**: Injects the `TourAI` SDK into every page.
- **Background Script**: Manages the state and communication with our AI backend.
- **Popup UI**: A simple toggle to "Enable TourAI" on the current tab.

### Step 2: Standalone SDK Bundle
- Modify the SDK build process to output a single `index.global.js` file.
- This bundle must be self-contained (bundled with React/Floating UI) so it doesn't conflict with the host website's scripts.

### Step 3: Injection Logic
- When the extension is active, it will programmatically inject the `<TourProvider>` and the "Magic Wand" into the host website's body.
- Handle `z-index` isolation to ensure the TourAI UI always stays on top of the host site.

### Step 4: Cross-Domain Generation
- Ensure the Scanner can send data from `any-website.com` to our local API route.
- Handle CORS and security permissions for the extension.

---

## 3. Final Milestone: Week 4 Launch Prep 🚀

- [ ] **NPM Publication**: Publish `@tour-ai/sdk` and `@tour-ai/ai`.
- [ ] **Documentation**: Create "Quick Start" and "API Reference" guides.
- [ ] **Landing Page**: A "Show, Don't Tell" site where users can try the Chrome Extension.
- [ ] **Public Launch**: Product Hunt, Twitter/X, and LinkedIn.

---

## 4. Immediate Next Actions (Phase 4)
1. **Initialize the Extension folder** with a standard manifest v3.
2. **Build the Standalone Bundle** of the SDK.
3. **Test Injection** on a non-React website (e.g., Google or a plain HTML page).
