# Plan: AI DOM Scanner (Project "TourAI")

## Objective
The Scanner is the "eyes" of the AI. Its job is to translate a complex, noisy DOM tree into a structured "Map of Intent" that an LLM can reason about to generate onboarding steps.

## 1. Scanner Architecture
The scanner will reside in `@tour-ai/sdk` and operate in three phases:
1.  **Discovery**: Find all potentially interactable elements.
2.  **Filtering**: Remove invisible, redundant, or "low-signal" elements (e.g., empty divs).
3.  **Serialization**: Convert the remaining elements into a lightweight JSON schema optimized for LLM token usage.

## 2. The Data Model (The "Map of Intent")
For every discovered element, we will collect:
- **`text`**: The primary label (innerText, aria-label, alt-text, or placeholder).
- **`tag`**: button, a, input, select, etc.
- **`role`**: ARIA roles (e.g., `tab`, `menuitem`).
- **`selector`**: A robust path to find it again.
- **`location`**: Simple quadrant or coordinates (top-left, center, etc.) to help the AI understand layout.
- **`context`**: Parent container name (if it has an ID or class) to group related items (e.g., "In the Sidebar").

## 3. Filtering & Discovery Strategy (Industry-Inspired)
To ensure high-signal data and avoid LLM "hallucinations":
- **Advanced Discovery**: Beyond basic tags, we will query for `[role="button"]`, `[tabindex]`, and standard focusable elements (as seen in `driver.js`).
- **Robust Visibility Check**: Use the `offsetWidth/offsetHeight` + `getClientRects()` method to ensure elements are truly rendered.
- **Text Priority**: Prioritize semantic labels (`aria-label`, `title`, `placeholder`) over raw `innerText` to capture developer intent.
- **Deduplication**: Group elements by their nearest semantic parent (e.g., "Main Nav", "Sidebar") to provide layout context.

## 4. Robust Selector Generation
The AI needs a way to "talk back" to the SDK. We will generate:
1.  **ID Selector**: Prefer `#id` if unique.
2.  **Semantic Selector**: e.g., `button:has-text("Save")`.
3.  **Hierarchical Path**: A "stable" CSS path as a fallback.

## 5. AI Handshake (Prompt Preparation)
The Scanner output will be formatted into a compact XML/JSON string for the LLM prompt:
```xml
<ui_map>
  <element id="el_0" tag="button" text="Create Team" location="top-right" />
  <element id="el_1" tag="input" placeholder="Search projects..." />
</ui_map>
```

## 6. Implementation Steps (Week 3)
1.  **Core Scanner Utility**: Build the recursive DOM walker with visibility checks.
2.  **Metadata Extractor**: Logic to find the "best" label for an element (e.g., checking `aria-label` then `innerText`).
3.  **Selector Library**: A helper to generate stable CSS paths.
4.  **Builder UI**: A simple floating button in the SDK that, when clicked, runs the scan and logs the JSON (for initial debugging).

## 7. Verification
- **Cross-Framework**: Test on the Next.js demo app + a plain HTML page.
- **Performance**: Ensure scanning takes <100ms on a typical page.
- **Token Efficiency**: Audit the JSON output size to ensure it fits in a single LLM call.
