# Implementation Plan: AI DOM Scanner Utility

## Objective
Implement a robust `scanPage` utility in `@tour-ai/sdk` that identifies high-signal interactable elements on any web page.

## Changes

### 1. `packages/sdk/src/utils/scanner.ts`
- **`isElementVisible(el)`**: Multi-layered check using `offsetWidth`, `offsetHeight`, and `getClientRects()`.
- **`getElementLabel(el)`**: Semantic label extraction (prioritizing `aria-label`, `title`, `placeholder`).
- **`generateSelector(el)`**: Robust selector generation with fallback to hierarchical paths and `nth-of-type`.
- **`scanPage()`**: Main entry point using a broad discovery query (`button`, `a`, `input`, `role="button"`, etc.).

### 2. `packages/sdk/src/index.ts`
- Export `scanPage` and `InteractableElement` type.

### 3. `apps/demo/app/page.tsx` (Verification)
- Add a "Scan Page" button to log the discovered interactables to the console.

## Verification
- Run `pnpm build` in `packages/sdk`.
- Run `pnpm dev` in `apps/demo`.
- Click "Scan Page" and verify the JSON output in the browser console correctly maps to the UI elements.
